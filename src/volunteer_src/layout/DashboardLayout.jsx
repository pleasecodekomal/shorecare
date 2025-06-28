import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Home/Sidebar';
import Navbar from '../components/Home/Navbar';
import { useState } from 'react';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className={`transition-all duration-300 flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Navbar isSidebarOpen={isSidebarOpen} />
        <main className="pt-10 px-1">
           <Outlet />
        </main>
      </div>
    </div>
  );
}
