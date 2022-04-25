import { Resolver } from "node:dns/promises";
import { verbose } from "./logging.mjs";
import net from "node:net";

/**
 * Discover a service instance
 * @param {string} host - i.e. smtp.service.consul or google.com
 * @param {string} defaultPort
 * @param {string} dnsServer - optional - IP or IP:PORT
 * @returns promise<ServiceInstance>
 */
async function getServiceInstance(host, defaultPort, dnsServer) {
  verbose("resolver::args", { host, defaultPort, dnsServer });

  // FIRST - if host is an IP => no lookups to perform
  if (net.isIP(host)) {
    var instance = { address: host, port: defaultPort };
    verbose("resolver::IP::instance", instance);
    return instance;
  }

  const resolver = new Resolver();
  if (dnsServer && dnsServer !== "") {
    resolver.setServers([dnsServer]);
  }
  verbose("resolver::getServers", resolver.getServers());

  // SECOND, check for an SRV record (resolve port & address)
  const SRV_records = await resolver.resolveSrv(host).catch((e) => {
    verbose("resolver::resolveSrv failed, assuming no SRV records...", e);
    return [];
  });
  verbose("resolver::SRV_records", SRV_records);
  if (SRV_records.length) {
    const firstRecord = SRV_records[0];
    const instance = {
      port: firstRecord.port,
      host: firstRecord.name,
    };

    // IMPORTANT - must resolve host returned in SRV record, b/c each instance can have a differnet port
    // TECHNICALLY - should be able to get both SRV + A/AAAA records in SRV query, but this works too
    const instanceAddresses = await resolver.resolve(instance.host);
    // let throw if any failure b/c if SRV records exist + lookup fails then that is a non-recoverable error
    verbose("resolver::SRV::instanceAddresses", instanceAddresses);

    instance.address = instanceAddresses[0];
    verbose("resolver::SRV::instance", instance);
    return instance;
  }

  // LAST - resolve host only, use default port
  return resolver.resolve(host).then((records) => {
    verbose("resolver::hostonly::records", records);
    // consul randomizes DNS results, take first result each time to 'load balance' across service instances
    const firstRecord = records[0];
    const instance = { address: firstRecord, port: defaultPort };
    verbose("resolver::hostonly::instance", instance);
    return instance;
  });
}

/* test directly with:
  
  LOG_LEVEL=verbose node orders/src/discovery.mjs

  # need consul DNS setup @127.0.0.1 port 8600
  # uncomment this line:
  getServiceInstance("smtp.service.consul", config.SMTP_PORT, "127.0.0.1:8600");
  # or, shipments.service.consul

*/

export { getServiceInstance };

/* 

NOTE: alternative - not implemented currently:
  - don't point system level resolver (/etc/resolv.conf) to CONSUL DNS
  - call r.setServers([config.CONSUL_DNS_IP]) above
  - add this to config.mjs `config.CONSUL_DNS_IP = process.env.CONSUL_DNS_IP` 
  - then, set env var for orders service
    - thus passing in the CONSUL_DNS_IP
    - think of this as using DNS as an API

*/
