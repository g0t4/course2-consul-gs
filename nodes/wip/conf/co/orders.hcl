services {
  id   = "orders1"
  name = "orders"
  port = 3000
  checks {
    http     = "http://localhost:3000/"
    interval = "10s"
  }
}
