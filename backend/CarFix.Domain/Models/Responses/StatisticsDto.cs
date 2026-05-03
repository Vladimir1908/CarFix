namespace CarFix.Domain.Models.Responses
{
    public class StatisticsDto
    {
        public int TotalAppointments { get; set; }
        public int PendingAppointments { get; set; }
        public int ConfirmedAppointments { get; set; }
        public int InProgressAppointments { get; set; }
        public int CompletedAppointments { get; set; }
        public int CancelledAppointments { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalServices { get; set; }
        public int TotalClients { get; set; }
        public string? MostRequestedService { get; set; }
        public DateTime GeneratedAt { get; set; }
    }
}