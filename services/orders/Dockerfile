FROM node:slim AS runtime-env

EXPOSE 3000
WORKDIR /src

# helpers
RUN apt-get update \
  && apt-get install -y curl dnsutils iputils-ping tree command-not-found iproute2 procps psmisc net-tools lshw \
  && rm -rf /var/lib/apt/lists/*

COPY src/package.json .
RUN npm install

COPY src/*.mjs .

ENTRYPOINT ["node", "server.mjs"]
