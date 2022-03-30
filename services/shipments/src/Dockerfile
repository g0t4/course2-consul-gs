FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env

WORKDIR /src

# first restore packages
# - time consuming / "expensive"
COPY shipments.csproj .
RUN dotnet restore 

# next, copy code => build (publish) app
COPY . .
RUN dotnet publish --configuration Release --output /app



FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS run-env

WORKDIR /app
EXPOSE 5000

# copy build artifacts into lean, runtime image
COPY --from=build-env /app .

# by default, run app
ENTRYPOINT ["dotnet", "/app/shipments.dll"]