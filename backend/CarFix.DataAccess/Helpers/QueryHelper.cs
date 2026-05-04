using CarFix.Domain.Models.Appointment;
using CarFix.Domain.Models.Client;
using CarFix.Domain.Models.Service;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarFix.DataAccess.Helpers
{
        public static class QueryHelper
    {
       
        public static List<AppointmentDto> FilterByStatus(
            List<AppointmentDto> appointments,
            string? status)
        {
            if (string.IsNullOrWhiteSpace(status))
                return appointments;

            return appointments
                .Where(a => string.Equals(a.Status, status, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

               public static List<AppointmentDto> FilterByDateRange(
            List<AppointmentDto> appointments,
            DateTime? from,
            DateTime? to)
        {
            var query = appointments.AsEnumerable();

            if (from.HasValue)
                query = query.Where(a => a.ScheduledAt >= from.Value);

            if (to.HasValue)
                query = query.Where(a => a.ScheduledAt <= to.Value);

            return query.ToList();
        }

        
        public static List<AppointmentDto> SortByDate(
            List<AppointmentDto> appointments,
            bool ascending = true)
        {
            return ascending
                ? appointments.OrderBy(a => a.ScheduledAt).ToList()
                : appointments.OrderByDescending(a => a.ScheduledAt).ToList();
        }

        
        public static List<AppointmentDto> FilterByMechanic(
            List<AppointmentDto> appointments,
            string? mechanicName)
        {
            if (string.IsNullOrWhiteSpace(mechanicName))
                return appointments;

            return appointments
                .Where(a =>
                    !string.IsNullOrEmpty(a.Mechanic) &&
                    a.Mechanic.Contains(mechanicName, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        
        public static List<AppointmentDto> FilterByLicensePlate(
            List<AppointmentDto> appointments,
            string? licensePlate)
        {
            if (string.IsNullOrWhiteSpace(licensePlate))
                return appointments;

            return appointments
                .Where(a => string.Equals(a.LicensePlate, licensePlate,
                    StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        
        public static List<AppointmentDto> GetUnassigned(
            List<AppointmentDto> appointments)
        {
            return appointments
                .Where(a => string.IsNullOrEmpty(a.Mechanic))
                .ToList();
        }


        public static Dictionary<string, int> GetStatusStatistics(
            List<AppointmentDto> appointments)
        {
            return appointments
                .GroupBy(a => a.Status, StringComparer.OrdinalIgnoreCase)
                .ToDictionary(g => g.Key, g => g.Count(), StringComparer.OrdinalIgnoreCase);
        }

        
        public static Dictionary<int, int> GetServiceUsageStatistics(
            List<AppointmentDto> appointments)
        {
            return appointments
                .GroupBy(a => a.ServiceId)
                .ToDictionary(g => g.Key, g => g.Count());
        }

      
        public static Dictionary<string, int> GetMechanicWorkload(
            List<AppointmentDto> appointments)
        {
            return appointments
                .Where(a => !string.IsNullOrEmpty(a.Mechanic))
                .GroupBy(a => a.Mechanic!, StringComparer.OrdinalIgnoreCase)
                .ToDictionary(g => g.Key, g => g.Count(), StringComparer.OrdinalIgnoreCase);
        }

        
        public static int? GetMostRequestedServiceId(List<AppointmentDto> appointments)
        {
            return appointments
                .GroupBy(a => a.ServiceId)
                .OrderByDescending(g => g.Count())
                .Select(g => (int?)g.Key)
                .FirstOrDefault();
        }

        
        public static List<ServiceDto> SortServicesByPrice(
            List<ServiceDto> services,
            bool ascending = true)
        {
            return ascending
                ? services.OrderBy(s => s.ServicePrice).ToList()
                : services.OrderByDescending(s => s.ServicePrice).ToList();
        }

       
        public static List<ServiceDto> FilterByMaxPrice(
            List<ServiceDto> services,
            decimal maxPrice)
        {
            return services
                .Where(s => s.ServicePrice <= maxPrice)
                .ToList();
        }

               public static List<ServiceDto> SearchServices(
            List<ServiceDto> services,
            string? keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
                return services;

            var kw = keyword.ToLower();
            return services
                .Where(s =>
                    s.ServiceName.ToLower().Contains(kw) ||
                    (!string.IsNullOrEmpty(s.ServiceDescription) &&
                     s.ServiceDescription.ToLower().Contains(kw)))
                .ToList();
        }

        
        public static List<ServiceDto> SortByDuration(
            List<ServiceDto> services,
            bool ascending = true)
        {
            return ascending
                ? services.OrderBy(s => s.DurationMinutes).ToList()
                : services.OrderByDescending(s => s.DurationMinutes).ToList();
        }

                public static List<ClientDto> SearchClients(
            List<ClientDto> clients,
            string? keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
                return clients;

            var kw = keyword.ToLower();
            return clients
                .Where(c =>
                    c.FirstName.ToLower().Contains(kw) ||
                    c.LastName.ToLower().Contains(kw) ||
                    c.Email.ToLower().Contains(kw) ||
                    c.Phone.Contains(kw))
                .ToList();
        }

                public static List<ClientDto> SortClientsByName(
            List<ClientDto> clients,
            bool ascending = true)
        {
            return ascending
                ? clients.OrderBy(c => c.LastName).ThenBy(c => c.FirstName).ToList()
                : clients.OrderByDescending(c => c.LastName).ThenByDescending(c => c.FirstName).ToList();
        }
    }
}