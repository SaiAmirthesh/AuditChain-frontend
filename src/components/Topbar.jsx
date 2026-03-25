import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { getUserName } from '../utils/auth';

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex items-center">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu size={24} />
            </button>
            
            {/* Search Form */}
            <form className="hidden sm:block ml-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Search className="absolute inset-y-0 left-0 h-full w-5 text-gray-400 pointer-events-none ml-2" />
                <input
                  id="search"
                  className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-md leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search transactions..."
                  type="search"
                />
              </div>
            </form>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-4">
            <button className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 relative transition-colors">
              <span className="sr-only">View notifications</span>
              <Bell size={20} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-100"></div>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <button className="flex items-center gap-2 outline-none">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm">
                {(getUserName() || 'U').charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-700">{getUserName() || 'User Profile'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Topbar;
