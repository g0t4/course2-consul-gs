# Initial, 3 containers demo

## commands (copy/paste)

```bash
# orders service
docker container run --rm -it -p 3000:3000 --name orders weshigbee/consul2-orders

# shipments service
docker container run --rm -it -p 5000:5000 --name shipments weshigbee/consul2-shipments

## lookup container IPs
# via bridge network
docker network inspect bridge | jq
docker network inspect bridge | jq ".[].Containers"

# launch shell in container:
docker container exec -i -t orders      bash
docker container exec -i -t shipments   bash
# inside:
 ip -c -4 address show  
 netstat -l
 curl localhost:3000 # orders service
 curl localhost:5000 # shipments service

# or, run one-off commands:
docker container exec -i -t orders      ip -c -4 a s


```