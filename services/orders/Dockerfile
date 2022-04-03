FROM node AS runtime-env

EXPOSE 3000
WORKDIR /src

RUN apt-get update \
  && apt-get install -y \
    curl \
    dnsutils \
    iputils-ping \
    tree \
  && rm -rf /var/lib/apt/lists/*

COPY src/package.json .
RUN npm install

COPY src/*.mjs .

ENTRYPOINT ["node", "server.mjs"]
