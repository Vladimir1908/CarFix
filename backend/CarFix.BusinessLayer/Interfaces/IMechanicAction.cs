using CarFix.Domain.Models.Mechanic;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Interfaces
{
    public interface IMechanicAction
    {
        List<MechanicDto> GetAllMechanicsAction();
        MechanicDto? GetMechanicByIdAction(int id);
        ActionResponse CreateMechanicAction(MechanicDto data);
        ActionResponse UpdateMechanicAction(MechanicDto data);
        ActionResponse DeleteMechanicAction(int id);
    }
}
