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
- config entries:
  - https://www.consul.io/docs/agent/config-entries#managing-configuration-entries-with-the-cli
  - bootstrapping config entries:
    - https://www.consul.io/docs/agent/config/config-files#config_entries
  - `consul config write ./conf/oneoff-allow-os.hcl`
  - `consul config write ./conf/oneoff-deny-os.hcl`
  - `consul config list -kind service-intentions`
- intentions
  - CLI: https://www.consul.io/commands/intention
    `consul intention check orders shipments`
    `consul intention list`
    `consul intention get orders shipments`
    `consul intention create -deny orders shipments`
    `consul intention create -allow orders shipments`
    `consul intention delete orders shipments`
- service-intention config entries
  - https://www.consul.io/docs/connect/config-entries/service-intentions
  - legacy intention API vs service-intentions config entry
  - [`service-intentions` fields](https://www.consul.io/docs/connect/config-entries/service-intentions#available-fields)

## commands / steps

- First, add sidecar service registrations
  - reload consul configs
  - `consul catalog services` - shows 2 new side car services
  - Consul UI - shows mesh icon on services
    - doesn't show the sidecar service registrations directly (instead merged into primary service - orders, shipments)
