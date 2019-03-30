using Gateway.GraphQL.Types;
using Gateway.Models;
using GraphQL.Types;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gateway.GraphQL
{
    public class InvestCircleQuery : ObjectGraphType
    {
        public InvestCircleQuery()
        {
            Field<ListGraphType<WalletType>>(
                "wallets",
                resolve: context => GetAll()
            );
        }

        private Task<List<Wallet>> GetAll()
        {
            var wallets = new List<Wallet>
            {
                new Wallet
                {
                    Id = 1,
                    Name = "Private"
                }
            };
            return Task.FromResult(wallets);
        }
    }
}
