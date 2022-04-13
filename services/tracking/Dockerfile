FROM golang AS build-env
# golang:1.18

WORKDIR /src

COPY src/*.go /src/.

RUN go build main.go


FROM debian:buster-slim AS runtime-env

WORKDIR /app
EXPOSE 8080

COPY --from=build-env /src/main /app/main

CMD ["/app/main"]

# FYI if need deps, see examples @ https://hub.docker.com/_/golang