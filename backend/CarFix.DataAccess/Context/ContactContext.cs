using CarFix.Domain.Entities.Contact;
using Microsoft.EntityFrameworkCore;

namespace CarFix.DataAccess.Context
{
    public class ContactContext : DbContext
    {
        public DbSet<ContactData> ContactMessages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(DbSession.ConnectionString);
        }
    }
}