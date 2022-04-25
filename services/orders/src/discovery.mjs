import { Resolver } from "node:dns/promises";
import { config } from "./config.mjs";
import { verbose } from "./logging.mjs";
import net from "node:net";
/**
 *
 * @param {*} host - i.e. smtp.service.consul or google.com
 * @param {*} dnsServer - optional - IP or IP:PORT
 * @returns
 *   rejected promise w/ ENOTFOUND if resolver fails
 */
async function getServiceInstance(host, defaultPort, dnsServer) {
  verbose("resolver::host", host);

  // if host is an IP then there are no lookups to perform
  if (net.isIP(host)) {
    var instance = { address: host, port: defaultPort };
    verbose("resolver::isIP", instance);
    return Promise.resolve(instance);
  }

  const r = new Resolver();
  if (dnsServer && dnsServer !== "") {
    r.setServers([dnsServer]);
  }
  verbose("resolver::getServers", r.getServers());

  // first, check for SRV record
  const SRV_records = await r.resolveSrv(host);
  if (SRV_records.length) {
    const firstRecord = SRV_records[0];
    const instancePort = firstRecord.port;
    const instanceHost = firstRecord.name;

    // IMPORTANT - must resolve host returned in SRV record, each instance can have a differnet port
    const instanceAddresses = await r.resolve(instanceHost);
    console.log(`resolve('${instanceHost})`, instanceAddresses);
    const instanceAddress = instanceAddresses[0];
    console.log(
      `SRV leads to instance port ${instancePort} @ ${instanceAddress}`
    );
  }

  return r.resolve(host).then((records) => {
    verbose("resolver::records", records);
    // given consul randomizes results we can just take the first one and get a degree of "load balancing"
    const firstRecord = records[0];
    const instance = { address: firstRecord, port: defaultPort };
    verbose("resolver::result", instance);
    return instance;
  });
}

// test directly with:
//   LOG_LEVEL=verbose node orders/src/discovery.mjs
// getServiceInstance("google.com", config.SMTP_PORT);
// these two examples need consul DNS setup (set as second arg - ok to provide non-standard port too)
//getServiceInstance("smtp.service.consul", config.SMTP_PORT, "127.0.0.1:8600");
getServiceInstance("smtp.service.consul", config.SMTP_PORT, "127.0.0.1:8600");
export { getServiceInstance };

/* 

NOTE: alternative - don't point system level resolver (/etc/resolv.conf) to CONSUL DNS
- call r.setServers([config.CONSUL_DNS_IP]) above
- add this to config.mjs `config.CONSUL_DNS_IP = process.env.CONSUL_DNS_IP` 
- then, set env var for orders service
  - thus passing in the CONSUL_DNS_IP
  - think of this as using DNS as an API

*/
