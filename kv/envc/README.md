## commands


```bash

## SETUP
docker compose up 
#
# new tab
./env.tmux.sh # start up layout to monitor services
#
# watch environ: (inside container)
# shows diff change in env! from envconsul!
docker compose exec envc-shipments bash
watch -td -n 1 'cat /proc/$(pgrep dotnet)/environ | tr "\0" "\n"'
#   manual for now - quoting nightmare


# create shipments folder for nesting config
consul kv put shipments # errors
consul kv put shipments/ # include / for folders

# keep an eye on envc-shipments logs 
#  mention envconsul output
#  (will indicate when restart from envconsul)

# toggle on tracking info (calls tracking svc)
consul kv put shipments/MY_SHIPMENTS__TOGGLES__INCLUDETRACKINGINFO true
# will error b/c tracking service is not configured properly (localhost)
#   show errors in logs 

# configure tracking service URL (point at consul SD)
consul kv put shipments/MY_SHIPMENTS__TRACKINGSERVICEURL http://tracking.service.consul:8080

# WORKS!

# toggle off:
consul kv put shipments/MY_SHIPMENTS__TOGGLES__INCLUDETRACKINGINFO false

```