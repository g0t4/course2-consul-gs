# compose.yaml # docker container run --rm -it --name consul-dev -p 8500:8500 hashicorp/consul:1.12.0
# consul default args # agent -dev 
# config file args # -dns-port 53 -client 0.0.0.0 -recursor 1.1.1.1

ports {
  dns = 53
}

client_addr = "0.0.0.0"

recursors = ["1.1.1.1"]