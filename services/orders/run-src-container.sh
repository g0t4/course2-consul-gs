
# map src dir => /src
# then run dotnet watch
docker run --rm -it -v ${PWD}/src:/src -w /src \
  -p 3000:3000 \
  node npm run start-verbose 
