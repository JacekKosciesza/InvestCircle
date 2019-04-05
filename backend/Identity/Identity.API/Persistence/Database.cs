using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Identity.Persistence
{
    public class Database : IdentityDbContext
    {
        public Database() { }

        public Database(DbContextOptions<Database> options)
            : base(options)
        {
        }
    }
}
