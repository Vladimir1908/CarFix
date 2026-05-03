namespace CarFix.Domain.Models.Appointment
{
    public class AppointmentDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int ServiceId { get; set; }
        public string CarBrand { get; set; }
        public string CarModel { get; set; }
        public string LicensePlate { get; set; }
        public DateTime ScheduledAt { get; set; }
        public string Status { get; set; }
        public string? Mechanic { get; set; }
        public string? Notes { get; set; }
    }
}