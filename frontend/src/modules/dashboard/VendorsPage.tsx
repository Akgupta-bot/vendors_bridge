import React, { useState } from "react";
import {
  Search,
  Building2,
  Users,
  CheckCircle,
  Ban,
  Eye,
} from "lucide-react";


import Sidebar from "./Sidebar";

const VendorsPage = () => {
  const [search, setSearch] = useState("");

  const vendors = [
    {
      id: 1,
      company: "ABC Supplies Pvt Ltd",
      category: "Construction",
      gst: "27ABCDE1234F1Z5",
      contact: "Rahul Sharma",
      status: "Active",
    },
    {
      id: 2,
      company: "Tech Core Ltd",
      category: "IT",
      gst: "27ABCDE5678G1Z5",
      contact: "Amit Verma",
      status: "Active",
    },
    {
      id: 3,
      company: "FastLog Transport",
      category: "Logistics",
      gst: "27ABCDE9999H1Z5",
      contact: "Priya Singh",
      status: "Blocked",
    },
  ];

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.company.toLowerCase().includes(search.toLowerCase()) ||
      vendor.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <div className="flex min-h-screen bg-slate-100">
   <div className="fixed left-0 top-0 min-h-screen">
  <Sidebar />
</div>
    
    <div className="ml-64 flex-1 p-8"> 
    
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Vendors
        </h1>

        <p className="text-slate-500 mt-2">
          Manage supplier registrations and profiles.
        </p>
      </div>

      {/* Stats */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <Building2 className="text-emerald-600 mb-3" size={28} />
          <h3 className="text-3xl font-bold">438</h3>
          <p className="text-slate-500 text-sm">Total Vendors</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <CheckCircle className="text-emerald-600 mb-3" size={28} />
          <h3 className="text-3xl font-bold">420</h3>
          <p className="text-slate-500 text-sm">Active Vendors</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <Ban className="text-red-500 mb-3" size={28} />
          <h3 className="text-3xl font-bold">18</h3>
          <p className="text-slate-500 text-sm">Blocked Vendors</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <Users className="text-blue-500 mb-3" size={28} />
          <h3 className="text-3xl font-bold">24</h3>
          <p className="text-slate-500 text-sm">Pending Approval</p>
        </div>

      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-6">

          <div className="relative w-full lg:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search vendor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition">
            + Add Vendor
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 mb-6 flex-wrap">

          <button className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            All (438)
          </button>

          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm">
            Active (420)
          </button>

          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm">
            Pending (24)
          </button>

          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm">
            Blocked (18)
          </button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="py-4">Company</th>
                <th>Category</th>
                <th>GST Number</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-4 font-semibold text-slate-800">
                    {vendor.company}
                  </td>

                  <td>{vendor.category}</td>

                  <td>{vendor.gst}</td>

                  <td>{vendor.contact}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vendor.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {vendor.status}
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

    </>
  );
};


export default VendorsPage;