# run consul agent via official image
docker container run --rm -it \
  -p 8500:8500 -p 8600:8600 -p 8600:8600/udp \
  hashicorp/consul:1.12.0

## test if works:
# curl localhost:8500/v1/agent/self
# dig @127.0.0.1 -p 8600 consul.service.consul.