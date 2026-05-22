using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Inventory;
using Microsoft.AspNetCore.Mvc;

namespace CarFix.API.Controller
{
    [Route("api/inventory")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryAction _inventory;

        public InventoryController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _inventory = bl.InventoryAction();
        }

        /// <summary>GET /api/inventory/getAll</summary>
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            var result = _inventory.GetAllInventoryAction();
            return Ok(result);
        }

        /// <summary>GET /api/inventory?id=1</summary>
        [HttpGet]
        public IActionResult Get([FromQuery] int id)
        {
            var result = _inventory.GetInventoryByIdAction(id);
            if (result == null) return NotFound(new { Message = "Piesa nu a fost gasita." });
            return Ok(result);
        }

        /// <summary>POST /api/inventory</summary>
        [HttpPost]
        public IActionResult Create([FromBody] InventoryDto data)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var response = _inventory.CreateInventoryAction(data);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }

        /// <summary>PUT /api/inventory</summary>
        [HttpPut]
        public IActionResult Update([FromBody] InventoryDto data)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var response = _inventory.UpdateInventoryAction(data);
            return response.IsSuccess ? Ok(response) : NotFound(response);
        }

        /// <summary>DELETE /api/inventory?id=1</summary>
        [HttpDelete]
        public IActionResult Delete([FromQuery] int id)
        {
            var response = _inventory.DeleteInventoryAction(id);
            return response.IsSuccess ? Ok(response) : NotFound(response);
        }
    }
}
