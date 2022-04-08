# VM Install Demo

```bash

# bind consul agent's client services to all interfaces 
# (including 192.168.56.10 host accessible interface)
consul agent -dev -client 0.0.0.0

consul members
# consul CLI to remote agent (API)
CONSUL_HTTP_ADDR=http://192.168.56.10:8500 consul members

# bypass consul CLI - query members directly via API
# pipe to jq for colorful, formatted JSON output
curl http://192.168.56.10:8500/v1/agent/members\?segment\=_all | jq

```