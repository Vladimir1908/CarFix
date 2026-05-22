using CarFix.BusinessLayer.Core;
using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Mechanic;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Structure
{
    public class MechanicExecution : MechanicActions, IMechanicAction
    {
        public List<MechanicDto> GetAllMechanicsAction()
            => GetAllMechanicsActionExecution();

        public MechanicDto? GetMechanicByIdAction(int id)
            => GetMechanicByIdActionExecution(id);

        public ActionResponse CreateMechanicAction(MechanicDto data)
            => CreateMechanicActionExecution(data);

        public ActionResponse UpdateMechanicAction(MechanicDto data)
            => UpdateMechanicActionExecution(data);

        public ActionResponse DeleteMechanicAction(int id)
            => DeleteMechanicActionExecution(id);
    }
}
