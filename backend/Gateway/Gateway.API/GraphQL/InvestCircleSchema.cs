using GraphQL;
using GraphQL.Types;

namespace Gateway.GraphQL
{
    public class InvestCircleSchema : Schema
    {
        public InvestCircleSchema(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<InvestCircleQuery>();
        }
    }
}
