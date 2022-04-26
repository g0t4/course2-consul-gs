services {
  id      = "ship1"
  name    = "shipments"
  address = "10.0.1.31"
  port    = 5000
}

services {
  id      = "ship2"
  name    = "shipments"
  address = "10.0.1.32"
  port    = 5000
  check {
    name     = "ship2 tcp check"
    tcp      = "10.0.1.32:5000"
    interval = "10s"
  }
  check {
    name     = "ship2 http check"
    http     = "http://10.0.1.32:5000/"
    interval = "10s"
  }
}













# uncomment data_dir temporarily to test consul validate on config files for a dev mode agent which doesn't have a data_dir (b/c dev mode agent uses in-memory storage)
# data_dir = "/consul/data"
