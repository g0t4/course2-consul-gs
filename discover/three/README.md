# Initial, 3 containers demo

## commands (copy/paste)

```bash
# orders service
docker container run --rm -it -p 3000:3000 \
  --name orders weshigbee/consul2-orders

# shipments service
docker container run --rm -it -p 5000:5000 \
  --name shipments weshigbee/consul2-shipments

## lookup container IPs
# via bridge network
docker network inspect bridge | jq
docker network inspect bridge | jq ".[].Containers"

# launch shell in container:
docker container exec -i -t orders bash
docker container exec -i -t shipments bash
# inside:
 ip -c -4 address show  
 netstat -l
 curl localhost:3000 # orders service
 curl localhost:5000 # shipments service

# or, run one-off commands:
docker container exec -i -t orders \
  ip -c -4 a s

## discovery via hardcoded IP
docker container run --rm -it -p 3000:3000 --name orders \
  -e "SHIPMENTS_URL=http://172.17.0.3:5000" \
  weshigbee/consul2-orders


## discovery via Consul DNS
# consul-dev container 
docker container run --rm -it --name consul-dev -p 8500:8500 \
  consul agent -dev -dns-port 53 -client 0.0.0.0

# orders service - discovery via consul's DNS
docker container run --rm -it -p 3000:3000 --name orders \
  -e "SHIPMENTS_URL=http://shipments.service.consul:5000" \
  --dns 172.17.0.4 \
  weshigbee/consul2-orders
# docker run reference: https://docs.docker.com/engine/reference/run/
# - host networking: https://docs.docker.com/engine/reference/run/#network-host
# /etc/resolv.conf: https://man7.org/linux/man-pages/man5/resolv.conf.5.html


## dig (verbose, universal), dog (concise, colorful)
docker container run --rm -i -t weshigbee/consul2-dog google.com
dig google.com
# https://dns.lookup.dog/
# https://github.com/ogham/dog

# dog via one-off container
docker container run --rm -i -t weshigbee/consul2-dog \
  @172.17.0.4 consul.service.consul
docker container run --rm -i -t weshigbee/consul2-dog \
  @172.17.0.4 shipments.service.consul

# shipments registration
consul services register -name shipments -address 172.17.0.3
consul catalog services



```