import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DashboardLayout from '../layout/DashboardLayout';
import Contact from '../components/Home/Navbar/Contact';
import About from '../components/Home/Navbar/About';
import Help from '../components/Home/Navbar/Help';
import CSRToolkitHome from '../pages/CSR/CSRToolkit/CSRToolkitHome';
import CorporateDashboard from '../pages/CSR/CSRToolkit/CorporateDashboard';
import SponsorLogin from '../pages/CSR/CSRToolkit/SponsorLogin';

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
