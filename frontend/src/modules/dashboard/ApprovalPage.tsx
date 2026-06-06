import React, { useState } from "react";
import {
  CheckCircle,
  Clock3,
  XCircle,
  FileCheck,
} from "lucide-react";

import Sidebar from "./Sidebar";

const ApprovalPage = () => {
  const [remarks, setRemarks] = useState("");

  const approvalChain = [
    {
      id: 1,
      name: "Rahul Mehta",
      role: "Procurement Head",
      status: "Approved",
      time: "Approved on May 20, 10:32 AM",
    },
    {
      id: 2,
      name: "Priya Shah",
      role: "Finance Manager",
      status: "Pending",
      time: "Assigned on May 21",
    },
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Approval Workflow
          </h1>

          <p className="text-slate-500 mt-2">
            Review quotations and approve procurement requests.
          </p>
        </div>

        {/* RFQ Summary Header */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800">
            RFQ: Office Furniture Q2
          </h2>

          <p className="text-slate-500 mt-1">
            Vendor: Infra Supplies Pvt Ltd • ₹1,85,400
          </p>
        </div>

        {/* Workflow + Summary */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Approval Chain
            </h3>

            {/* Workflow Steps */}
            <div className="flex justify-between items-center mb-8">

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <p className="text-xs mt-2 text-slate-500">Submitted</p>
              </div>

              <div className="flex-1 h-1 bg-emerald-500 mx-3" />

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <p className="text-xs mt-2 text-slate-500">L1 Review</p>
              </div>

              <div className="flex-1 h-1 bg-emerald-500 mx-3" />

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <p className="text-xs mt-2 text-slate-500">L2 Approval</p>
              </div>

              <div className="flex-1 h-1 bg-slate-300 mx-3" />

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-slate-300 text-slate-500 flex items-center justify-center font-bold">
                  4
                </div>
                <p className="text-xs mt-2 text-slate-500">Generate PO</p>
              </div>

            </div>

            {/* Approval List */}
            <div className="space-y-4">

              {approvalChain.map((item) => (
                <div
                  key={item.id}
                  className="border border-slate-200 rounded-2xl p-4 flex items-start gap-4"
                >
                  {item.status === "Approved" ? (
                    <CheckCircle
                      className="text-emerald-600 mt-1"
                      size={24}
                    />
                  ) : (
                    <Clock3
                      className="text-blue-500 mt-1"
                      size={24}
                    />
                  )}

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {item.name}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {item.role}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}

            </div>

            {/* Remarks */}
            <div className="mt-6">
              <label className="block font-medium text-slate-700 mb-2">
                Approval Remarks
              </label>

              <textarea
                rows="4"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add comments or approval notes..."
                className="w-full border border-slate-200 rounded-2xl p-4 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Quotation Summary
            </h3>

            <div className="space-y-5">

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">Vendor</span>
                <span className="font-semibold">
                  Infra Supplies Pvt Ltd
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">Total Amount</span>
                <span className="font-semibold">
                  ₹1,85,400
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">Delivery Time</span>
                <span className="font-semibold">
                  10 Days
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">Vendor Rating</span>
                <span className="font-semibold">
                  4.5 / 5
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">RFQ Status</span>
                <span className="text-yellow-600 font-semibold">
                  Awaiting Approval
                </span>
              </div>

            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-10">

              <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2">
                <FileCheck size={18} />
                Approve
              </button>

              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2">
                <XCircle size={18} />
                Reject
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ApprovalPage;