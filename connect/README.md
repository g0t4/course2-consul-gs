## tcpflow commands

```bash

# orders -> shipments
docker compose exec ship tcpflow -i eth0 -gc
curl localhost:3000

# shipments -> tracking
docker compose exec ship tcpflow -i eth0 -gc
docker compose exec ship curl localhost:5000/shipments | jq


```
