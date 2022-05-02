FROM consul:1.12 AS consul

# copy consul binary into envoy image
FROM envoyproxy/envoy:v1.22-latest
COPY --from=consul /bin/consul /bin/consul
