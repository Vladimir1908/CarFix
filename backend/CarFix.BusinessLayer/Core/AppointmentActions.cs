using CarFix.DataAccess.Context;
using CarFix.Domain.Entities.Appointment;
using CarFix.Domain.Models.Appointment;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Core
{
    public class AppointmentActions
    {
        protected AppointmentActions() { }

        protected List<AppointmentDto> GetAllAppointmentsActionExecution()
        {
            var data = new List<AppointmentDto>();
            List<AppointmentData> apptData;
            using (var db = new AppointmentContext())
            {
                apptData = db.Appointments.Where(x => !x.IsDeleted).ToList();
            }
            if (apptData.Count <= 0) return data;
            foreach (var item in apptData)
            {
                data.Add(new AppointmentDto
                {
                    Id = item.Id,
                    ClientId = item.ClientId,
                    ServiceId = item.ServiceId,
                    CarBrand = item.CarBrand,
                    CarModel = item.CarModel,
                    LicensePlate = item.LicensePlate,
                    ScheduledAt = item.ScheduledAt,
                    Status = item.Status,
                    Mechanic = item.Mechanic,
                    Notes = item.Notes
                });
            }
            return data;
        }

        protected AppointmentDto? GetAppointmentByIdActionExecution(int id)
        {
            AppointmentData? apptData;
            using (var db = new AppointmentContext())
            {
                apptData = db.Appointments.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            }
            if (apptData == null) return null;
            return new AppointmentDto
            {
                Id = apptData.Id,
                ClientId = apptData.ClientId,
                ServiceId = apptData.ServiceId,
                CarBrand = apptData.CarBrand,
                CarModel = apptData.CarModel,
                LicensePlate = apptData.LicensePlate,
                ScheduledAt = apptData.ScheduledAt,
                Status = apptData.Status,
                Mechanic = apptData.Mechanic,
                Notes = apptData.Notes
            };
        }

        protected ActionResponse CreateAppointmentActionExecution(AppointmentDto data)
        {
            using (var db = new AppointmentContext())
            {
                var apptData = new AppointmentData
                {
                    ClientId = data.ClientId,
                    ServiceId = data.ServiceId,
                    CarBrand = data.CarBrand,
                    CarModel = data.CarModel,
                    LicensePlate = data.LicensePlate,
                    ScheduledAt = data.ScheduledAt,
                    Status = data.Status ?? "Pending",
                    Mechanic = data.Mechanic,
                    Notes = data.Notes,
                    CreatedAt = DateTime.Now
                };
                db.Appointments.Add(apptData);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Appointment created successfully." };
        }

        protected ActionResponse UpdateAppointmentActionExecution(AppointmentDto data)
        {
            AppointmentData? localData;
            using (var db = new AppointmentContext())
            {
                localData = db.Appointments.FirstOrDefault(x => x.Id == data.Id);
            }
            if (localData == null)
                return new ActionResponse { IsSuccess = false, Message = "Appointment not found." };

            localData.CarBrand = data.CarBrand;
            localData.CarModel = data.CarModel;
            localData.LicensePlate = data.LicensePlate;
            localData.ScheduledAt = data.ScheduledAt;
            localData.Status = data.Status;
            localData.Mechanic = data.Mechanic;
            localData.Notes = data.Notes;
            localData.UpdatedAt = DateTime.Now;

            using (var db = new AppointmentContext())
            {
                db.Appointments.Update(localData);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Appointment updated successfully." };
        }

        protected ActionResponse DeleteAppointmentActionExecution(int id)
        {
            AppointmentData? localData;
            using (var db = new AppointmentContext())
            {
                localData = db.Appointments.FirstOrDefault(x => x.Id == id);
            }
            if (localData == null)
                return new ActionResponse { IsSuccess = false, Message = "Appointment not found." };

            localData.IsDeleted = true;
            using (var db = new AppointmentContext())
            {
                db.Appointments.Update(localData);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Appointment deleted." };
        }
    }
}