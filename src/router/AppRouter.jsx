import { Routes, Route } from 'react-router-dom';

// Shared
import LoginRegister from '../components/LoginRegister';
import DashboardLayout from '../layout/DashboardLayout';// adjust if you have it in layout/

// NGO pages
import NGOHome from '../ngo_src/pages/Home/Home';
import BeachMappingHome from '../ngo_src/pages/BeachMapping/BeachMappingHome';
import CSRToolkitHome from '../ngo_src/pages/CSR/CSRToolkitHome';
import CorporateDashboard from '../ngo_src/pages/CSR/CorporateDashboard';
import SponsorLogin from '../ngo_src/pages/CSR/SponsorLogin';
import SkillDeployment from '../ngo_src/pages/SkillDeployment/SkillDeployment';
import VolunteerManagement from '../ngo_src/pages/VolunteerManagement/VolunteerManagement';

// Volunteer pages
import VolunteerHome from '../volunteer_src/pages/Home/Home';
import Achievements from '../volunteer_src/pages/Achievements';
import MyDrives from '../volunteer_src/pages/MyDrives';
import Guidance from '../volunteer_src/pages/Guidance';
import Feed from '../volunteer_src/pages/Feed';
import Profile from '../volunteer_src/pages/Profile';

// Common pages if any
// e.g., About, Contact, Help → you can add if they’re shared

const AppRouter = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<LoginRegister />} />

    {/* NGO side */}
    <Route element={<DashboardLayout />}>
      <Route path="/ngohome" element={<NGOHome />} />
      <Route path="/beach-selection" element={<BeachMappingHome />} />
      <Route path="/csrtoolkithome" element={<CSRToolkitHome />} />
      <Route path="/csr/dashboard" element={<CorporateDashboard />} />
      <Route path="/csr/sponsor-login" element={<SponsorLogin />} />
      <Route path="/skill-deployment" element={<SkillDeployment />} />
      <Route path="/volunteer-management" element={<VolunteerManagement />} />

      {/* Volunteer side */}
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
