FROM node AS runtime-env

EXPOSE 3000
WORKDIR /src

COPY src/package.json .
RUN npm install

COPY src/*.mjs .

ENTRYPOINT ["node", "server.mjs"]
