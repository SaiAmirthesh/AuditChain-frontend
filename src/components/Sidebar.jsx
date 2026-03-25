import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  ArrowRightLeft, 
  Send, 
  Users, 
  FileText, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  BrainCircuit, 
  LogOut
} from 'lucide-react';
import { clearAuthData, getUserRole } from '../utils/auth';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const role = getUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  const getMenuItems = () => {
    switch (role) {
      case 'user':
        return [
          { name: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
          { name: 'Transactions', path: '/user/transactions', icon: ArrowRightLeft },
          { name: 'Transfer Money', path: '/user/transfer', icon: Send },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
          { name: 'All Accounts', path: '/admin/accounts', icon: Users },
          { name: 'Transactions', path: '/admin/transactions', icon: ArrowRightLeft },
          { name: 'Audit Logs', path: '/admin/audit-logs', icon: FileText },
          { name: 'System Overview', path: '/admin/system', icon: Activity },
        ];
      case 'auditor':
        return [
          { name: 'Dashboard', path: '/auditor/dashboard', icon: LayoutDashboard },
          { name: 'Audit Logs', path: '/auditor/logs', icon: FileText },
          { name: 'Verify Chain', path: '/auditor/verify', icon: ShieldCheck },
          { name: 'Alerts', path: '/auditor/alerts', icon: AlertTriangle },
          { name: 'AI Summary', path: '/auditor/ai-summary', icon: BrainCircuit },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div 
        className={`flex flex-col absolute z-50 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-72 lg:sidebar-expanded:!w-72 2xl:!w-72 shrink-0 bg-[var(--color-primary)] p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between items-center pr-3 sm:px-2 mb-10 mt-2">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-8 h-8 rounded-lg shadow-sm" alt="Logo" />
            <h1 className="text-white text-xl font-bold tracking-tight">AuditChain</h1>
          </div>
          <button
            className="lg:hidden text-slate-400 hover:text-slate-200"
            onClick={() => setSidebarOpen(false)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="space-y-8 flex-1">
          <div>
            <h3 className="text-xs uppercase text-slate-400 font-semibold pl-3 mb-3">Menu</h3>
            <ul className="mt-3 space-y-1">
              {menuItems.map((item) => {
                const active = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <li key={item.name} className={`px-3 py-2.5 rounded-md mb-1 cursor-pointer flex items-center gap-3 transition-colors ${active ? 'bg-[var(--color-secondary)] text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`} onClick={() => { navigate(item.path); setSidebarOpen(false); }}>
                    <Icon size={18} className={active ? 'text-blue-400' : 'text-slate-400'} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        
        {/* Logout at bottom */}
        <div className="mt-auto pt-4 border-t border-slate-700">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
