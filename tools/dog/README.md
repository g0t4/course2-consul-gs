# `dog` = terse, colorful `dig`

```bash
# entrypoint = dog
# pass args after image (i.e. -v here)
docker container run --rm -i -t weshigbee/consul2-dog -v
# lookup google.com
docker container run --rm -i -t weshigbee/consul2-dog google.com


# set and use alias - as if installed locally
alias dog="docker container run --rm -i -t weshigbee/consul2-dog"
dog google.com # magic!


# scenario: query consul's DNS
# assume: consul container IP is 172.17.0.2
docker container run --rm -i -t weshigbee/consul2-dog @172.17.0.2 shipments.service.consul # w/o alias
dog @172.17.0.2 shipments.service.consul # w/ alias
# running dog in a container is especially helpful if consul container IP isn't host accessible (ie DDfM/W)

```