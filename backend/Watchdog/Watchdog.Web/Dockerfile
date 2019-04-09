FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["Watchdog/Watchdog.Web/Watchdog.Web.csproj", "Watchdog/Watchdog.Web/"]
RUN dotnet restore "Watchdog/Watchdog.Web/Watchdog.Web.csproj"
COPY . .
WORKDIR "/src/Watchdog/Watchdog.Web"
RUN dotnet build "Watchdog.Web.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Watchdog.Web.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Watchdog.Web.dll"]