# run consul agent via HashiCorp's verified image
docker container run --rm -it \
  -p 8500:8500 -p 8600:8600 -p 8600:8600/udp \
  hashicorp/consul:1.12.0
