FROM golang
# golang:1.18

EXPOSE 8080
WORKDIR /src

COPY src/*.go /src/.

RUN go build main.go

CMD ["/src/main"]

# FYI if need deps, see examples @ https://hub.docker.com/_/golang