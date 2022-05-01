datacenter = "mydc"

server    = true
bootstrap_expect = 3 

bind_addr = "{{ GetPrivateInterfaces | include \"network\" \"10.0.0.0/16\" | attr \"address\" }}"

retry_join = ["10.0.1.20"] # not hurt server1 to have here

# if I want remote access to UI and API
# otherwise not necessary
client_addr = "0.0.0.0"
ui_config {
  enabled = true
}

data_dir = "/consul/data"

# enable consul exec:
disable_remote_exec = false # defaults to true 