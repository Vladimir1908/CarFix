using CarFix.DataAccess.Context;
using CarFix.Domain.Entities.Contact;
using CarFix.Domain.Models.Contact;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Core
{
    public class ContactActions
    {
        protected ContactActions() { }

        protected List<ContactDto> GetAllMessagesActionExecution()
        {
            using var db = new ContactContext();
            return db.ContactMessages
                .OrderByDescending(m => m.CreatedAt)
                .Select(m => new ContactDto
                {
                    Id = m.Id,
                    FirstName = m.FirstName,
                    LastName = m.LastName,
                    Email = m.Email,
                    Phone = m.Phone,
                    Subject = m.Subject,
                    Message = m.Message,
                    VehicleBrand = m.VehicleBrand,
                    VehicleModel = m.VehicleModel,
                    IsRead = m.IsRead,
                    CreatedAt = m.CreatedAt
                }).ToList();
        }

        protected ActionResponse CreateMessageActionExecution(ContactDto data)
        {
            using var db = new ContactContext();
            db.ContactMessages.Add(new ContactData
            {
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                Phone = data.Phone,
                Subject = data.Subject,
                Message = data.Message,
                VehicleBrand = data.VehicleBrand,
                VehicleModel = data.VehicleModel,
                IsRead = false,
                CreatedAt = DateTime.Now
            });
            db.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Mesaj trimis cu succes." };
        }

        protected ActionResponse MarkAsReadActionExecution(int id)
        {
            using var db = new ContactContext();
            var msg = db.ContactMessages.FirstOrDefault(m => m.Id == id);
            if (msg == null) return new ActionResponse { IsSuccess = false, Message = "Mesaj negasit." };
            msg.IsRead = true;
            db.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Marcat ca citit." };
        }

        protected ActionResponse DeleteMessageActionExecution(int id)
        {
            using var db = new ContactContext();
            var msg = db.ContactMessages.FirstOrDefault(m => m.Id == id);
            if (msg == null) return new ActionResponse { IsSuccess = false, Message = "Mesaj negasit." };
            db.ContactMessages.Remove(msg);
            db.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Mesaj sters." };
        }
    }
}