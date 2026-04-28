namespace CarFix.Domain.Models.Service
{
    public class ServiceDto
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public string ServiceDescription { get; set; }
        public decimal ServicePrice { get; set; }
        public int DurationMinutes { get; set; }
    }
}