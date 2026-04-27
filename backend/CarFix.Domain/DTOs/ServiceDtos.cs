namespace CarFix.Domain.DTOs; 
 
public record CreateServiceDto(string Name, string Description, decimal Price, int DurationMinutes); 
public record UpdateServiceDto(string Name, string Description, decimal Price, int DurationMinutes); 
public record ServiceDto(int Id, string Name, string Description, decimal Price, int DurationMinutes);
