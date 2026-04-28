using CarFix.Domain.Models.Client;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Interfaces
{
    public interface IClientAction
    {
        List<ClientDto> GetAllClientsAction();
        ClientDto? GetClientByIdAction(int id);
        ActionResponse CreateClientAction(ClientDto data);
        ActionResponse UpdateClientAction(ClientDto data);
        ActionResponse DeleteClientAction(int id);
    }
}