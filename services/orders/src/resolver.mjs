import { Resolver } from "node:dns/promises";
import { config } from "./config.mjs";
import { verbose } from "./logging.mjs";

function resolve(host) {
  const r = new Resolver();
  verbose("resolver::getServers", r.getServers());
  verbose("resolver::host", host);
  return r.resolve(host).then((records) => {
    verbose("resolver::records", records);
    return { address: records[0], port: config.SMTP_PORT }; // only use first record
  });
}

// test directly with:
//   LOG_LEVEL=verbose node orders/src/resolver.mjs
resolve("google.com").then((instance) => console.log(instance));

export { resolve };

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
