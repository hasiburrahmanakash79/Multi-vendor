import DashboardCard from './AdminOverview/DashboardCard';
import SectionTitle from '../../components/SectionTitle';

const AdminOverview = () => {
  return (
    <div>
      <SectionTitle title={"Admin Overview"} description={"Track, manage and forecast your customers and orders."}/>
      <DashboardCard/>
      
    </div>
  );
};

export default AdminOverview;