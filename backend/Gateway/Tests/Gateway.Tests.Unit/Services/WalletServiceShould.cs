using Gateway.API.Services;
using MaxKagamine.Moq.HttpClient;
using Microsoft.AspNetCore.Http;
using Moq;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace Gateway.Tests.Unit.Services
{
    public class WalletServiceShould
    {
        [Fact]
        public async Task CallWalletsApi()
        {
            // Arrange
            var httpMessageHandler = new Mock<HttpMessageHandler>();
            var httpClient = httpMessageHandler.CreateClient();
            var list = new List<Models.Wallet>
            {
                new Models.Wallet
                {
                    Id = 1,
                    Name = "Private",
                    Balance = 999.95m
                }
            };
            httpMessageHandler.SetupRequest(HttpMethod.Get, "https://localhost:5003/api/wallets")
            .ReturnsResponse(JsonConvert.SerializeObject(list), "application/json");
            var httpContext = new Mock<IHttpContextAccessor>();
            httpContext.SetupGet(m => m.HttpContext.Request.Headers["Authorization"]).Returns("Bearer XYZ");
            var walletsService = new WalletService(httpClient, httpContext.Object);

            // Act
            var wallets = await walletsService.GetWallets();

            // Assert
            httpMessageHandler.VerifyAnyRequest(Times.Once());
            // Assert.Equal(list, wallets); // TODO: check why it doesn't work
        }
    }
}
