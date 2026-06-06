import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LayoutDashboard, Users, FileText, ClipboardCheck, LogOut } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col justify-between p-4 shadow-xl">
        <div>
          <div className="p-4 text-xl font-bold border-b border-slate-800 tracking-wide text-white">
            VendorBridge <span className="text-xs font-normal text-emerald-400 block">ERP v1.0</span>
          </div>
          
          <nav className="mt-6 space-y-1">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            {/* Conditionally render links depending on the user role */}
            {user?.role === 'ADMIN' && (
              <Link to="/vendors" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
                <Users size={18} /> Manage Vendors
              </Link>
            )}

            {(user?.role === 'PROCUREMENT_OFFICER' || user?.role === 'ADMIN') && (
              <Link to="/rfqs" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
                <FileText size={18} /> RFQ Management
              </Link>
            )}

            {(user?.role === 'MANAGER' || user?.role === 'ADMIN') && (
              <Link to="/approvals" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
                <ClipboardCheck size={18} /> Approvals
              </Link>
            )}
          </nav>
        </div>

        {/* User Footer info */}
        <div className="border-t border-slate-800 pt-4">
          <div className="px-4 mb-3">
            <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
            <span className="inline-block text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-emerald-400 px-2 py-0.5 rounded mt-1">
              {user?.role?.replace('_', ' ')}
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-rose-400 hover:bg-rose-950/30 transition text-sm font-medium"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700">Procurement Operations Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">System Connected</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {/* Sub-pages inject here via React Router */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};