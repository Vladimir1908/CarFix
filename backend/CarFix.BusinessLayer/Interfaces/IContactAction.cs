using CarFix.Domain.Models.Contact;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Interfaces
{
    public interface IContactAction
    {
        List<ContactDto> GetAllMessagesAction();
        ActionResponse CreateMessageAction(ContactDto data);
        ActionResponse MarkAsReadAction(int id);
        ActionResponse DeleteMessageAction(int id);
    }
}