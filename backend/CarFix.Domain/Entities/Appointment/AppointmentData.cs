using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarFix.Domain.Entities.Appointment
{
    public class AppointmentData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int ClientId { get; set; }
        public int ServiceId { get; set; }

        [Required]
        [StringLength(100)]
        public string CarBrand { get; set; }

        [Required]
        [StringLength(100)]
        public string CarModel { get; set; }

        [StringLength(20)]
        public string LicensePlate { get; set; }

        public DateTime ScheduledAt { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Pending";

        [StringLength(500)]
        public string? Notes { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}