using Gateway.Models;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Gateway.API.Services
{
    public class WalletService : IWalletService
    {
        private readonly HttpClient _httpClient;

        // https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests
        public WalletService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<ICollection<Wallet>> GetWallets(string authorizationHeaderValue)
        {
            _httpClient.DefaultRequestHeaders.Add("Authorization", authorizationHeaderValue);
            var httpResponse = await _httpClient.GetAsync("https://localhost:5003/api/wallets");
            var wallets = await httpResponse.Content.ReadAsAsync<List<Wallet>>();
            return wallets;
        }
    }
}
