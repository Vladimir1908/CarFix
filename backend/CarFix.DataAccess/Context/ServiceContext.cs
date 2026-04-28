using CarFix.Domain.Entities.Service;
using Microsoft.EntityFrameworkCore;

namespace CarFix.DataAccess.Context
{
    public class ServiceContext : DbContext
    {
        public DbSet<ServiceData> Services { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(CarFix.DataAccess.DbSession.ConnectionString);
        }
    }
}