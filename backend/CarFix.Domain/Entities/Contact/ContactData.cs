using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarFix.Domain.Entities.Contact
{
    public class ContactData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required][StringLength(100)]
        public required string FirstName { get; set; }

        [Required][StringLength(100)]
        public required string LastName { get; set; }

        [Required][StringLength(200)]
        public required string Email { get; set; }

        [Required][StringLength(20)]
        public required string Phone { get; set; }

        [Required][StringLength(100)]
        public required string Subject { get; set; }

        [Required][StringLength(2000)]
        public required string Message { get; set; }

        [StringLength(100)]
        public string? VehicleBrand { get; set; }

        [StringLength(100)]
        public string? VehicleModel { get; set; }

        public bool IsRead { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}