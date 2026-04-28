using CarFix.DataAccess.Context;
using CarFix.Domain.Entities.Client;
using CarFix.Domain.Models.Client;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Core
{
    public class ClientActions
    {
        protected ClientActions() { }

        protected List<ClientDto> GetAllClientsActionExecution()
        {
            var data = new List<ClientDto>();
            List<ClientData> clientData;
            using (var db = new ClientContext())
            {
                clientData = db.Clients.Where(x => !x.IsDeleted).ToList();
            }
            if (clientData.Count <= 0) return data;
            foreach (var item in clientData)
            {
                data.Add(new ClientDto
                {
                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    Email = item.Email,
                    Phone = item.Phone
                });
            }
            return data;
        }

        protected ClientDto? GetClientByIdActionExecution(int id)
        {
            ClientData? clientData;
            using (var db = new ClientContext())
            {
                clientData = db.Clients.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            }
            if (clientData == null) return null;
            return new ClientDto
            {
                Id = clientData.Id,
                FirstName = clientData.FirstName,
                LastName = clientData.LastName,
                Email = clientData.Email,
                Phone = clientData.Phone
            };
        }

        protected ActionResponse CreateClientActionExecution(ClientDto data)
        {
            using (var db = new ClientContext())
            {
                var clientData = new ClientData
                {
                    FirstName = data.FirstName,
                    LastName = data.LastName,
                    Email = data.Email,
                    Phone = data.Phone,
                    CreatedAt = DateTime.Now
                };
                db.Clients.Add(clientData);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Client created successfully." };
        }

        protected ActionResponse UpdateClientActionExecution(ClientDto data)
        {
            ClientData? localData;
            using (var db = new ClientContext())
            {
                localData = db.Clients.FirstOrDefault(x => x.Id == data.Id);
            }
            if (localData == null)
                return new ActionResponse { IsSuccess = false, Message = "Client not found." };

            localData.FirstName = data.FirstName;
            localData.LastName = data.LastName;
            localData.Email = data.Email;
            localData.Phone = data.Phone;
            localData.UpdatedAt = DateTime.Now;

            using (var db = new ClientContext())
            {
                db.Clients.Update(localData);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Client updated successfully." };
        }

        protected ActionResponse DeleteClientActionExecution(int id)
        {
            ClientData? localData;
            using (var db = new ClientContext())
            {
                localData = db.Clients.FirstOrDefault(x => x.Id == id);
            }
            if (localData == null)
                return new ActionResponse { IsSuccess = false, Message = "Client not found." };

            localData.IsDeleted = true;
            using (var db = new ClientContext())
            {
                db.Clients.Update(localData);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Client deleted." };
        }
    }
}