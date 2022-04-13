FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
  jq bat \
  apache2-utils hey \
  exa \
  icdiff \
  fzf silversearcher-ag \
  unzip \
  curl wget \
  dnsutils iproute2 \
  iputils-ping iputils-arping iputils-tracepath \
  command-not-found \
  procps psmisc \
  net-tools \
  && rm -rf /var/lib/apt/lists/*

RUN echo ". ~/.bashrc.swiss" >> /root/.bashrc
COPY dotfiles/.bashrc /root/.bashrc.swiss
COPY dotfiles/bat.conf /root/.config/bat/config
