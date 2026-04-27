using CarFix.BusinessLayer.Interfaces;
using CarFix.BusinessLayer.Services;
using CarFix.DataAccess;
using CarFix.DataAccess.Repositories;
using CarFix.Domain.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CarFixDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IGenericRepository<Client>, GenericRepository<Client>>();
builder.Services.AddScoped<IGenericRepository<Service>, GenericRepository<Service>>();
builder.Services.AddScoped<IGenericRepository<Appointment>, GenericRepository<Appointment>>();

builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<CarFixDbContext>();
    db.Database.Migrate();
}

app.Run();