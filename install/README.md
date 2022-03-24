## Monitoring Consul (logs)

```shell
consul monitor # follow agent logs (default: local agent)

# -log-level - adjust log level filter (default INFO and above)
# -log-json - json output
#
# `jq` for syntax highlighting + formatting
# --compact-output - one line per log entry + syntax highlighting delineates fields
consul monitor -log-level debug -log-json \
  | jq --compact-output 'select(.["@module"] == "agent.http")'
# select filters log entries matching a given critera - in this case the log source (module)

```