using System.Threading.Tasks;

namespace Wallet.Core.Services
{
    public interface IWalletService
    {
        Task<Models.Wallet> GetWalletByEmail(string email);
    }
}
