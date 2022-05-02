services {
  id   = "tracking1"
  name = "tracking"
  port = 8080
  check {
    http     = "http://localhost:8080"
    interval = "10s"
  }
}
