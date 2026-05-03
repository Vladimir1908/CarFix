using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Interfaces
{
    public interface IStatisticsAction
    {
        StatisticsDto GetStatisticsAction();
    }
}