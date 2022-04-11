# weshigbee/consul2-swiss image

This is bloated, as intended!

This image comes packed with all sorts of tools to spelunk other containers. So, many networking tools. For example, dig is installed to access consul's DNS when containerized.

## Tradeoff (installed or not)

- FWIW not all commands have to be installed/run in the container
  - can pipe output (of one off container runs) to host commands
  - nice to have tools inside when I want a shell opened up indefinitely to run commands (not one off container runs)

## Package notes

- `command-not-found` - (PRN) run `apt-get update` to get this to work
  - useful to find packages that provide a command that's not installed
- `dnsutils` - `dig` command
- `iputils-ping` - `ping` command
- `curl` and `wget` - this isn't intended to be a lean image, it's for tinkering...
