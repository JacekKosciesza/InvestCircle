using Gateway.API.Services;
using Gateway.GraphQL.Types;
using GraphQL.Types;

namespace Gateway.GraphQL
{
    public class InvestCircleQuery : ObjectGraphType
    {
        private readonly IWalletService _walletService;

        public InvestCircleQuery(IWalletService walletService)
        {
            _walletService = walletService;
            Field<ListGraphType<WalletType>>(
                "wallets",
                resolve: context => _walletService.GetWallets()
            );
        }
    }
}
