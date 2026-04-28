using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Client;
using Microsoft.AspNetCore.Mvc;

namespace CarFix.API.Controller
{
    [Route("api/clients")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private IClientAction _client;
        public ClientController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _client = bl.ClientAction();
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            var clients = _client.GetAllClientsAction();
            return Ok(clients);
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var client = _client.GetClientByIdAction(id);
            return Ok(client);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ClientDto data)
        {
            var response = _client.CreateClientAction(data);
            return Ok(response);
        }

        [HttpPut]
        public IActionResult Update([FromBody] ClientDto data)
        {
            var response = _client.UpdateClientAction(data);
            return Ok(response);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var response = _client.DeleteClientAction(id);
            return Ok(response);
        }
    }
}