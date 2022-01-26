import Dashboard from '@module/layout/Dashboard';
import { homeLinks } from 'src/constant/navLinks';

const HomeDashboard = () => {
  console.log({
    homeLinks,
  });

  return (
    <Dashboard links={homeLinks}>
      <h1>Home</h1>
    </Dashboard>
  );
};

export default HomeDashboard;
