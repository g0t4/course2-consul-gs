#!/usr/bin/env bash

sudo apt-get update
sudo apt-get upgrade -y

## add some tools for inspecting / troubleshooting
sudo apt-get install -y \
  jq bat \
  apache2-utils \
  hey \
  exa \
  icdiff \
  fzf \
  silversearcher-ag

# copy dotfiles
mkdir -p /home/vagrant/.config/bat
cp /vagrant/provision/dotfiles/bat.conf /home/vagrant/.config/bat/config
cp /vagrant/provision/dotfiles/.bashrc /home/vagrant/.bashrc

# install docker - using convenience script:
# https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# suppress login messages
touch /home/vagrant/.hushlogin
