import {
  Users,
  FileText,
  ClipboardCheck,
  Receipt,
  Plus,
  Search,
} from "lucide-react";

import Sidebar from "./Sidebar";

const Dashboard = () => {
  const stats = [
    {
      title: "Active RFQs",
      value: "12",
      icon: FileText,
    },
    {
      title: "Pending Approvals",
      value: "5",
      icon: ClipboardCheck,
    },
    {
      title: "PO's This Month",
      value: "₹2.3L",
      icon: Receipt,
    },
    {
      title: "Overdue Invoices",
      value: "3",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <main className="ml-64 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-14">

          <div>
            <h1 className="text-6xl font-bold tracking-tight">
              Dashboard
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Welcome back, Procurement Officer
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                placeholder="Search..."
                className="
                  w-72
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-xl
                  pl-12
                  pr-4
                  py-3
                  focus:outline-none
                  focus:border-emerald-500
                "
              />
            </div>

            <div className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-emerald-500">●</span>
              <span className="ml-2 text-slate-300">
                System Connected
              </span>
            </div>

            <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">
              A
            </div>

          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-slate-900/70
                  backdrop-blur-sm
                  border
                  border-slate-800
                  rounded-3xl
                  p-8
                  min-h-[220px]
                  hover:border-emerald-500
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  shadow-xl
                "
              >
                <div className="flex items-center justify-between">

                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Icon
                      size={24}
                      className="text-emerald-500"
                    />
                  </div>

                  <span className="text-xs text-slate-500">
                    LIVE
                  </span>
                </div>

                <h2 className="text-5xl font-bold mt-6">
                  {item.value}
                </h2>

                <p className="text-slate-400 mt-3">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-emerald-500 transition">
            <p className="text-slate-400 text-sm">
              Monthly Spend
            </p>

            <h2 className="text-5xl font-bold mt-3">
              ₹8.4L
            </h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-emerald-500 transition">
            <p className="text-slate-400 text-sm">
              Active Vendors
            </p>

            <h2 className="text-5xl font-bold mt-3">
              420
            </h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-emerald-500 transition">
            <p className="text-slate-400 text-sm">
              RFQ Response Rate
            </p>

            <h2 className="text-5xl font-bold mt-3">
              87%
            </h2>
          </div>

        </div>

        {/* TABLE + CHART */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 shadow-xl">

            <h2 className="text-2xl font-semibold mb-6">
              Recent Purchase Orders
            </h2>

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3">PO#</th>
                  <th className="text-left py-3">Vendor</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="py-4">PO1</td>
                  <td>Infra</td>
                  <td>₹70,000</td>
                  <td>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                      Approved
                    </span>
                  </td>
                </tr>

                <tr className="border-b border-slate-800">
                  <td className="py-4">PO2</td>
                  <td>Tech Core</td>
                  <td>₹1,00,000</td>
                  <td>
                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4">PO3</td>
                  <td>OfficeLead</td>
                  <td>₹39,000</td>
                  <td>
                    <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-300">
                      Draft
                    </span>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 shadow-xl">

            <h2 className="text-2xl font-semibold mb-6">
              Spending Trend
            </h2>

            <div className="h-72 flex items-end justify-center gap-5">
              <div className="w-10 bg-emerald-500 rounded-t h-24"></div>
              <div className="w-10 bg-emerald-500 rounded-t h-40"></div>
              <div className="w-10 bg-emerald-500 rounded-t h-20"></div>
              <div className="w-10 bg-emerald-500 rounded-t h-52"></div>
              <div className="w-10 bg-emerald-500 rounded-t h-32"></div>
            </div>

          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="mt-10 bg-slate-900 rounded-3xl border border-slate-800 p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b border-slate-800 pb-3">
              <span>RFQ #RFQ001 Created</span>
              <span className="text-slate-400">2 mins ago</span>
            </div>

            <div className="flex justify-between border-b border-slate-800 pb-3">
              <span>Vendor ABC Approved</span>
              <span className="text-slate-400">15 mins ago</span>
            </div>

            <div className="flex justify-between">
              <span>PO #PO003 Generated</span>
              <span className="text-slate-400">1 hour ago</span>
            </div>

          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <button className="bg-emerald-500 hover:bg-emerald-600 p-6 rounded-3xl font-semibold text-lg shadow-lg transition flex items-center justify-center gap-2">
            <Plus size={18} />
            Create New RFQ
          </button>

          <button className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-emerald-500 transition">
            Register Vendor
          </button>

          <button className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-emerald-500 transition">
            View Invoices
          </button>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;