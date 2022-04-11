#!/usr/bin/env bash

vagrant up --parallel

# enables: `ssh VmName`
# - ssh directly to VMs
# - faster than vagrant ssh
# - also useful for ssh docker context (if needed)
# - assumes config.d config files included in ssh config
vagrant ssh-config > ~/.ssh/config.d/vm-testing.config
