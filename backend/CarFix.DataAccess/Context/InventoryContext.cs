using CarFix.Domain.Entities.Inventory;
using Microsoft.EntityFrameworkCore;

namespace CarFix.DataAccess.Context
{
    public class InventoryContext : DbContext
    {
        public DbSet<InventoryData> InventoryItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(CarFix.DataAccess.DbSession.ConnectionString);
        }
    }
}
