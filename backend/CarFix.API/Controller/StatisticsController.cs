using CarFix.BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarFix.API.Controller
{
    [Route("api/statistics")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private IStatisticsAction _statistics;

        public StatisticsController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _statistics = bl.StatisticsAction();
        }

        [HttpGet]
        public IActionResult GetStatistics()
        {
            var stats = _statistics.GetStatisticsAction();
            return Ok(stats);
        }
    }
}