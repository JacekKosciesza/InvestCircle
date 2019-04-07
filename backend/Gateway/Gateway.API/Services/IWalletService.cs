using Gateway.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gateway.API.Services
{
    public interface IWalletService
    {
        Task<ICollection<Wallet>> GetWallets(string authorizationHeaderValue);
    }
}
