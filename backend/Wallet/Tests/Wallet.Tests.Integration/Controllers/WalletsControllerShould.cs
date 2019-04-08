using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Xunit;

namespace Wallet.Tests.Integration.Controllers.Acceptance
{
    public class WalletsControllerShould : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public WalletsControllerShould(WebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task ReturnListOfWallets()
        {
            // Arrange
            var client = _factory
                .WithWebHostBuilder(builder => builder.UseEnvironment("test"))
                .CreateClient();
            const string url = "/api/wallets";

            // Act
            var response = await client.GetAsync(url);

            // Assert
            response.EnsureSuccessStatusCode();
        }
    }
}
