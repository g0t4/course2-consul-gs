#!/usr/bin/env bash

vagrant up --parallel

# enables: `ssh VmName`
# - ssh directly to VMs
# - faster than vagrant ssh
# - also useful for ssh docker context (if needed)
# - assumes config.d config files included in ssh config
vagrant ssh-config > ~/.ssh/config.d/vm-testing.config

# optional: create docker contexts
# TODO: somewhere I have code to generate these from vagrant status command (look at swarm course)
# docker context create --docker "host=ssh://s1" s1
# - then: `docker -c s1 container ps` or `docker context use s1` 