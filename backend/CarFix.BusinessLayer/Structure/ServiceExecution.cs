using CarFix.BusinessLayer.Core;
using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Responses;
using CarFix.Domain.Models.Service;

namespace CarFix.BusinessLayer.Structure
{
    public class ServiceExecution : ServiceActions, IServiceAction
    {
        public List<ServiceDto> GetAllServicesAction()
        {
            return GetAllServicesActionExecution();
        }

        public ServiceDto? GetServiceByIdAction(int id)
        {
            return GetServiceByIdActionExecution(id);
        }

        public ActionResponse CreateServiceAction(ServiceDto data)
        {
            return CreateServiceActionExecution(data);
        }

        public ActionResponse UpdateServiceAction(ServiceDto data)
        {
            return UpdateServiceActionExecution(data);
        }

        public ActionResponse DeleteServiceAction(int id)
        {
            return DeleteServiceActionExecution(id);
        }
    }
}