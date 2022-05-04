services {
  id   = "shipments1"
  name = "shipments"
  port = 5000
  checks {
    http     = "http://localhost:5000/"
    interval = "10s"
  }
  
  connect {
    sidecar_service {
      proxy {
        listeners = [
          {
            destination_name = "tracking"
            local_bind_port = 7000
          }
        ]
      }
    }
  }
}
