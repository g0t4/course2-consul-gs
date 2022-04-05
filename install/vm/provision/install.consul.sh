# adapted from https://consul.io/downloads

sudo curl -fsSL https://apt.releases.hashicorp.com/gpg \
  --output /etc/apt/trusted.gpg.d/hashicorp.asc

sudo apt-add-repository \
  "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"

sudo apt-get update 

sudo apt-get install -y consul