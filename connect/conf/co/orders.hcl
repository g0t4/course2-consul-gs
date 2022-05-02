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
            # envoy will run locally on this port
            # and proxy requests to shipments
            # - as if shipments were running locally on port 6000
            # - hence why I might go back to 5000 which is the normal shipments port
            local_bind_port  = 6000 # later go back to 5000?
          }
        ]
      }
    }
  }
}
