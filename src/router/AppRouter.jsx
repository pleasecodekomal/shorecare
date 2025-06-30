import { Routes, Route } from "react-router-dom";

// Public
import LoginRegister from "../components/LoginRegister";
import ForgotPassword from "../components/ForgotPassword";

// Private wrapper
import PrivateRoute from "../components/PrivateRoute";

// Layouts
import NGODashboardLayout from "../ngo_src/layout/DashboardLayout";
import VolunteerDashboardLayout from "../volunteer_src/layout/DashboardLayout";

// NGO Pages
import NGOHome from "../ngo_src/pages/Home/Home";
import BeachMappingHome from "../ngo_src/pages/BeachMapping/BeachMappingHome";
import CSRToolkitHome from "../ngo_src/pages/CSR/CSRToolkit/CSRToolkitHome";
import CorporateDashboard from "../ngo_src/pages/CSR/CSRToolkit/CorporateDashboard";
import SponsorLogin from "../ngo_src/pages/CSR/CSRToolkit/SponsorLogin";
import SkillDeployment from "../ngo_src/pages/SkillDeployment/SkillDeployment";
import VolunteerManagement from "../ngo_src/pages/VolunteerManagement/VolunteerManagement";

// Volunteer Pages
import VolunteerHome from "../volunteer_src/pages/Home/Home";
import Achievements from "../volunteer_src/pages/Achievements";
import MyDrives from "../volunteer_src/pages/MyDrives";
import Guidance from "../volunteer_src/pages/Guidance";
import Feed from "../volunteer_src/pages/Feed";
import Profile from "../volunteer_src/pages/Profile";
import JoinDriveForm from "../volunteer_src/pages/JoinDriveForm";

const AppRouter = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LoginRegister />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* NGO Routes */}
    <Route element={<NGODashboardLayout />}>
      <Route path="/ngohome" element={<PrivateRoute><NGOHome /></PrivateRoute>} />
      <Route path="/beach-selection" element={<PrivateRoute><BeachMappingHome /></PrivateRoute>} />
      <Route path="/csrtoolkithome" element={<PrivateRoute><CSRToolkitHome /></PrivateRoute>} />
      <Route path="/csr/dashboard" element={<PrivateRoute><CorporateDashboard /></PrivateRoute>} />
      <Route path="/csr/sponsor-login" element={<PrivateRoute><SponsorLogin /></PrivateRoute>} />
      <Route path="/skill-deployment" element={<PrivateRoute><SkillDeployment /></PrivateRoute>} />
      <Route path="/volunteer-management" element={<PrivateRoute><VolunteerManagement /></PrivateRoute>} />
    </Route>

    {/* Volunteer Routes */}
    <Route element={<VolunteerDashboardLayout />}>
      <Route path="/volunteerhome" element={<PrivateRoute><VolunteerHome /></PrivateRoute>} />
      <Route path="/achievements" element={<PrivateRoute><Achievements /></PrivateRoute>} />
      <Route path="/my-drives" element={<PrivateRoute><MyDrives /></PrivateRoute>} />
      <Route path="/guidance" element={<PrivateRoute><Guidance /></PrivateRoute>} />
      <Route path="/feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/join-drive/:id" element={<PrivateRoute><JoinDriveForm /></PrivateRoute>} />
    </Route>
  </Routes>
);

export default AppRouter;
