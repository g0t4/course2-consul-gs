FROM ubuntu:21.10

RUN apt-get update \
  && apt-get install -y \
    curl \
    lsb-release \
    gnupg \
    software-properties-common \
    tree \
  && rm -rf /var/lib/apt/lists/*

