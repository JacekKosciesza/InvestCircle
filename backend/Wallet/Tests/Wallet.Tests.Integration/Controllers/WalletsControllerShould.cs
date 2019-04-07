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
            var client = _factory.CreateClient();
            const string accessToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlNzIzNzVmNzA3YTdmMTg3ODJhZmM5ODQ3MjA4OWY3IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NTQ2NTY5MzksImV4cCI6MTU4NjE5MjkzOSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSIsImF1ZCI6WyJodHRwczovL2xvY2FsaG9zdDo1MDAxL3Jlc291cmNlcyIsImFwaS5pbnZlc3RjaXJjbGUub3JnIl0sImNsaWVudF9pZCI6ImludmVzdGNpcmNsZS5vcmciLCJzdWIiOiJjNTlkZmQyNS1jZTMyLTRhZjYtOGZkYS0zM2E0MTk0MDIxMmMiLCJhdXRoX3RpbWUiOjE1NTQ2NTY5MzksImlkcCI6ImxvY2FsIiwiZ2l2ZW5fbmFtZSI6IkphY2VrIiwiZmFtaWx5X25hbWUiOiJLb8WbY2llc3phIiwicHJlZmVycmVkX3VzZXJuYW1lIjpbIkphY2VrIEtvxZtjaWVzemEiLCJqLmtvc2NpZXN6YUBjb2RlYW5kcGVwcGVyLmNvbSJdLCJwaWN0dXJlIjoiYXNzZXRzL2ltZy91c2Vycy9qYWNlay1rb3NjaWVzemEuanBnIiwicm9sZSI6IkFkbWluIiwiZW1haWwiOiJqLmtvc2NpZXN6YUBjb2RlYW5kcGVwcGVyLmNvbSIsInNjb3BlIjpbImVtYWlsIiwib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiYXBpLmludmVzdGNpcmNsZS5vcmciLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.IZHPYRMd67z3pN62O039e8iqSSDjb49AFjqIZFP2F1a3IPrc7_iT60KRDVReRzxjH1L2lm84Vr3_IKLjRuSyv7Xef13Snq_jFDIdXE3xz3p5VBrjW8tUnd9aOP27GrslfZToAC1cY1XJRTndc9XUw8hmcqvJ_HrDTrbrPB5NTF7MeXTmw-UwVLU76TOUdvHz_A6w7G8m35BFTGMEBbUMtyvl-WktRFr01JPe4RiXJN-rixwU7LaGtGHEhbvrSQK5zNTCEnviewqy3I1yIlXmoVgd-9dWGCanSlCsLJD4LwIms1kOzGKLvOzGoZHPJBNSMt7w3XOkU169bHzlZAqh0A";
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            const string url = "/api/wallets";

            // Act
            var response = await client.GetAsync(url);

            // Assert
            response.EnsureSuccessStatusCode();
        }
    }
}
