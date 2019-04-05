using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Identity.API.Persistence.Seed
{
    public class IdentitySeed
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<IdentityUser> _userManager;

        public IdentitySeed(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task SeedRolesAndUsers()
        {
            if (await _roleManager.FindByNameAsync("Admin") == null)
            {
                var admin = new IdentityRole
                {
                    Name = "Admin"
                };
                await _roleManager.CreateAsync(admin);
            }

            if (await _userManager.FindByEmailAsync("j.kosciesza@codeandpepper.com") == null)
            {

                var jkosciesza = new IdentityUser
                {
                    UserName = "j.kosciesza@codeandpepper.com",
                    Email = "j.kosciesza@codeandpepper.com",
                    EmailConfirmed = true

                };

                await _userManager.CreateAsync(jkosciesza, "P@ssw0rd");
                await _userManager.AddClaimsAsync(jkosciesza, new[] {
                    new Claim("given_name", "Jacek"),
                    new Claim("family_name", "Kościesza"),
                    new Claim("preferred_username", "Jacek Kościesza"),
                    new Claim("picture", "assets/img/users/jacek-kosciesza.jpg")
                });
                await _userManager.AddToRoleAsync(jkosciesza, "Admin");
            }
        }
    }
}
