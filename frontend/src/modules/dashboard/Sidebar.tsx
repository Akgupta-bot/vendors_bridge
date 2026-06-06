import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Scale,
  ClipboardCheck,
  ShoppingCart,
  Receipt,
  BarChart3,
  Activity,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Vendors",
      path: "/vendors",
      icon: Building2,
    },
    {
      name: "RFQs",
      path: "/rfqs",
      icon: FileText,
    },
    {
      name: "Quotations",
      path: "/quotations",
      icon: Scale,
    },
    {
      name: "Approvals",
      path: "/approvals",
      icon: ClipboardCheck,
    },
    {
      name: "Purchase Orders",
      path: "/purchase-orders",
      icon: ShoppingCart,
    },
    {
      name: "Invoices",
      path: "/invoices",
      icon: Receipt,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: BarChart3,
    },
    {
      name: "Activity",
      path: "/activity",
      icon: Activity,
    },
  ];

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        w-64
        h-screen
        bg-gradient-to-b
        from-slate-950
        via-slate-900
        to-slate-950
        border-r
        border-slate-800
        flex
        flex-col
        shadow-2xl
      "
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
          VendorBridge
        </h1>

        <p className="text-xs text-slate-500 mt-1 tracking-wide">
          Procurement Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                transition-all duration-300
                ${
                  isActive
                    ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-800 p-4 bg-slate-950/30">

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-lg">
            A
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Admin User
            </h3>

            <p className="text-xs text-slate-400">
              Procurement Officer
            </p>
          </div>
        </div>

        <button
          className="
            mt-4
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-2.5
            rounded-xl
            bg-slate-800
            text-slate-300
            hover:bg-slate-700
            transition
          "
        >
          <User size={16} />
          Profile
        </button>

        <button
          className="
            mt-2
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-2.5
            rounded-xl
            bg-red-500/10
            text-red-400
            hover:bg-red-500/20
            transition
          "
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;