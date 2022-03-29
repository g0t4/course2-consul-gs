# shipments 

## .NET 7 within container testing

```bash
#start an "sdk" container - default is bash shell
docker run --rm -it mcr.microsoft.com/dotnet/nightly/sdk:7.0

# list templates to create projects / files
dotnet new --list
# search for new templates to install (optional)
dotnet new --search api # all templates with "api" in name

# gen webapi project
dotnet new webapi

# map in current folder to docker container w/ dotnet sdk
docker run --rm -it -v ${PWD}:/shipments -w /shipments \
  -p 9000:5000 \
  mcr.microsoft.com/dotnet/sdk:7.0

dotnet new -h # help for new command (ie general arguments not specific to a template)
# --name (-n) # name for output (ie project name)
# --output (-o) # path to generate output file(s) (ie src/)
# --dry-run
dotnet new webapi -h # list template arguments (options)
# --use-minimal-apis instead of controllers
# --no-https (self explanatory)
dotnet new webapi --dry-run \
  --name shipments --output src \
  --use-minimal-apis --no-https

# run generated project
dotnet run src/

# add Faker to gen data
# https://github.com/oriches/faker-cs
dotnet add src package Faker.Net

cd src/
dotnet watch # run and watch for changes, hot reload too!

```
