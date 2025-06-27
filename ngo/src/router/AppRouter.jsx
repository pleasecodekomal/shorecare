import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

import Home from '../pages/Home/Home';
import Contact from '../components/Home/Navbar/Contact';
import About from '../components/Home/Navbar/About';
import Help from '../components/Home/Navbar/Help';

import CSRToolkitHome from '../pages/CSR/CSRToolkit/CSRToolkitHome';
import CorporateDashboard from '../pages/CSR/CSRToolkit/CorporateDashboard';
import SponsorLogin from '../pages/CSR/CSRToolkit/SponsorLogin';

import BeachMappingHome from '../pages/BeachMapping/BeachMappingHome';
import SkillDeployment from '../pages/SkillDeployment/SkillDeployment';
import VolunteerManagement from '../pages/VolunteerManagement/VolunteerManagement';

import LoginRegister from '../components/LoginRegister'; // ✅ add this!

const AppRouter = () => (
  <Routes>
    {/* ✅ Public Login/Register page */}
    <Route path="/" element={<LoginRegister />} />

    {/* ✅ Protected routes under DashboardLayout */}
    <Route element={<DashboardLayout />}>
      <Route path="/ngohome" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />

      {/* CSR Toolkit */}
      <Route path="/csrtoolkithome" element={<CSRToolkitHome />} />
      <Route path="/csr/dashboard" element={<CorporateDashboard />} />
      <Route path="/csr/sponsor-login" element={<SponsorLogin />} />

      {/* Other protected pages */}
      <Route path="/beach-selection" element={<BeachMappingHome />} />
      <Route path="/skill-deployment" element={<SkillDeployment />} />
      <Route path="/volunteer-management" element={<VolunteerManagement />} />
    </Route>
  </Routes>
);

export default AppRouter;
