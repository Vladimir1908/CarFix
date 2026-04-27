using CarFix.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarFix.DataAccess;

public class CarFixDbContext : DbContext
{
    public CarFixDbContext(DbContextOptions<CarFixDbContext> options) : base(options) { }

    public DbSet<Client> Clients => Set<Client>();
    public DbSet<Service> Services => Set<Service>();
    public DbSet<Appointment> Appointments => Set<Appointment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>(e => {
            e.HasKey(x => x.Id);
            e.Property(x => x.Email).IsRequired().HasMaxLength(200);
            e.Property(x => x.FirstName).IsRequired().HasMaxLength(100);
            e.Property(x => x.LastName).IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<Service>(e => {
            e.HasKey(x => x.Id);
            e.Property(x => x.Price).HasColumnType("decimal(10,2)");
        });

        modelBuilder.Entity<Appointment>(e => {
            e.HasKey(x => x.Id);
            e.HasOne(x => x.Client).WithMany(x => x.Appointments).HasForeignKey(x => x.ClientId);
            e.HasOne(x => x.Service).WithMany(x => x.Appointments).HasForeignKey(x => x.ServiceId);
        });
    }
}