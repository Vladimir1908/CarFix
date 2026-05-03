using CarFix.BusinessLayer.Core;
using CarFix.BusinessLayer.Interfaces;
using CarFix.Domain.Models.Responses;

namespace CarFix.BusinessLayer.Structure
{
    public class StatisticsExecution : StatisticsActions, IStatisticsAction
    {
        public StatisticsDto GetStatisticsAction()
        {
            return GetStatisticsActionExecution();
        }
    }
}