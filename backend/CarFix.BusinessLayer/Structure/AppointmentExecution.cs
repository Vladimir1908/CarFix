using CarFix.BusinessLayer.Core;
using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Appointment;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Structure
{
    public class AppointmentExecution : AppointmentActions, IAppointmentAction
    {
        public List<AppointmentDto> GetAllAppointmentsAction()
        {
            return GetAllAppointmentsActionExecution();
        }

        public AppointmentDto? GetAppointmentByIdAction(int id)
        {
            return GetAppointmentByIdActionExecution(id);
        }

        public ActionResponse CreateAppointmentAction(AppointmentDto data)
        {
            return CreateAppointmentActionExecution(data);
        }

        public ActionResponse UpdateAppointmentAction(AppointmentDto data)
        {
            return UpdateAppointmentActionExecution(data);
        }

        public ActionResponse DeleteAppointmentAction(int id)
        {
            return DeleteAppointmentActionExecution(id);
        }
    }
}