import { Resolver } from "node:dns/promises";
import { config } from "./config.mjs";
import { verbose } from "./logging.mjs";
import net from "node:net";
import { exit } from "node:process";
/**
 * Discover a service instance
 * @param {*} host - i.e. smtp.service.consul or google.com
 * @param {*} dnsServer - optional - IP or IP:PORT
 * @returns promise<ServiceInstance>
 */
async function getServiceInstance(host, defaultPort, dnsServer) {
  verbose("resolver::host", host);

  // FIRST - if host is an IP => no lookups to perform
  if (net.isIP(host)) {
    var instance = { address: host, port: defaultPort };
    verbose("resolver::IP::instance", instance);
    return Promise.resolve(instance);
  }

  const r = new Resolver();
  if (dnsServer && dnsServer !== "") {
    r.setServers([dnsServer]);
  }
  verbose("resolver::getServers", r.getServers());

  // SECOND, check for an SRV record (port + address)
  const SRV_records = await r.resolveSrv(host).catch((e) => {
    verbose("resolver::resolveSrv failed, skipping SRV records check", e);
    return [];
  });
  verbose("resolver::SRV_records", SRV_records);
  if (SRV_records.length) {
    const firstRecord = SRV_records[0];
    const instance = { port: firstRecord.port };
    const instanceHost = firstRecord.name;

    // IMPORTANT - must resolve host returned in SRV record, each instance can have a differnet port
    const instanceAddresses = await r.resolve(instanceHost);
    verbose("resolver::SRV::instanceAddresses", instanceAddresses);
    instance.address = instanceAddresses[0];
    verbose("resolver::SRV::instance", instance);
    return Promise.resolve(instance);
  }

  // LAST - resolve host + default port
  return r.resolve(host).then((records) => {
    verbose("resolver::records", records);
    // given consul randomizes results we can just take the first one and get a degree of "load balancing"
    const firstRecord = records[0];
    const instance = { address: firstRecord, port: defaultPort };
    verbose("resolver::hostonly::instance", instance);
    return instance;
  });
}

// test directly with:
//   LOG_LEVEL=verbose node orders/src/discovery.mjs
// getServiceInstance("google.com", config.SMTP_PORT);
// these two examples need consul DNS setup (set as second arg - ok to provide non-standard port too)
getServiceInstance("google.com", config.SMTP_PORT, "127.0.0.1:8600");

// getServiceInstance(
//   "shipments.service.consul",
//   config.SMTP_PORT,
//   "127.0.0.1:8600"
// );
// getServiceInstance("smtp.service.consul", config.SMTP_PORT, "127.0.0.1:8600");
export { getServiceInstance };

/* 

NOTE: alternative - don't point system level resolver (/etc/resolv.conf) to CONSUL DNS
- call r.setServers([config.CONSUL_DNS_IP]) above
- add this to config.mjs `config.CONSUL_DNS_IP = process.env.CONSUL_DNS_IP` 
- then, set env var for orders service
  - thus passing in the CONSUL_DNS_IP
  - think of this as using DNS as an API

*/
