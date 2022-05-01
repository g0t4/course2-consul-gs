services {
  id   = "mail1"
  name = "smtp"
  port = 1025
  check {
    tcp      = "localhost:1025"
    interval = "20s"
  }
}
