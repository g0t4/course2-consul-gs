## links

- envoy + consul docs:
  - https://www.consul.io/docs/connect/proxies/envoy
- tutorial:
  - https://learn.hashicorp.com/tutorials/consul/service-mesh-with-envoy-proxy
- enabling grpc:
  - https://www.consul.io/docs/agent/config/config-files#grpc_port for envoy's xDS API so consul can autoconfigure envoy proxies
- connect config options:
  - https://www.consul.io/docs/agent/config/config-files#connect-parameters
  - servers must have `connect { enabled = true }`

## commands / steps

- First, add sidecar service registrations
  - reload consul configs
  - `consul catalog services` - shows 2 new side car services
  - Consul UI - shows mesh icon on services
    - doesn't show the sidecar service registrations directly (instead merged into primary service - orders, shipments)
