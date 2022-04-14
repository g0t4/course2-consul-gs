# Initial, 3 containers demo

```bash
# orders service
docker container run --rm -it -p 3000:3000 --name orders weshigbee/consul2-orders

# shipments service
docker container run --rm -it -p 5000:5000 --name shipments weshigbee/consul2-shipments




```