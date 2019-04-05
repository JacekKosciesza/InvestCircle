using Swashbuckle.AspNetCore.Filters;
using System.Collections.Generic;

namespace Wallet.API.Swagger
{
    public class GetListOfWalletsResponse : IExamplesProvider
    {
        public object GetExamples()
        {
            var wallets = new List<Models.Wallet>
            {
                new Models.Wallet
                {
                    Id = 1,
                    Name = "Private",
                    Balance = 999.95m
                }
            };

            return wallets;
        }
    }
}
