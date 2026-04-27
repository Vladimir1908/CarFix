namespace CarFix.Domain.Entities; 
 
public class Appointment 
{ 
    public int Id { get; set; } 
    public int ClientId { get; set; } 
    public int ServiceId { get; set; } 
    public string CarBrand { get; set; } = string.Empty; 
    public string CarModel { get; set; } = string.Empty; 
    public string LicensePlate { get; set; } = string.Empty; 
    public DateTime ScheduledAt { get; set; } 
    public string Status { get; set; } = "Pending"; 
    public string? Notes { get; set; } 
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
    public Client Client { get; set; } = null!; 
    public Service Service { get; set; } = null!; 
}
