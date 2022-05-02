# https://www.consul.io/docs/agent/config/config-files#datacenter
datacenter = "mydc"
server     = false

retry_join = ["10.0.1.20"]

# https://www.consul.io/docs/agent/config/config-files#bind_addr
bind_addr = "{{ GetPrivateInterfaces | include \"network\" \"10.0.0.0/16\" | attr \"address\" }}"


## intended for local clients only
# https://www.consul.io/docs/agent/config/config-files#client_addr
client_addr = "127.0.0.1" 
# local dns only
ports {
  dns = 53
}
recursors = ["1.1.1.1"]

# enable consul exec:
disable_remote_exec = false # defaults to true 

# https://www.consul.io/docs/agent/config/config-files#data_dir
data_dir = "/consul/data"