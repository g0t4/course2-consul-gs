datacenter = "mydc"

server    = true
bootstrap = true

retry_join = ["10.0.1.20"]

bind_addr = "{{ GetPrivateInterfaces | include \"network\" \"10.0.0.0/16\" | attr \"address\" }}"

# remote access to client services (UI/DNS/API) - otherwise not necessary
client_addr = "0.0.0.0"
ui_config {
  enabled = true
}

data_dir = "/consul/data"
