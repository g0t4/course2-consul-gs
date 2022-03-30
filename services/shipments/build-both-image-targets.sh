echo "building both targets (build-env and run-env)..."

docker image build --pull \
  --tag shipments-build-env \
  --target=build-env \
  ./src/

docker image build --pull \
  --tag shipments-run-env \
  --target=run-env \
  ./src/

echo
echo "use dive to analyze what is copied into each image:"
echo "   dive shipments-build-env"
echo "   dive shipments-run-env"
