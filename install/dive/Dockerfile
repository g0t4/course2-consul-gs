FROM ubuntu:21.10

RUN apt-get update \
  && apt-get install -y \
    curl \
    lsb-release \
    gnupg \
    software-properties-common \
    tree \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://apt.releases.hashicorp.com/gpg \
  | apt-key add -

RUN apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main" \
  \
  && apt-get update \
  && apt-get install -y consul \
  \
  && rm -rf /var/lib/apt/lists/* 