import { Resolver, lookup } from "node:dns/promises";

// ARGS:
// node test/node-dns.mjs smtp.service.consul 127.0.0.1
// - assumes consul DNS bound to localhost:53 (tcp and udp)
const host = process.argv[2] || "google.com";
const dnsServer = process.argv[3];

const r = new Resolver();
if (dnsServer && dnsServer !== "") {
  r.setServers([dnsServer]);
}
console.log("getServers", r.getServers());

console.log(`resolve('${host}')`, await r.resolve(host));
// resolve ANY fails with consul DNS:
// console.log(`resolveAny('${host}')`, await r.resolveAny(host));

// https://nodejs.org/dist/latest-v18.x/docs/api/dns.html#dnspromiseslookuphostname-options
// console.log(`lookup('${host}')`, await lookup(host));
// ok not going to use lookup as Resolver also works with /etc/hosts entries, docs make it sound like only lookup supports that but maybe I misread them.

// ask for SRV directly, works for shipments.service.consul but not smtp.service.consul
// const rr = await r.resolve(host, "SRV");
// console.log('SRV rr', rr);
// process.exit();

const SRV_records = await r.resolveSrv(host);
console.log(`resolveSrv('${host}')`, SRV_records);
if (SRV_records.length) {
  // yes I can combine both SRV and A/AAAA lookups, but this is fine for my demo:
  const firstRecord = SRV_records[0];
  const instancePort = firstRecord.port;
  const instanceHost = firstRecord.name;

  // important to resolve host returned in SRV record b/c each service instance is tied to a port and IP and the port can vary too so can't just use resolve on smtp.service.consul, have to resolve host returned with SRV record
  const instanceAddresses = await r.resolve(instanceHost);
  console.log(`resolve('${instanceHost})`, instanceAddresses);
  const instanceAddress = instanceAddresses[0];
  console.log(
    `SRV leads to instance port ${instancePort} @ ${instanceAddress}`
  );
}

// NOTE: DNS queries are non-deterministic
