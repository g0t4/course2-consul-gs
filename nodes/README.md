## membership

```bash
# manual join
# 2 panes - observes:
  watch -t -n 1 'consul members && date'
  docker compose logs cmt --follow # watch its logs specifically
# one off check:
docker compose exec cmt consul members # alone!
# then, join cmt (not setup w/ retry join)
docker compose exec cmt consul join 10.0.1.20


# watch services
consul watch -type services jq
#
# split pane
#
# then, graceful leave
#   note: must run against API of agent that will leave
docker compose exec cmt consul leave
#   observe services watch (above)
# notice status of cmt after:
docker compose ps cmt
# restart cmt
docker compose up cmt -d 
#   observe services watch (smtp and tracking come back)

# force-leave # to cleanup lost agents 
consul force-leave cmt
consul force-leave -prune cmt

```

## curl services

```bash

# service requests (w/o published ports)
docker compose exec ship curl localhost:5000/shipments | jq
docker compose exec orders curl localhost:3000/orders/report/1 | jq
docker compose exec orders curl localhost:3000/orders/submit
docker compose exec tracking curl 'localhost:8080/tracking/?num=asdf' | jq
# add -v to curl if request is failing, i.e.:
docker compose exec ship curl -v localhost:5000/shipments | jq


```
