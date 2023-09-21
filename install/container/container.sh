# run consul agent via HashiCorp's verified image (https://hub.docker.com/r/hashicorp/consul):
#   NOTE: consul also has an official image on Docker Hub that is no longer receiving updates as of v1.16: https://hub.docker.com/_/consul
docker container run --rm -it \
  -p 8500:8500 -p 8600:8600 -p 8600:8600/udp \
  hashicorp/consul:1.12.0

## test if works:
# curl localhost:8500/v1/agent/self
# dig @127.0.0.1 -p 8600 consul.service.consul.