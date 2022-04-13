FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
  jq bat \
  apache2-utils hey \
  exa \
  icdiff \
  fzf silversearcher-ag \
  unzip \
  curl wget \
  dnsutils \
  iputils-ping iputils-arping iputils-tracepath \
  command-not-found

RUN echo ". ~/.bashrc.swiss" >> /root/.bashrc
COPY dotfiles/.bashrc /root/.bashrc.swiss
COPY dotfiles/bat.conf /root/.config/bat/config
