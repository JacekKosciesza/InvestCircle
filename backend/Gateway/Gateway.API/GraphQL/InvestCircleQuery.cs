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
        private readonly IHttpContextAccessor _httpContext;

        public InvestCircleQuery(IWalletService walletService, IHttpContextAccessor httpContext)
        {
            _walletService = walletService;
            _httpContext = httpContext;

            Field<ListGraphType<WalletType>>(
                "wallets",
                resolve: context =>
                {
                    var user = (ClaimsPrincipal)context.UserContext;
                    var authorizationHeaderValue = _httpContext.HttpContext.Request.Headers["Authorization"];
                    return _walletService.GetWallets(authorizationHeaderValue);
                }
            );
        }
    }
}
