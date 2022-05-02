## commands

```bash

# inspecting services (per agent)
docker compose exec orders curl localhost:8500/v1/agent/services | jq
docker compose exec ship curl localhost:8500/v1/agent/services | jq
docker compose exec tracking curl localhost:8500/v1/agent/services | jq
# - notice not using consul container (service) name directly
#   - yet getting localhost consul agent anyways!
# compare to catalog of all services:
consul catalog services

```

## inspect shared netns (stack)

```bash

# consul + shipments service
docker compose exec cs ip -4 a s
docker compose exec ship ip -4 a s
docker compose exec ship netstat -an # open ports

# consul + orders service
docker compose exec co ip -4 a s
docker compose exec orders ip -4 a s
docker compose exec orders netstat -an

# consul + smtp & tracking services
docker compose exec cmt ip -4 a s
docker compose exec mail ip -4 a s
docker compose exec tracking ip -4 a s
docker compose exec tracking netstat -an

```
