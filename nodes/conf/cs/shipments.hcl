services {
  id   = "shipments1"
  name = "shipments"
  port = 5000
  checks {
    http     = "http://localhost:5000/"
    interval = "10s"
  }
}
