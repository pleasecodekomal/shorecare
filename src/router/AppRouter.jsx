import { Routes, Route } from 'react-router-dom';

// Public
import LoginRegister from '../components/LoginRegister';

// Layouts
import NGODashboardLayout from '../ngo_src/layout/DashboardLayout';
import VolunteerDashboardLayout from '../volunteer_src/layout/DashboardLayout';

// NGO Pages
import NGOHome from '../ngo_src/pages/Home/Home';
import BeachMappingHome from '../ngo_src/pages/BeachMapping/BeachMappingHome';
import CSRToolkitHome from '../ngo_src/pages/CSR/CSRToolkit/CSRToolkitHome';
import CorporateDashboard from '../ngo_src/pages/CSR/CSRToolkit/CorporateDashboard';
import SponsorLogin from '../ngo_src/pages/CSR/CSRToolkit/SponsorLogin';
import SkillDeployment from '../ngo_src/pages/SkillDeployment/SkillDeployment';
import VolunteerManagement from '../ngo_src/pages/VolunteerManagement/VolunteerManagement';

// Volunteer Pages
import VolunteerHome from '../volunteer_src/pages/Home/Home';
import Achievements from '../volunteer_src/pages/Achievements';
import MyDrives from '../volunteer_src/pages/MyDrives';
import Guidance from '../volunteer_src/pages/Guidance';
import Feed from '../volunteer_src/pages/Feed';
import Profile from '../volunteer_src/pages/Profile';

const AppRouter = () => (
  <Routes>
    {/* Public Route */}
    <Route path="/" element={<LoginRegister />} />

    {/* NGO Routes */}
    <Route element={<NGODashboardLayout />}>
      <Route path="/ngohome" element={<NGOHome />} />
      <Route path="/beach-selection" element={<BeachMappingHome />} />
      <Route path="/csrtoolkithome" element={<CSRToolkitHome />} />
      <Route path="/csr/dashboard" element={<CorporateDashboard />} />
      <Route path="/csr/sponsor-login" element={<SponsorLogin />} />
      <Route path="/skill-deployment" element={<SkillDeployment />} />
      <Route path="/volunteer-management" element={<VolunteerManagement />} />
    </Route>

    {/* Volunteer Routes */}
    <Route element={<VolunteerDashboardLayout />}>
      <Route path="/volunteerhome" element={<VolunteerHome />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/my-drives" element={<MyDrives />} />
      <Route path="/guidance" element={<Guidance />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  </Routes>
);

export default AppRouter;
