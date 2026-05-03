using CarFix.Domain.Models.Appointment;
using CarFix.Domain.Models.Service;
using CarFix.Domain.Models.Client;
using System.Linq;

namespace CarFix.DataAccess.Helpers
{
    public static class QueryHelper
    {
        public static List<AppointmentDto> FilterByStatus(
            List<AppointmentDto> appointments, string? status)
        {
            if (string.IsNullOrEmpty(status)) return appointments;
            return appointments
                .Where(a => a.Status.Equals(status, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        public static List<AppointmentDto> FilterByDateRange(
            List<AppointmentDto> appointments,
            DateTime? from, DateTime? to)
        {
            var result = appointments.AsEnumerable();
            if (from.HasValue)
                result = result.Where(a => a.ScheduledAt >= from.Value);
            if (to.HasValue)
                result = result.Where(a => a.ScheduledAt <= to.Value);
            return result.ToList();
        }

        public static List<AppointmentDto> SortByDate(
            List<AppointmentDto> appointments, bool ascending = true)
        {
            return ascending
                ? appointments.OrderBy(a => a.ScheduledAt).ToList()
                : appointments.OrderByDescending(a => a.ScheduledAt).ToList();
        }

        public static List<AppointmentDto> FilterByMechanic(
            List<AppointmentDto> appointments, string? mechanic)
        {
            if (string.IsNullOrEmpty(mechanic)) return appointments;
            return appointments
                .Where(a => !string.IsNullOrEmpty(a.Mechanic) &&
                       a.Mechanic.Contains(mechanic, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        public static Dictionary<string, int> GetStatusStatistics(
            List<AppointmentDto> appointments)
        {
            return appointments
                .GroupBy(a => a.Status)
                .ToDictionary(g => g.Key, g => g.Count());
        }

        public static Dictionary<int, int> GetServiceUsageStatistics(
            List<AppointmentDto> appointments)
        {
            return appointments
                .GroupBy(a => a.ServiceId)
                .ToDictionary(g => g.Key, g => g.Count());
        }

        public static List<ServiceDto> SortServicesByPrice(
            List<ServiceDto> services, bool ascending = true)
        {
            return ascending
                ? services.OrderBy(s => s.ServicePrice).ToList()
                : services.OrderByDescending(s => s.ServicePrice).ToList();
        }

        public static List<ServiceDto> FilterServicesByMaxPrice(
            List<ServiceDto> services, decimal maxPrice)
        {
            return services
                .Where(s => s.ServicePrice <= maxPrice)
                .ToList();
        }

        public static List<ClientDto> SearchClients(
            List<ClientDto> clients, string keyword)
        {
            if (string.IsNullOrEmpty(keyword)) return clients;
            keyword = keyword.ToLower();
            return clients.Where(c =>
                c.FirstName.ToLower().Contains(keyword) ||
                c.LastName.ToLower().Contains(keyword) ||
                c.Email.ToLower().Contains(keyword) ||
                c.Phone.Contains(keyword))
                .ToList();
        }
    }
}