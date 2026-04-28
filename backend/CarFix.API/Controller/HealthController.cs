using Microsoft.AspNetCore.Mvc;

namespace CarFix.API.Controller
{
    [Route("api/health")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { status = "CarFix API is running!", timestamp = DateTime.Now });
        }
    }
}