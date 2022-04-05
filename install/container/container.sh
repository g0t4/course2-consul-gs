# run consul agent via official image
docker container run --rm -it \
  -p 8500:8500 -p 8600:8600 -p 8600:8600/udp \
  consul
