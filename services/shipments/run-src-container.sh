
# map src dir => /src
# then run dotnet watch
docker run --rm -it -v ${PWD}/src:/src -w /src \
  -p 5000:5000 \
  mcr.microsoft.com/dotnet/sdk:7.0 dotnet watch
