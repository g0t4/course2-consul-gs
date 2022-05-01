datacenter = "mydc"
server     = false

# retry_join = ["10.0.1.20"]

bind_addr = "{{ GetPrivateInterfaces | include \"network\" \"10.0.0.0/16\" | attr \"address\" }}"


# intended for local clients only
client_addr = "127.0.0.1"
# local dns only
ports {
  dns = 53
}
recursors = ["1.1.1.1"]
