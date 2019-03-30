using Gateway.Models;
using GraphQL.Types;

namespace Gateway.GraphQL.Types
{
    public class WalletType : ObjectGraphType<Wallet>
    {
        public WalletType()
        {
            Field(t => t.Id);
            Field(t => t.Name).Description("Name of the wallet");
        }
    }
}
