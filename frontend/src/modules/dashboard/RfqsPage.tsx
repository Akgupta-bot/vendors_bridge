import React, { useState } from "react";
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";

import Sidebar from "./Sidebar";

const RFQsPage = () => {
  const [search, setSearch] = useState("");

  const rfqs = [
    {
      id: "RFQ-001",
      title: "Office Furniture Procurement",
      category: "Furniture",
      vendors: 12,
      deadline: "15 Jun 2026",
      status: "Open",
    },
    {
      id: "RFQ-002",
      title: "Network Infrastructure Upgrade",
      category: "IT",
      vendors: 8,
      deadline: "20 Jun 2026",
      status: "Pending",
    },
    {
      id: "RFQ-003",
      title: "Transportation Services",
      category: "Logistics",
      vendors: 15,
      deadline: "10 Jun 2026",
      status: "Closed",
    },
  ];

  const filteredRFQs = rfqs.filter(
    (rfq) =>
      rfq.title.toLowerCase().includes(search.toLowerCase()) ||
      rfq.category.toLowerCase().includes(search.toLowerCase()) ||
      rfq.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 min-h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            RFQs
          </h1>

          <p className="text-slate-500 mt-2">
            Manage Request For Quotations and vendor participation.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <FileText className="text-emerald-600 mb-3" size={28} />
            <h3 className="text-3xl font-bold">48</h3>
            <p className="text-slate-500 text-sm">Total RFQs</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <CheckCircle className="text-green-600 mb-3" size={28} />
            <h3 className="text-3xl font-bold">28</h3>
            <p className="text-slate-500 text-sm">Open RFQs</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <Clock className="text-amber-500 mb-3" size={28} />
            <h3 className="text-3xl font-bold">12</h3>
            <p className="text-slate-500 text-sm">Pending Review</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <AlertCircle className="text-red-500 mb-3" size={28} />
            <h3 className="text-3xl font-bold">8</h3>
            <p className="text-slate-500 text-sm">Closed RFQs</p>
          </div>

        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

          {/* Search */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between mb-6">

            <div className="relative w-full lg:w-96">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search RFQ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition">
              + Create RFQ
            </button>

          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">

            <button className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              All (48)
            </button>

            <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm">
              Open (28)
            </button>

            <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm">
              Pending (12)
            </button>

            <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm">
              Closed (8)
            </button>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="py-4">RFQ ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Vendors Invited</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredRFQs.map((rfq) => (
                  <tr
                    key={rfq.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-4 font-semibold text-slate-800">
                      {rfq.id}
                    </td>

                    <td>{rfq.title}</td>

                    <td>{rfq.category}</td>

                    <td>{rfq.vendors}</td>

                    <td>{rfq.deadline}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          rfq.status === "Open"
                            ? "bg-emerald-100 text-emerald-700"
                            : rfq.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {rfq.status}
                      </span>
                    </td>

                    <td>
                      <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50">
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQsPage;