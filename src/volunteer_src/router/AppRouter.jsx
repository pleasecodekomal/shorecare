import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Achievements from '../pages/Achievements';
import MyDrives from '../pages/MyDrives';
import Guidance from '../pages/Guidance';
import Feed from '../pages/Feed';
import Profile from '../pages/Profile';
import DashboardLayout from '../layout/DashboardLayout';
import NGOLogin from '../components/Home/Navbar/NGOLogin';
import Contact from '../components/Home/Navbar/Contact';
import About from '../components/Home/Navbar/About';
import Help from '../components/Home/Navbar/Help';

const AppRouter = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/volunteerhome" element={<Home />} />

      <Route path="/achievements" element={<Achievements />} />
      <Route path="/my-drives" element={<MyDrives />} />
      <Route path="/guidance" element={<Guidance />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/ngo-login" element={<NGOLogin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />

    </Route>
  </Routes>
);

export default AppRouter;
