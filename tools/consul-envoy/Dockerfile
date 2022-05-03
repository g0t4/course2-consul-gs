FROM consul:1.12 AS consul

# copy consul binary into envoy image
FROM envoyproxy/envoy:v1.22-latest
COPY --from=consul /bin/consul /bin/consul

# helper tools - ie tcpflow
RUN apt-get update \
  && apt-get install -y curl dnsutils iputils-ping tree command-not-found iproute2 procps psmisc net-tools lshw tcpdump tcpflow \
  && rm -rf /var/lib/apt/lists/*