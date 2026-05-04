using CarFix.BusinessLayer.Core;
using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Contact;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Structure
{
    public class ContactExecution : ContactActions, IContactAction
    {
        public List<ContactDto> GetAllMessagesAction() => GetAllMessagesActionExecution();
        public ActionResponse CreateMessageAction(ContactDto data) => CreateMessageActionExecution(data);
        public ActionResponse MarkAsReadAction(int id) => MarkAsReadActionExecution(id);
        public ActionResponse DeleteMessageAction(int id) => DeleteMessageActionExecution(id);
    }
}