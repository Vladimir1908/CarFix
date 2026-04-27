using CarFix.BusinessLayer.Interfaces;
using CarFix.DataAccess;
using CarFix.DataAccess.Repositories;
using CarFix.Domain.DTOs;
using CarFix.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarFix.BusinessLayer.Services;

public class AppointmentService : IAppointmentService
{
    private readonly IGenericRepository<Appointment> _repo;
    private readonly CarFixDbContext _context;

    public AppointmentService(IGenericRepository<Appointment> repo, CarFixDbContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<IEnumerable<AppointmentDto>> GetAllAsync()
    {
        var items = await _context.Appointments
            .Include(a => a.Client)
            .Include(a => a.Service)
            .ToListAsync();
        return items.Select(ToDto);
    }

    public async Task<AppointmentDto?> GetByIdAsync(int id)
    {
        var a = await _context.Appointments
            .Include(a => a.Client)
            .Include(a => a.Service)
            .FirstOrDefaultAsync(a => a.Id == id);
        return a == null ? null : ToDto(a);
    }

    public async Task<AppointmentDto> CreateAsync(CreateAppointmentDto dto)
    {
        var a = new Appointment
        {
            ClientId = dto.ClientId,
            ServiceId = dto.ServiceId,
            CarBrand = dto.CarBrand,
            CarModel = dto.CarModel,
            LicensePlate = dto.LicensePlate,
            ScheduledAt = dto.ScheduledAt,
            Notes = dto.Notes
        };
        await _repo.AddAsync(a);
        await _repo.SaveAsync();
        var full = await _context.Appointments
            .Include(x => x.Client)
            .Include(x => x.Service)
            .FirstAsync(x => x.Id == a.Id);
        return ToDto(full);
    }

    public async Task<AppointmentDto?> UpdateAsync(int id, UpdateAppointmentDto dto)
    {
        var a = await _repo.GetByIdAsync(id);
        if (a == null) return null;
        a.CarBrand = dto.CarBrand;
        a.CarModel = dto.CarModel;
        a.LicensePlate = dto.LicensePlate;
        a.ScheduledAt = dto.ScheduledAt;
        a.Status = dto.Status;
        a.Notes = dto.Notes;
        _repo.Update(a);
        await _repo.SaveAsync();
        var full = await _context.Appointments
            .Include(x => x.Client)
            .Include(x => x.Service)
            .FirstAsync(x => x.Id == a.Id);
        return ToDto(full);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var a = await _repo.GetByIdAsync(id);
        if (a == null) return false;
        _repo.Delete(a);
        await _repo.SaveAsync();
        return true;
    }

    private static AppointmentDto ToDto(Appointment a) => new(
        a.Id, a.ClientId, a.ServiceId,
        a.CarBrand, a.CarModel, a.LicensePlate,
        a.ScheduledAt, a.Status, a.Notes, a.CreatedAt,
        $"{a.Client.FirstName} {a.Client.LastName}",
        a.Service.Name);
}