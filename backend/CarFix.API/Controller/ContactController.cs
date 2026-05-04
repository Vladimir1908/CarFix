using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Contact;
using Microsoft.AspNetCore.Mvc;

namespace CarFix.API.Controller
{
    [Route("api/contact")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private IContactAction _contact;

        public ContactController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _contact = bl.ContactAction();
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_contact.GetAllMessagesAction());

        [HttpPost]
        public IActionResult Create([FromBody] ContactDto data) => Ok(_contact.CreateMessageAction(data));

        [HttpPut("read/{id}")]
        public IActionResult MarkRead(int id) => Ok(_contact.MarkAsReadAction(id));

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) => Ok(_contact.DeleteMessageAction(id));
    }
}