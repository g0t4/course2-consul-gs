# cleanup all compose project resources
docker compose down --remove-orphans \
  --timeout 0 \
  --volumes
