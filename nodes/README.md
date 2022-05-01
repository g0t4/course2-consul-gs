```bash

# service requests (w/o published ports)
docker compose exec ship curl localhost:5000/shipments | jq
docker compose exec orders curl localhost:3000/orders/report/1 | jq
docker compose exec orders curl localhost:3000/orders/submit
docker compose exec tracking curl 'localhost:8080/tracking/?num=asdf' | jq
# add -v to curl if request is failing, i.e.:
docker compose exec ship curl -v localhost:5000/shipments | jq


```
