using Gateway.API.Services;
using Gateway.GraphQL.Types;
using GraphQL.Types;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

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
                resolve: context =>
                {
                    var user = (ClaimsPrincipal)context.UserContext;
                    return _walletService.GetWallets();
                }
            );
        }
    }
}
