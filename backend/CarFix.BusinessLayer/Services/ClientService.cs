using CarFix.BusinessLayer.Interfaces;
using CarFix.DataAccess.Repositories;
using CarFix.Domain.DTOs;
using CarFix.Domain.Entities;

namespace CarFix.BusinessLayer.Services;

public class ClientService : IClientService
{
    private readonly IGenericRepository<Client> _repo;

    public ClientService(IGenericRepository<Client> repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<ClientDto>> GetAllAsync()
    {
        var clients = await _repo.GetAllAsync();
        return clients.Select(c => new ClientDto(c.Id, c.FirstName, c.LastName, c.Email, c.Phone, c.CreatedAt));
    }

    public async Task<ClientDto?> GetByIdAsync(int id)
    {
        var c = await _repo.GetByIdAsync(id);
        if (c == null) return null;
        return new ClientDto(c.Id, c.FirstName, c.LastName, c.Email, c.Phone, c.CreatedAt);
    }

    public async Task<ClientDto> CreateAsync(CreateClientDto dto)
    {
        var client = new Client { FirstName = dto.FirstName, LastName = dto.LastName, Email = dto.Email, Phone = dto.Phone };
        await _repo.AddAsync(client);
        await _repo.SaveAsync();
        return new ClientDto(client.Id, client.FirstName, client.LastName, client.Email, client.Phone, client.CreatedAt);
    }

    public async Task<ClientDto?> UpdateAsync(int id, UpdateClientDto dto)
    {
        var client = await _repo.GetByIdAsync(id);
        if (client == null) return null;
        client.FirstName = dto.FirstName;
        client.LastName = dto.LastName;
        client.Email = dto.Email;
        client.Phone = dto.Phone;
        _repo.Update(client);
        await _repo.SaveAsync();
        return new ClientDto(client.Id, client.FirstName, client.LastName, client.Email, client.Phone, client.CreatedAt);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var client = await _repo.GetByIdAsync(id);
        if (client == null) return false;
        _repo.Delete(client);
        await _repo.SaveAsync();
        return true;
    }
}