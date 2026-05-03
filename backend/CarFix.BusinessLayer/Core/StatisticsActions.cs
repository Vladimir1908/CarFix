using CarFix.DataAccess.Context;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Core
{
    public class StatisticsActions
    {
        protected StatisticsActions() { }

        protected StatisticsDto GetStatisticsActionExecution()
        {
            var stats = new StatisticsDto
            {
                GeneratedAt = DateTime.Now
            };

            using (var db = new AppointmentContext())
            {
                var all = db.Appointments.Where(a => !a.IsDeleted).ToList();
                stats.TotalAppointments = all.Count;
                stats.PendingAppointments = all.Count(a =>
                    a.Status.Equals("Pending", StringComparison.OrdinalIgnoreCase));
                stats.ConfirmedAppointments = all.Count(a =>
                    a.Status.Equals("Confirmed", StringComparison.OrdinalIgnoreCase));
                stats.InProgressAppointments = all.Count(a =>
                    a.Status.Equals("InProgress", StringComparison.OrdinalIgnoreCase));
                stats.CompletedAppointments = all.Count(a =>
                    a.Status.Equals("Completed", StringComparison.OrdinalIgnoreCase));
                stats.CancelledAppointments = all.Count(a =>
                    a.Status.Equals("Cancelled", StringComparison.OrdinalIgnoreCase));

                var mostUsed = all
                    .GroupBy(a => a.ServiceId)
                    .OrderByDescending(g => g.Count())
                    .FirstOrDefault();
                if (mostUsed != null)
                    stats.MostRequestedService = $"ServiceId: {mostUsed.Key} ({mostUsed.Count()} programari)";
            }

            using (var db = new ServiceContext())
            {
                var services = db.Services.Where(s => !s.IsDeleted).ToList();
                stats.TotalServices = services.Count;

                using (var dbA = new AppointmentContext())
                {
                    var completed = dbA.Appointments
                        .Where(a => !a.IsDeleted &&
                               a.Status.Equals("Completed", StringComparison.OrdinalIgnoreCase))
                        .ToList();

                    foreach (var appt in completed)
                    {
                        var svc = services.FirstOrDefault(s => s.Id == appt.ServiceId);
                        if (svc != null)
                            stats.TotalRevenue += svc.ServicePrice;
                    }
                }
            }

            using (var db = new ClientContext())
            {
                stats.TotalClients = db.Clients.Count(c => !c.IsDeleted);
            }

            return stats;
        }
    }
}