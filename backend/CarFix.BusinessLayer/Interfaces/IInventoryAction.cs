using CarFix.Domain.Models.Inventory;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Interfaces
{
    public interface IInventoryAction
    {
        List<InventoryDto> GetAllInventoryAction();
        InventoryDto? GetInventoryByIdAction(int id);
        ActionResponse CreateInventoryAction(InventoryDto data);
        ActionResponse UpdateInventoryAction(InventoryDto data);
        ActionResponse DeleteInventoryAction(int id);
    }
}
