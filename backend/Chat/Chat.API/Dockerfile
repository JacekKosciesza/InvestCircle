FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["Chat/Chat.API/Chat.API.csproj", "Chat/Chat.API/"]
RUN dotnet restore "Chat/Chat.API/Chat.API.csproj"
COPY . .
WORKDIR "/src/Chat/Chat.API"
RUN dotnet build "Chat.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Chat.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Chat.API.dll"]