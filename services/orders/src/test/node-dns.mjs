import { Resolver, lookup } from "node:dns/promises";

const host = process.argv[2] || "google.com";
const dnsServer = process.argv[3];

const r = new Resolver();
if (dnsServer && dnsServer !== "") {
  r.setServers([dnsServer]);
}
console.log("getServers", r.getServers());

console.log(`resolve('${host}')`, await r.resolve(host));
console.log(`resolveAny('${host}')`, await r.resolveAny(host));

// https://nodejs.org/dist/latest-v18.x/docs/api/dns.html#dnspromiseslookuphostname-options

console.log(`lookup('${host}')`, await lookup(host));
// ok not going to use lookup as Resolver also works with /etc/hosts entries, docs make it sound like only lookup supports that but maybe I misread them.

// NOTE: DNS queries are non-deterministic
