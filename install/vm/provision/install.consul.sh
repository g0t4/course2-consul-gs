# adapted from https://consul.io/downloads

sudo curl -fsSL https://apt.releases.hashicorp.com/gpg \
  --output /etc/apt/trusted.gpg.d/hashicorp.asc

sudo apt-add-repository -y \
  "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"

sudo apt-get update 

sudo apt-get install -y consul

# https://www.consul.io/commands#autocompletion
consul -autocomplete-install # adds to bashrc 
# source: https://github.com/posener/complete/blob/v1/cmd/install/install.go#L81