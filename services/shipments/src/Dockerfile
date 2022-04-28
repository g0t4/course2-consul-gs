FROM mcr.microsoft.com/dotnet/sdk:7.0.100-preview.2 AS build-env

WORKDIR /src

RUN apt-get update && apt-get install -y unzip
RUN curl -fsSL https://releases.hashicorp.com/envconsul/0.12.1/envconsul_0.12.1_linux_amd64.zip \
  --output /tmp/envconsul.zip \
  && unzip /tmp/envconsul.zip -d /tmp/envconsul/

# first restore packages
# - time consuming / "expensive"
COPY shipments.csproj .
RUN dotnet restore 

# next, copy code => build (publish) app
COPY . .
RUN dotnet publish --configuration Release --output /app



FROM mcr.microsoft.com/dotnet/aspnet:7.0.0-preview.2 AS run-env

WORKDIR /app
EXPOSE 5000

COPY --from=build-env /tmp/envconsul/envconsul /usr/bin/envconsul

# helpers
RUN apt-get update \
  && apt-get install -y curl dnsutils iputils-ping tree command-not-found iproute2 procps psmisc net-tools lshw \
  && rm -rf /var/lib/apt/lists/*

# copy build artifacts into lean, runtime image
COPY --from=build-env /app .

# by default, run app
ENTRYPOINT ["dotnet", "/app/shipments.dll"]
