using CarFix.DataAccess.Context;
using CarFix.Domain.Entities.Inventory;
using CarFix.Domain.Models.Inventory;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Core
{
    public class InventoryActions
    {
        protected InventoryActions() { }

        protected List<InventoryDto> GetAllInventoryActionExecution()
        {
            var data = new List<InventoryDto>();
            List<InventoryData> items;

            using (var db = new InventoryContext())
            {
                items = db.InventoryItems.Where(x => !x.IsDeleted).ToList();
            }

            if (items.Count <= 0) return data;

            foreach (var item in items)
                data.Add(MapToDto(item));

            return data;
        }

        protected InventoryDto? GetInventoryByIdActionExecution(int id)
        {
            InventoryData? item;

            using (var db = new InventoryContext())
            {
                item = db.InventoryItems.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            }

            return item == null ? null : MapToDto(item);
        }

        protected ActionResponse CreateInventoryActionExecution(InventoryDto data)
        {
            using (var db = new InventoryContext())
            {
                var entity = new InventoryData
                {
                    PartName  = data.PartName,
                    PartCode  = data.PartCode,
                    Category  = data.Category,
                    Supplier  = data.Supplier,
                    Quantity  = data.Quantity,
                    UnitPrice = data.UnitPrice,
                    IsActive  = data.IsActive,
                    CreatedAt = DateTime.Now
                };

                db.InventoryItems.Add(entity);
                db.SaveChanges();
            }

            return new ActionResponse { IsSuccess = true, Message = "Piesa adaugata cu succes." };
        }

        protected ActionResponse UpdateInventoryActionExecution(InventoryDto data)
        {
            InventoryData? entity;

            using (var db = new InventoryContext())
            {
                entity = db.InventoryItems.FirstOrDefault(x => x.Id == data.Id && !x.IsDeleted);
            }

            if (entity == null)
                return new ActionResponse { IsSuccess = false, Message = "Piesa nu a fost gasita." };

            entity.PartName  = data.PartName;
            entity.PartCode  = data.PartCode;
            entity.Category  = data.Category;
            entity.Supplier  = data.Supplier;
            entity.Quantity  = data.Quantity;
            entity.UnitPrice = data.UnitPrice;
            entity.IsActive  = data.IsActive;
            entity.UpdatedAt = DateTime.Now;

            using (var db = new InventoryContext())
            {
                db.InventoryItems.Update(entity);
                db.SaveChanges();
            }

            return new ActionResponse { IsSuccess = true, Message = "Piesa actualizata cu succes." };
        }

        protected ActionResponse DeleteInventoryActionExecution(int id)
        {
            InventoryData? entity;

            using (var db = new InventoryContext())
            {
                entity = db.InventoryItems.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            }

            if (entity == null)
                return new ActionResponse { IsSuccess = false, Message = "Piesa nu a fost gasita." };

            entity.IsDeleted = true;
            entity.UpdatedAt = DateTime.Now;

            using (var db = new InventoryContext())
            {
                db.InventoryItems.Update(entity);
                db.SaveChanges();
            }

            return new ActionResponse { IsSuccess = true, Message = "Piesa stearsa." };
        }

        private static InventoryDto MapToDto(InventoryData item) => new InventoryDto
        {
            Id        = item.Id,
            PartName  = item.PartName,
            PartCode  = item.PartCode,
            Category  = item.Category,
            Supplier  = item.Supplier,
            Quantity  = item.Quantity,
            UnitPrice = item.UnitPrice,
            IsActive  = item.IsActive
        };
    }
}
