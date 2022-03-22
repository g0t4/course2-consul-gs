#!/usr/bin/env bash

docker container rm install_env # if exists, drop

docker container run --name install_env \
  -it install_env

# use download page for latest install instructions
# https://www.consul.io/downloads
# modify for container env