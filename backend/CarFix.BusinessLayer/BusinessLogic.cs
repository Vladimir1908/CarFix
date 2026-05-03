using CarFix.BusinessLayer.Interfaces;
using CarFix.BusinessLayer.Structure;

namespace CarFix.BusinessLayer
{
    public class BusinessLogic
    {
        public BusinessLogic() { }

        public IClientAction ClientAction()
        {
            return new ClientExecution();
        }

        public IServiceAction ServiceAction()
        {
            return new ServiceExecution();
        }

        public IAppointmentAction AppointmentAction()
        {
            return new AppointmentExecution();
        }

        public IStatisticsAction StatisticsAction()
        {
            return new StatisticsExecution();
        }
    }
}