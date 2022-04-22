## cleanup

```bash

# remove orphans will nuke any lingering one-off dog containers
docker compose down --remove-orphans
# check containers:
docker compose ps -a # this project alone
docker container ps -a # all on host

# tmux cleanup
tmux list-sessions
tmux kill-sessions -a # kill all sessions
# or target one specifically
tmux kill-session -t monitor

```

## config docs

- `hcl` = `Hashicorp Configuration Language`
  - https://github.com/hashicorp/hcl
- consul agent configuration
  - [CLI options](https://www.consul.io/docs/agent/options#commandline_options)
  - [config file key reference](https://www.consul.io/docs/agent/options#config_key_reference)
  - ['hot' reloadable config](https://www.consul.io/docs/agent/options#reloadable-configuration)
- service registration
  - [`Service Definition` parameters](https://www.consul.io/docs/discovery/services#service)
