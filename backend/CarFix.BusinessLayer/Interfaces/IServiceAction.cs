using CarFix.Domain.Models.Responses;
using CarFix.Domain.Models.Service;

namespace CarFix.BusinessLayer.Interfaces
{
    public interface IServiceAction
    {
        List<ServiceDto> GetAllServicesAction();
        ServiceDto? GetServiceByIdAction(int id);
        ActionResponse CreateServiceAction(ServiceDto data);
        ActionResponse UpdateServiceAction(ServiceDto data);
        ActionResponse DeleteServiceAction(int id);
    }
}