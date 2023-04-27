using ServerApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ServerApp.Data
{
    public class UserDbContext: DbContext
    {

        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { 
        }

        public DbSet<User> Users { get; set; }
    }
}
