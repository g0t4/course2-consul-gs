# kill watches so we don't docker compose run new containers
tmux kill-session -t kv 

# cleanup all compose project resources
docker compose down --remove-orphans \
  --timeout 0 \
  --volumes
