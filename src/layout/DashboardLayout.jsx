import { Outlet, useLocation } from 'react-router-dom';
import NGOSidebar from '../components/Home/Ngo_Sidebar';
import VolunteerSidebar from '../components/Home/Volunteer_Sidebar';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ✅ Example: decide role based on current URL prefix
  const location = useLocation();
  const isNGO = location.pathname.startsWith('/ngo');
  const isVolunteer = location.pathname.startsWith('/volunteer');

  return (
    <div className="flex">
      {isNGO && <NGOSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      {isVolunteer && <VolunteerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

      <div className={`transition-all duration-300 flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Navbar isSidebarOpen={isSidebarOpen} />
        <main className="pt-10 px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
