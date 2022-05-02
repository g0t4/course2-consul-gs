datacenter = "mydc"
server     = false

retry_join = ["10.0.1.20"]

# careful with bind/advertise addr - influences local service registrations
bind_addr = "{{ GetPrivateInterfaces | include \"network\" \"10.0.0.0/16\" | attr \"address\" }}"


## only local client services!
client_addr = "127.0.0.1"
# local dns
ports {
  dns = 53
}
recursors = ["1.1.1.1"]


data_dir = "/consul/data"
