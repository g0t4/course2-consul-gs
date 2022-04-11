#!/usr/bin/env bash

# manual confirm to nuke VMs
vagrant destroy

# remove ssh config to vms
trash ~/.ssh/config.d/vm-testing.config

echo "use 'vagrant box rm' to remove boxes when done with all demos"
