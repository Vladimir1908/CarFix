namespace CarFix.Domain.Models.Contact
{
    public class ContactDto
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string Phone { get; set; }
        public required string Subject { get; set; }
        public required string Message { get; set; }
        public string? VehicleBrand { get; set; }
        public string? VehicleModel { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}