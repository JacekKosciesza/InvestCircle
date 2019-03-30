using System.Collections.Generic;
using System.Security.Claims;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;

namespace Identity.IdentityServer
{
    public class IdentityServerConfig
    {
        private static readonly string[] RoleClaims = { JwtClaimTypes.Role, ClaimTypes.Role };

        private static readonly IdentityResource RolesResource = new IdentityResource
        {
            Name = "roles",
            DisplayName = "Roles",
            Description = "Allow the service access to your user roles.",
            UserClaims = RoleClaims,
            ShowInDiscoveryDocument = true,
            Required = true,
            Emphasize = true
        };

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                RolesResource
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api.investcircle.org", "Invest Circle API", new [] { JwtClaimTypes.Role, ClaimTypes.Role, JwtClaimTypes.PreferredUserName, JwtClaimTypes.GivenName, JwtClaimTypes.FamilyName, JwtClaimTypes.Email, JwtClaimTypes.Picture })
            };
        }

        public static IEnumerable<Client> GetClients(IConfiguration config)
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "investcircle.org",
                    ClientName = "Invest Circle",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    ClientSecrets =
                    {
                        new Secret(config["Identity:ClientSecret"].Sha256())
                    },
                    AllowedScopes = { "api.investcircle.org", "offline_access", RolesResource.Name, IdentityServerConstants.StandardScopes.OpenId, IdentityServerConstants.StandardScopes.Profile, IdentityServerConstants.StandardScopes.Email, "given_name", "family_name"},
                    AllowOfflineAccess = true,
                    AllowedCorsOrigins = new List<string>
                    {
                        "http://localhost",
                        "http://localhost:4200",
                        "https://investcircle.org"
                    },
                    AccessTokenLifetime = 60 * 60 * 24 * 365 // one year lifetime (for testing)
                }
            };
        }
    }
}
