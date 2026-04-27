namespace CarFix.Domain.DTOs; 
 
public record CreateAppointmentDto(int ClientId, int ServiceId, string CarBrand, string CarModel, string LicensePlate, DateTime ScheduledAt, string? Notes); 
public record UpdateAppointmentDto(string CarBrand, string CarModel, string LicensePlate, DateTime ScheduledAt, string Status, string? Notes); 
public record AppointmentDto(int Id, int ClientId, int ServiceId, string CarBrand, string CarModel, string LicensePlate, DateTime ScheduledAt, string Status, string? Notes, DateTime CreatedAt, string ClientName, string ServiceName);
