services {
  id   = "orders1"
  name = "orders"
  port = 3000
  checks {
    http     = "http://localhost:3000/"
    interval = "10s"
  }

  connect {
    sidecar_service {
      proxy {
        upstreams = [
          {
            destination_name = "shipments"
            local_bind_port  = 6000
          }
        ]
      }
    }
  }
}
