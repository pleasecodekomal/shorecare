import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Achievements from '../pages/Achievements';
import MyDrives from '../pages/MyDrives';
import Guidance from '../pages/Guidance';
import Feed from '../pages/Feed';
import Profile from '../pages/Profile';
import DashboardLayout from '../layout/DashboardLayout';
import NGOLogin from '../components/Navbar/NGOLogin';
import Contact from '../components/Navbar/Contact';
import About from '../components/Navbar/About';
import Help from '../components/Navbar/Help';
import CSRToolkitHome from '../pages/CSRToolkit/CSRToolkitHome';
import CorporateDashboard from '../pages/CSRToolkit/CorporateDashboard';
import SponsorLogin from '../pages/CSRToolkit/SponsorLogin';

// ✅ Import Beach Mapping feature
import BeachMappingHome from '../pages/BeachMapping/BeachMappingHome';

const AppRouter = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />

      {/* CSR Toolkit Routes */}
      <Route path="/csrtoolkithome" element={<CSRToolkitHome />} />
      <Route path="/csr/dashboard" element={<CorporateDashboard />} />
      <Route path="/csr/sponsor-login" element={<SponsorLogin />} />

      {/* ✅ Beach Mapping Route */}
      <Route path="/beach-selection" element={<BeachMappingHome />} />
    </Route>
  </Routes>
);

export default AppRouter;
