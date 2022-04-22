services {
  id      = "ship1"
  name    = "shipments"
  address = "172.18.2.30"
  port    = 5000
}

services {
  # without id - replaces other initial service! (id = name (default))
  id      = "ship2"
  name    = "shipments"
  address = "172.18.2.31"
  port    = 5000
}
