import React from "react";
import {
  Download,
  IndianRupee,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import Sidebar from "./Sidebar";

const ReportsPage = () => {
  const spendCategories = [
    {
      name: "IT Hardware",
      amount: "₹4.8L",
      width: "80%",
      color: "bg-blue-600",
    },
    {
      name: "Furniture",
      amount: "₹3.2L",
      width: "60%",
      color: "bg-emerald-500",
    },
    {
      name: "Stationery",
      amount: "₹2.1L",
      width: "40%",
      color: "bg-amber-500",
    },
    {
      name: "Logistics",
      amount: "₹2.3L",
      width: "45%",
      color: "bg-orange-600",
    },
  ];

  const vendors = [
    {
      vendor: "TechCore Ltd",
      spend: "₹4,20,000",
      pos: 6,
    },
    {
      vendor: "Infra Supplies",
      spend: "₹3,10,000",
      pos: 4,
    },
    {
      vendor: "FastLog",
      spend: "₹1,90,000",
      pos: 3,
    },
  ];

  const monthlyData = [
    { month: "Dec", height: "35%" },
    { month: "Jan", height: "50%" },
    { month: "Feb", height: "42%" },
    { month: "Mar", height: "70%" },
    { month: "Apr", height: "58%" },
    { month: "May", height: "82%" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 min-h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Reports & Analytics
            </h1>

            <p className="text-slate-500 mt-2">
              Procurement Insights - May 2025
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium">
              May 2025
            </button>

            <button className="px-5 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2 font-medium hover:bg-blue-700 transition">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
              <IndianRupee
                size={22}
                className="text-blue-600"
              />
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              12.4L
            </h2>

            <p className="text-slate-500 mt-1">
              Total Spend
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
              <Users
                size={22}
                className="text-emerald-600"
              />
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              28
            </h2>

            <p className="text-slate-500 mt-1">
              Active Vendors
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-4">
              <CheckCircle
                size={22}
                className="text-amber-600"
              />
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              94%
            </h2>

            <p className="text-slate-500 mt-1">
              PO Fulfillment
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="h-12 w-12 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
              <AlertCircle
                size={22}
                className="text-red-600"
              />
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              3
            </h2>

            <p className="text-slate-500 mt-1">
              Overdue Invoices
            </p>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Spend By Category */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wide">
              Spend By Category
            </h3>

            <div className="space-y-6">
              {spendCategories.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700">
                      {item.name}
                    </span>

                    <span className="font-semibold text-slate-900">
                      {item.amount}
                    </span>
                  </div>

                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{
                        width: item.width,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vendors Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wide">
              Top Vendors By Spend
            </h3>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-slate-600">
                      Vendor
                    </th>

                    <th className="text-left px-4 py-3 text-slate-600">
                      Spend
                    </th>

                    <th className="text-left px-4 py-3 text-slate-600">
                      POs
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {vendors.map((vendor, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-200"
                    >
                      <td className="px-4 py-4 text-slate-800">
                        {vendor.vendor}
                      </td>

                      <td className="px-4 py-4 font-medium">
                        {vendor.spend}
                      </td>

                      <td className="px-4 py-4">
                        {vendor.pos}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Monthly Trend */}
            <div className="mt-8">
              <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wide">
                Monthly Trend
              </h4>

              <div className="h-56 border border-slate-200 rounded-2xl p-5 flex items-end justify-between">
                {monthlyData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      className={`w-10 rounded-t-lg ${
                        index ===
                        monthlyData.length - 1
                          ? "bg-blue-600"
                          : "bg-blue-200"
                      }`}
                      style={{
                        height: item.height,
                      }}
                    />

                    <span className="text-sm text-slate-500">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-3">
            Executive Summary
          </h3>

          <p className="text-slate-600 leading-relaxed">
            Procurement spend increased by 12% compared to
            the previous month. IT Hardware remains the
            highest expenditure category, while vendor
            performance improved with a 94% purchase order
            fulfillment rate. Three invoices currently
            require immediate attention due to overdue
            status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;