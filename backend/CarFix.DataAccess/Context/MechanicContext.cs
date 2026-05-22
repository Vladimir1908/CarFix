using CarFix.Domain.Entities.Mechanic;
using Microsoft.EntityFrameworkCore;

namespace CarFix.DataAccess.Context
{
    public class MechanicContext : DbContext
    {
        public DbSet<MechanicData> Mechanics { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(CarFix.DataAccess.DbSession.ConnectionString);
        }
    }
}
