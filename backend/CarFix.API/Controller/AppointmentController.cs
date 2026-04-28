using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Appointment;
using Microsoft.AspNetCore.Mvc;

namespace CarFix.API.Controller
{
    [Route("api/appointments")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private IAppointmentAction _appointment;
        public AppointmentController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _appointment = bl.AppointmentAction();
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            var appointments = _appointment.GetAllAppointmentsAction();
            return Ok(appointments);
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var appointment = _appointment.GetAppointmentByIdAction(id);
            return Ok(appointment);
        }

        [HttpPost]
        public IActionResult Create([FromBody] AppointmentDto data)
        {
            var response = _appointment.CreateAppointmentAction(data);
            return Ok(response);
        }

        [HttpPut]
        public IActionResult Update([FromBody] AppointmentDto data)
        {
            var response = _appointment.UpdateAppointmentAction(data);
            return Ok(response);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var response = _appointment.DeleteAppointmentAction(id);
            return Ok(response);
        }
    }
}