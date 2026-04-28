using CarFix.Domain.Models.Appointment;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Interfaces
{
    public interface IAppointmentAction
    {
        List<AppointmentDto> GetAllAppointmentsAction();
        AppointmentDto? GetAppointmentByIdAction(int id);
        ActionResponse CreateAppointmentAction(AppointmentDto data);
        ActionResponse UpdateAppointmentAction(AppointmentDto data);
        ActionResponse DeleteAppointmentAction(int id);
    }
}