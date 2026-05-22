using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Mechanic;
using Microsoft.AspNetCore.Mvc;

namespace CarFix.API.Controller
{
    [Route("api/mechanics")]
    [ApiController]
    public class MechanicController : ControllerBase
    {
        private readonly IMechanicAction _mechanic;

        public MechanicController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _mechanic = bl.MechanicAction();
        }

        /// <summary>GET /api/mechanics/getAll — returneaza toti mecanicii activi</summary>
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            var result = _mechanic.GetAllMechanicsAction();
            return Ok(result);
        }

        /// <summary>GET /api/mechanics?id=1 — returneaza un mecanic dupa ID</summary>
        [HttpGet]
        public IActionResult Get([FromQuery] int id)
        {
            var result = _mechanic.GetMechanicByIdAction(id);
            if (result == null) return NotFound(new { Message = "Mechanic not found." });
            return Ok(result);
        }

        /// <summary>POST /api/mechanics — creeaza un mecanic nou</summary>
        [HttpPost]
        public IActionResult Create([FromBody] MechanicDto data)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var response = _mechanic.CreateMechanicAction(data);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }

        /// <summary>PUT /api/mechanics — actualizeaza un mecanic existent</summary>
        [HttpPut]
        public IActionResult Update([FromBody] MechanicDto data)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var response = _mechanic.UpdateMechanicAction(data);
            return response.IsSuccess ? Ok(response) : NotFound(response);
        }

        /// <summary>DELETE /api/mechanics?id=1 — sterge (soft delete) un mecanic</summary>
        [HttpDelete]
        public IActionResult Delete([FromQuery] int id)
        {
            var response = _mechanic.DeleteMechanicAction(id);
            return response.IsSuccess ? Ok(response) : NotFound(response);
        }
    }
}
