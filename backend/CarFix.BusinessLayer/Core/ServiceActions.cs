using CarFix.DataAccess.Context;
using CarFix.Domain.Entities.Service;
using CarFix.Domain.Models.Responses;
using CarFix.Domain.Models.Service;

namespace CarFix.BusinessLayer.Core
{
    public class ServiceActions
    {
        protected ServiceActions() { }

        protected List<ServiceDto> GetAllServicesActionExecution()
        {
            var data = new List<ServiceDto>();
            List<ServiceData> serviceData;
            using (var db = new ServiceContext())
            {
                serviceData = db.Services.Where(x => !x.IsDeleted).ToList();
            }
            if (serviceData.Count <= 0) return data;
            foreach (var item in serviceData)
            {
                data.Add(new ServiceDto
                {
                    Id = item.Id,
                    ServiceName = item.ServiceName,
                    ServiceDescription = item.ServiceDescription,
                    ServicePrice = item.ServicePrice,
                    DurationMinutes = item.DurationMinutes
                });
            }
            return data;
        }

        protected ServiceDto? GetServiceByIdActionExecution(int id)
        {
            ServiceData? serviceData;
            using (var db = new ServiceContext())
            {
                serviceData = db.Services.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            }
            if (serviceData == null) return null;
            return new ServiceDto
            {
                Id = serviceData.Id,
                ServiceName = serviceData.ServiceName,
                ServiceDescription = serviceData.ServiceDescription,
                ServicePrice = serviceData.ServicePrice,
                DurationMinutes = serviceData.DurationMinutes
            };
        }

        protected ActionResponse CreateServiceActionExecution(ServiceDto data)
        {
            using (var db = new ServiceContext())
            {
                var serviceData = new ServiceData
                {
                    ServiceName = data.ServiceName,
                    ServiceDescription = data.ServiceDescription,
                    ServicePrice = data.ServicePrice,
                    DurationMinutes = data.DurationMinutes,
                    CreatedAt = DateTime.Now
                };
                db.Services.Add(serviceData);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Service created successfully." };
        }

        protected ActionResponse UpdateServiceActionExecution(ServiceDto data)
        {
            ServiceData? localData;
            using (var db = new ServiceContext())
            {
                localData = db.Services.FirstOrDefault(x => x.Id == data.Id);
            }
            if (localData == null)
                return new ActionResponse { IsSuccess = false, Message = "Service not found." };

            localData.ServiceName = data.ServiceName;
            localData.ServiceDescription = data.ServiceDescription;
            localData.ServicePrice = data.ServicePrice;
            localData.DurationMinutes = data.DurationMinutes;
            localData.UpdatedAt = DateTime.Now;

            using (var db = new ServiceContext())
            {
                db.Services.Update(localData);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Service updated successfully." };
        }

        protected ActionResponse DeleteServiceActionExecution(int id)
        {
            ServiceData? localData;
            using (var db = new ServiceContext())
            {
                localData = db.Services.FirstOrDefault(x => x.Id == id);
            }
            if (localData == null)
                return new ActionResponse { IsSuccess = false, Message = "Service not found." };

            localData.IsDeleted = true;
            using (var db = new ServiceContext())
            {
                db.Services.Update(localData);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Service deleted." };
        }
    }
}