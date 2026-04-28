using CarFix.BusinessLayer.Core;
using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Client;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Structure
{
    public class ClientExecution : ClientActions, IClientAction
    {
        public List<ClientDto> GetAllClientsAction()
        {
            return GetAllClientsActionExecution();
        }

        public ClientDto? GetClientByIdAction(int id)
        {
            return GetClientByIdActionExecution(id);
        }

        public ActionResponse CreateClientAction(ClientDto data)
        {
            return CreateClientActionExecution(data);
        }

        public ActionResponse UpdateClientAction(ClientDto data)
        {
            return UpdateClientActionExecution(data);
        }

        public ActionResponse DeleteClientAction(int id)
        {
            return DeleteClientActionExecution(id);
        }
    }
}