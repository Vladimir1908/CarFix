using CarFix.DataAccess.Context;
using CarFix.Domain.Models.Responses;
using System;
using System.Linq;

namespace CarFix.BusinessLayer.Core
{
    /// <summary>
    /// Clasa Core pentru actiunile de statistici.
    /// Calculeaza metricele din toate contextele bazei de date.
    /// </summary>
    public class StatisticsActions
    {
        protected StatisticsActions() { }

        /// <summary>
        /// Executa calculul complet al statisticilor sistemului CarFix.
        /// Interogheaza AppointmentContext, ServiceContext si ClientContext
        /// si asambleaza rezultatele intr-un StatisticsDto.
        /// </summary>
        /// <returns>StatisticsDto populat cu toate metricele calculate.</returns>
        protected StatisticsDto GetStatisticsActionExecution()
        {
            var stats = new StatisticsDto
            {
                GeneratedAt = DateTime.Now
            };

            // ── Appointment statistics ──────────────────────────────────────
            using (var db = new AppointmentContext())
            {
                var allAppointments = db.Appointments
                    .Where(a => !a.IsDeleted)
                    .ToList();

                stats.TotalAppointments = allAppointments.Count;

                stats.PendingAppointments = allAppointments
                    .Count(a => string.Equals(a.Status, "Pending",
                        StringComparison.OrdinalIgnoreCase));

                stats.ConfirmedAppointments = allAppointments
                    .Count(a => string.Equals(a.Status, "Confirmed",
                        StringComparison.OrdinalIgnoreCase));

                stats.InProgressAppointments = allAppointments
                    .Count(a => string.Equals(a.Status, "InProgress",
                        StringComparison.OrdinalIgnoreCase));

                stats.CompletedAppointments = allAppointments
                    .Count(a => string.Equals(a.Status, "Completed",
                        StringComparison.OrdinalIgnoreCase));

                stats.CancelledAppointments = allAppointments
                    .Count(a => string.Equals(a.Status, "Cancelled",
                        StringComparison.OrdinalIgnoreCase));

                // Most requested service (by frequency)
                var mostUsedServiceId = allAppointments
                    .GroupBy(a => a.ServiceId)
                    .OrderByDescending(g => g.Count())
                    .Select(g => (int?)g.Key)
                    .FirstOrDefault();

                if (mostUsedServiceId.HasValue)
                {
                    var cnt = allAppointments.Count(a => a.ServiceId == mostUsedServiceId.Value);
                    stats.MostRequestedService =
                        $"ServiceId {mostUsedServiceId.Value} ({cnt} programari)";
                }

                // Revenue from completed appointments
                var completedServiceIds = allAppointments
                    .Where(a => string.Equals(a.Status, "Completed",
                        StringComparison.OrdinalIgnoreCase))
                    .Select(a => a.ServiceId)
                    .ToList();

                if (completedServiceIds.Any())
                {
                    using var svcDb = new ServiceContext();
                    var servicePrices = svcDb.Services
                        .Where(s => !s.IsDeleted)
                        .ToDictionary(s => s.Id, s => s.ServicePrice);

                    stats.TotalRevenue = completedServiceIds
                        .Where(id => servicePrices.ContainsKey(id))
                        .Sum(id => servicePrices[id]);
                }
            }

            // ── Service statistics ──────────────────────────────────────────
            using (var db = new ServiceContext())
            {
                stats.TotalServices = db.Services
                    .Count(s => !s.IsDeleted);
            }

            // ── Client statistics ───────────────────────────────────────────
            using (var db = new ClientContext())
            {
                stats.TotalClients = db.Clients
                    .Count(c => !c.IsDeleted);
            }

            return stats;
        }
    }
}