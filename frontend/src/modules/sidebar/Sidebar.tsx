import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  LayoutDashboard, Users, FileText, ClipboardCheck, 
  ShoppingCart, Receipt, BarChart3, ShieldAlert, LogOut 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, clearAuthData } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  // Centralized Navigation Config Array
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} />, roles: ["ADMIN", "MANAGER", "PROCUREMENT_OFFICER", "VENDOR"] },
    { label: "Vendors", path: "/vendors", icon: <Users size={18} />, roles: ["ADMIN", "PROCUREMENT_OFFICER"] },
    { label: "RFQ's", path: "/rfqs", icon: <FileText size={18} />, roles: ["ADMIN", "PROCUREMENT_OFFICER", "MANAGER"] },
    { label: "Quotations", path: "/quotations", icon: <ClipboardCheck size={18} />, roles: ["ADMIN", "VENDOR", "PROCUREMENT_OFFICER"] },
    { label: "Approvals", path: "/approvals", icon: <ShieldAlert size={18} />, roles: ["ADMIN", "MANAGER"] },
    { label: "Purchase orders", path: "/purchase-orders", icon: <ShoppingCart size={18} />, roles: ["ADMIN", "PROCUREMENT_OFFICER", "MANAGER", "VENDOR"] },
    { label: "Invoices", path: "/invoices", icon: <Receipt size={18} />, roles: ["ADMIN", "PROCUREMENT_OFFICER", "MANAGER", "VENDOR"] },
    { label: "Reports", path: "/reports", icon: <BarChart3 size={18} />, roles: ["ADMIN", "MANAGER"] },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col justify-between p-4 shadow-xl shrink-0 h-full select-none">
      <div>
        {/* Brand Header */}
        <div className="p-4 text-xl font-bold border-b border-slate-800 tracking-wide text-white">
          VendorBridge <span className="text-xs font-normal text-emerald-400 block">ERP v1.0</span>
        </div>
        
        {/* Scrollable Navigation Tree */}
        <nav className="mt-6 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] pr-1 custom-scrollbar">
          {navItems.map((item) => {
            // Role Validation Guard Check
            if (user && !item.roles.includes(user.role)) return null;

            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                  isActive(item.path) 
                    ? 'bg-slate-800 text-emerald-400 border-l-2 border-emerald-400 rounded-l-none' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Operator Account Tracking Info Footer */}
      <div className="border-t border-slate-800 pt-4">
        <div className="px-4 mb-3">
          <p className="text-sm font-semibold text-white truncate">
            {user ? `${user.firstName} ${user.lastName}` : "Authenticated Operator"}
          </p>
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
  );
};