using CarFix.BusinessLayer.Interfaces;
using CarFix.DataAccess.Repositories;
using CarFix.Domain.DTOs;
using CarFix.Domain.Entities;

namespace CarFix.BusinessLayer.Services;

public class ServiceService : IServiceService
{
    private readonly IGenericRepository<Service> _repo;

    public ServiceService(IGenericRepository<Service> repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<ServiceDto>> GetAllAsync()
    {
        var items = await _repo.GetAllAsync();
        return items.Select(s => new ServiceDto(s.Id, s.Name, s.Description, s.Price, s.DurationMinutes));
    }

    public async Task<ServiceDto?> GetByIdAsync(int id)
    {
        var s = await _repo.GetByIdAsync(id);
        if (s == null) return null;
        return new ServiceDto(s.Id, s.Name, s.Description, s.Price, s.DurationMinutes);
    }

    public async Task<ServiceDto> CreateAsync(CreateServiceDto dto)
    {
        var service = new Service { Name = dto.Name, Description = dto.Description, Price = dto.Price, DurationMinutes = dto.DurationMinutes };
        await _repo.AddAsync(service);
        await _repo.SaveAsync();
        return new ServiceDto(service.Id, service.Name, service.Description, service.Price, service.DurationMinutes);
    }

    public async Task<ServiceDto?> UpdateAsync(int id, UpdateServiceDto dto)
    {
        var service = await _repo.GetByIdAsync(id);
        if (service == null) return null;
        service.Name = dto.Name;
        service.Description = dto.Description;
        service.Price = dto.Price;
        service.DurationMinutes = dto.DurationMinutes;
        _repo.Update(service);
        await _repo.SaveAsync();
        return new ServiceDto(service.Id, service.Name, service.Description, service.Price, service.DurationMinutes);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var service = await _repo.GetByIdAsync(id);
        if (service == null) return false;
        _repo.Delete(service);
        await _repo.SaveAsync();
        return true;
    }
}