using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Service;
using Microsoft.AspNetCore.Mvc;

namespace CarFix.API.Controller
{
    [Route("api/services")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private IServiceAction _service;
        public ServiceController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _service = bl.ServiceAction();
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            var services = _service.GetAllServicesAction();
            return Ok(services);
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var service = _service.GetServiceByIdAction(id);
            return Ok(service);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ServiceDto data)
        {
            var response = _service.CreateServiceAction(data);
            return Ok(response);
        }

        [HttpPut]
        public IActionResult Update([FromBody] ServiceDto data)
        {
            var response = _service.UpdateServiceAction(data);
            return Ok(response);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var response = _service.DeleteServiceAction(id);
            return Ok(response);
        }
    }
}