import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  FileText,
  UserPlus,
  Filter,
} from "lucide-react";

import Sidebar from "./Sidebar";

const ActivityLogsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "RFQ",
    "Approvals",
    "Invoices",
    "Vendors",
  ];

  const activities = [
    {
      id: 1,
      type: "quotation",
      title:
        "Quotation selected - Infra Supplies Pvt Ltd selected for Office Furniture Q2",
      date: "23 May 2025, 9:15 PM",
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      category: "RFQ",
    },
    {
      id: 2,
      type: "approval",
      title:
        "Approval pending - PO-2024 awaiting L2 approval by Priya Shah",
      date: "22 May 2025, 09:15 AM",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-100",
      category: "Approvals",
    },
    {
      id: 3,
      type: "rfq",
      title:
        "RFQ published - Office Furniture Q2 sent to 3 vendors",
      date: "19 May 2025",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100",
      category: "RFQ",
    },
    {
      id: 4,
      type: "vendor",
      title:
        "Vendor added - FastLog Transport registered and pending verification",
      date: "18 May 2025, 3:20 PM",
      icon: UserPlus,
      color: "text-purple-600",
      bg: "bg-purple-100",
      category: "Vendors",
    },
  ];

  const filteredActivities =
    activeFilter === "All"
      ? activities
      : activities.filter(
          (item) => item.category === activeFilter
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
            Activity & Logs
          </h1>

          <p className="text-slate-500 mt-2">
            Procurement audit trail
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          {/* Filter Section */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex items-center gap-2 text-slate-500 mr-2">
              <Filter size={18} />
            </div>

            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(filter)
                }
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Activity Timeline */}
          <div className="space-y-1">
            {filteredActivities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.id}
                  className="flex gap-4 py-6 border-b border-slate-200 last:border-none"
                >
                  {/* Icon */}
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center ${activity.bg}`}
                  >
                    <Icon
                      size={22}
                      className={activity.color}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-slate-800 font-medium">
                      {activity.title}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      {activity.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Audit Information */}
          <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-semibold text-slate-900 mb-2">
              Audit Log Policy
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Audit logs are immutable. All procurement
              activities including vendor registration,
              RFQ creation, quotation submissions,
              approvals, purchase orders and invoice
              actions are permanently recorded for
              compliance and traceability purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsPage;