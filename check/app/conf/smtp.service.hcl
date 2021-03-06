services {
  id      = "mail1"
  name    = "smtp"
  address = "10.0.1.61"
  port    = 1025
  check {
    tcp      = "10.0.1.61:1025"
    interval = "20s"
  }
}

services {
  id      = "mail2"
  name    = "smtp"
  address = "10.0.1.62"
  port    = 26
  check {
    tcp      = "10.0.1.62:26"
    interval = "20s"
  }
}
