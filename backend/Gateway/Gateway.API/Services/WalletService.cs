using Gateway.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Gateway.API.Services
{
    public class WalletService : IWalletService
    {
        private readonly HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContext;

        // https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests
        public WalletService(HttpClient httpClient, IHttpContextAccessor httpContext)
        {
            _httpClient = httpClient;
            _httpContext = httpContext;
        }

        public async Task<ICollection<Wallet>> GetWallets()
        {
            var authorizationHeaderValue = _httpContext.HttpContext.Request.Headers["Authorization"];
            _httpClient.DefaultRequestHeaders.Add("Authorization", authorizationHeaderValue.ToString());
            var httpResponse = await _httpClient.GetAsync("https://localhost:5003/api/wallets");
            var wallets = await httpResponse.Content.ReadAsAsync<List<Wallet>>();
            return wallets;
        }
    }
}
