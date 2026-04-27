namespace CarFix.Domain.DTOs; 
 
public record CreateClientDto(string FirstName, string LastName, string Email, string Phone); 
public record UpdateClientDto(string FirstName, string LastName, string Email, string Phone); 
public record ClientDto(int Id, string FirstName, string LastName, string Email, string Phone, DateTime CreatedAt);
