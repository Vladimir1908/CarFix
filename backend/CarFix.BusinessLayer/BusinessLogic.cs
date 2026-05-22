using CarFix.BusinessLayer.Interfaces;
using CarFix.BusinessLayer.Structure;

namespace CarFix.BusinessLayer
{
    public class BusinessLogic
    {
        public BusinessLogic() { }

        public IClientAction ClientAction()
            => new ClientExecution();

        public IServiceAction ServiceAction()
            => new ServiceExecution();

        public IAppointmentAction AppointmentAction()
            => new AppointmentExecution();

        public IStatisticsAction StatisticsAction()
            => new StatisticsExecution();

        public IContactAction ContactAction()
            => new ContactExecution();

        public IInventoryAction InventoryAction()
            => new InventoryExecution();

        public IMechanicAction MechanicAction()
            => new MechanicExecution();
    }
}
