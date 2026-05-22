using CarFix.BusinessLayer.Core;
using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Inventory;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Structure
{
    public class InventoryExecution : InventoryActions, IInventoryAction
    {
        public List<InventoryDto> GetAllInventoryAction()
            => GetAllInventoryActionExecution();

        public InventoryDto? GetInventoryByIdAction(int id)
            => GetInventoryByIdActionExecution(id);

        public ActionResponse CreateInventoryAction(InventoryDto data)
            => CreateInventoryActionExecution(data);

        public ActionResponse UpdateInventoryAction(InventoryDto data)
            => UpdateInventoryActionExecution(data);

        public ActionResponse DeleteInventoryAction(int id)
            => DeleteInventoryActionExecution(id);
    }
}
