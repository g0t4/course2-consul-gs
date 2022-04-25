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
function getServiceInstance(host, defaultPort, dnsServer) {
  if (net.isIP(host)) {
    // if host is an IP then there are no lookups to perform
    return Promise.resolve({ address: host, port: defaultPort });
  }
  const r = new Resolver();
  if (dnsServer && dnsServer !== "") {
    r.setServers([dnsServer]);
  }
  verbose("resolver::getServers", r.getServers());
  verbose("resolver::host", host);
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

// const SRV_records = await r.resolveSrv(host);
// console.log(`resolveSrv('${host}')`, SRV_records);
// if (SRV_records.length) {
//   // yes I can combine both SRV and A/AAAA lookups, but this is fine for my demo:
//   const firstRecord = SRV_records[0];
//   const instancePort = firstRecord.port;
//   const instanceHost = firstRecord.name;

//   // important to resolve host returned in SRV record b/c each service instance is tied to a port and IP and the port can vary too so can't just use resolve on smtp.service.consul, have to resolve host returned with SRV record
//   const instanceAddresses = await r.resolve(instanceHost);
//   console.log(`resolve('${instanceHost})`, instanceAddresses);
//   const instanceAddress = instanceAddresses[0];
//   console.log(
//     `SRV leads to instance port ${instancePort} @ ${instanceAddress}`
//   );
// }

/* 

NOTE: alternative - don't point system level resolver (/etc/resolv.conf) to CONSUL DNS
- call r.setServers([config.CONSUL_DNS_IP]) above
- add this to config.mjs `config.CONSUL_DNS_IP = process.env.CONSUL_DNS_IP` 
- then, set env var for orders service
  - thus passing in the CONSUL_DNS_IP
  - think of this as using DNS as an API

*/
