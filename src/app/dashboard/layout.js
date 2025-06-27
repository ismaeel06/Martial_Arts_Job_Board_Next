'use client';

import Sidebar from '../../components/dashboard/Sidebar';
import { FaBell } from 'react-icons/fa';
import '../../app/globals.css';
import { Provider, useSelector } from 'react-redux';
import store from '../../store';
import { FaTachometerAlt, FaUsers, FaUserTie } from 'react-icons/fa';

function DashboardLayoutContent({ children }) {
  const role = useSelector(state => state.role?.value || 'admin');
  const roleIcon = {
    admin: <FaTachometerAlt className="text-lg sm:text-xl text-[#D88A22]" />,
    school: <FaUsers className="text-lg sm:text-xl text-[#D88A22]" />,
    instructor: <FaUserTie className="text-lg sm:text-xl text-[#D88A22]" />,
  };
  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-orange-50 via-white to-orange-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen w-full max-w-full">
        {/* Responsive Topbar */}
        <header className="flex items-center justify-end px-3 sm:px-8 py-2 sm:py-4 bg-white/90 shadow-md backdrop-blur-md sticky top-0 z-40 border-b border-orange-200">
          <div className="flex items-center gap-2 sm:gap-6 ml-auto">
            <button className="relative p-2 rounded-lg text-[#D88A22] hover:bg-orange-100 transition-colors duration-200" aria-label="Notifications">
              <FaBell className="text-xl sm:text-2xl text-[#D88A22]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#D88A22] rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-1 bg-black/90 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl shadow">
              <span>{roleIcon[role]}</span>
              <span className="text-white font-bold text-xs sm:text-base capitalize">{role}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-2 sm:p-4 md:p-6 lg:p-10 relative w-full max-w-full overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <Provider store={store}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Provider>
  );
}
