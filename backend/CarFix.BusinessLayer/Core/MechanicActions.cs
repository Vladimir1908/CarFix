using CarFix.DataAccess.Context;
using CarFix.Domain.Entities.Mechanic;
using CarFix.Domain.Models.Mechanic;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Core
{
    public class MechanicActions
    {
        protected MechanicActions() { }

        protected List<MechanicDto> GetAllMechanicsActionExecution()
        {
            var data = new List<MechanicDto>();
            List<MechanicData> mechanicData;

            using (var db = new MechanicContext())
            {
                mechanicData = db.Mechanics.Where(x => !x.IsDeleted).ToList();
            }

            if (mechanicData.Count <= 0) return data;

            foreach (var item in mechanicData)
            {
                data.Add(MapToDto(item));
            }

            return data;
        }

        protected MechanicDto? GetMechanicByIdActionExecution(int id)
        {
            MechanicData? mechanicData;

            using (var db = new MechanicContext())
            {
                mechanicData = db.Mechanics.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            }

            return mechanicData == null ? null : MapToDto(mechanicData);
        }

        protected ActionResponse CreateMechanicActionExecution(MechanicDto data)
        {
            using (var db = new MechanicContext())
            {
                var mechanicData = new MechanicData
                {
                    FirstName = data.FirstName,
                    LastName = data.LastName,
                    Phone = data.Phone,
                    Specialization = data.Specialization,
                    ExperienceYears = data.ExperienceYears,
                    IsActive = data.IsActive,
                    CreatedAt = DateTime.Now
                };

                db.Mechanics.Add(mechanicData);
                db.SaveChanges();
            }

            return new ActionResponse { IsSuccess = true, Message = "Mechanic created successfully." };
        }

        protected ActionResponse UpdateMechanicActionExecution(MechanicDto data)
        {
            MechanicData? localData;

            using (var db = new MechanicContext())
            {
                localData = db.Mechanics.FirstOrDefault(x => x.Id == data.Id && !x.IsDeleted);
            }

            if (localData == null)
                return new ActionResponse { IsSuccess = false, Message = "Mechanic not found." };

            localData.FirstName = data.FirstName;
            localData.LastName = data.LastName;
            localData.Phone = data.Phone;
            localData.Specialization = data.Specialization;
            localData.ExperienceYears = data.ExperienceYears;
            localData.IsActive = data.IsActive;
            localData.UpdatedAt = DateTime.Now;

            using (var db = new MechanicContext())
            {
                db.Mechanics.Update(localData);
                db.SaveChanges();
            }

            return new ActionResponse { IsSuccess = true, Message = "Mechanic updated successfully." };
        }

        protected ActionResponse DeleteMechanicActionExecution(int id)
        {
            MechanicData? localData;

            using (var db = new MechanicContext())
            {
                localData = db.Mechanics.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            }

            if (localData == null)
                return new ActionResponse { IsSuccess = false, Message = "Mechanic not found." };

            // Soft delete — pastreaza datele in DB
            localData.IsDeleted = true;
            localData.UpdatedAt = DateTime.Now;

            using (var db = new MechanicContext())
            {
                db.Mechanics.Update(localData);
                db.SaveChanges();
            }

            return new ActionResponse { IsSuccess = true, Message = "Mechanic deleted." };
        }

        // ─── Helper privat ────────────────────────────────────────────────────
        private static MechanicDto MapToDto(MechanicData item) => new MechanicDto
        {
            Id = item.Id,
            FirstName = item.FirstName,
            LastName = item.LastName,
            Phone = item.Phone,
            Specialization = item.Specialization,
            ExperienceYears = item.ExperienceYears,
            IsActive = item.IsActive
        };
    }
}
