using CarFix.Domain.Entities.Appointment;
using Microsoft.EntityFrameworkCore;

namespace CarFix.DataAccess.Context
{
    public class AppointmentContext : DbContext
    {
        public DbSet<AppointmentData> Appointments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(CarFix.DataAccess.DbSession.ConnectionString);
        }
    }
}