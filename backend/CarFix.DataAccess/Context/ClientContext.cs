using CarFix.Domain.Entities.Client;
using Microsoft.EntityFrameworkCore;

namespace CarFix.DataAccess.Context
{
    public class ClientContext : DbContext
    {
        public DbSet<ClientData> Clients { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(CarFix.DataAccess.DbSession.ConnectionString);
        }
    }
}