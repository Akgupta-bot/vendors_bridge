import React from "react";
import Sidebar from "./Sidebar";

const QuotationComparisonPage = () => {
  const quotations = [
    {
      vendor: "Infra Supplies",
      total: "₹1,95,000",
      gst: "18%",
      delivery: "10 Days",
      rating: "4.5/5",
      payment: "30 Days",
      lowest: true,
    },
    {
      vendor: "TechCore Ltd",
      total: "₹2,00,010",
      gst: "18%",
      delivery: "14 Days",
      rating: "4.2/5",
      payment: "30 Days",
      lowest: false,
    },
    {
      vendor: "Office Need Co.",
      total: "₹2,14,800",
      gst: "18%",
      delivery: "7 Days",
      rating: "3.8/5",
      payment: "15 Days",
      lowest: false,
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
            Quotation Comparison
          </h1>

          <p className="text-slate-500 mt-2">
            RFQ: Office Furniture Procurement Q2 • 3 Quotations Received
          </p>
        </div>

        {/* Comparison Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr>
                <th className="border border-slate-200 p-4 text-left bg-slate-50">
                  Criteria
                </th>

                {quotations.map((q, index) => (
                  <th
                    key={index}
                    className={`border border-slate-200 p-4 text-center ${
                      q.lowest
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-50 text-slate-800"
                    }`}
                  >
                    {q.vendor}
                    {q.lowest && (
                      <div className="text-xs mt-1 font-normal">
                        Lowest Quote
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-slate-200 p-4 font-medium">
                  Grand Total
                </td>

                {quotations.map((q, index) => (
                  <td
                    key={index}
                    className={`border border-slate-200 p-4 text-center ${
                      q.lowest ? "bg-emerald-50" : ""
                    }`}
                  >
                    {q.total}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border border-slate-200 p-4 font-medium">
                  GST %
                </td>

                {quotations.map((q, index) => (
                  <td
                    key={index}
                    className={`border border-slate-200 p-4 text-center ${
                      q.lowest ? "bg-emerald-50" : ""
                    }`}
                  >
                    {q.gst}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border border-slate-200 p-4 font-medium">
                  Delivery (Days)
                </td>

                {quotations.map((q, index) => (
                  <td
                    key={index}
                    className={`border border-slate-200 p-4 text-center ${
                      q.lowest ? "bg-emerald-50" : ""
                    }`}
                  >
                    {q.delivery}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border border-slate-200 p-4 font-medium">
                  Vendor Rating
                </td>

                {quotations.map((q, index) => (
                  <td
                    key={index}
                    className={`border border-slate-200 p-4 text-center ${
                      q.lowest ? "bg-emerald-50" : ""
                    }`}
                  >
                    {q.rating}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border border-slate-200 p-4 font-medium">
                  Payment Terms
                </td>

                {quotations.map((q, index) => (
                  <td
                    key={index}
                    className={`border border-slate-200 p-4 text-center ${
                      q.lowest ? "bg-emerald-50" : ""
                    }`}
                  >
                    {q.payment}
                  </td>
                ))}
              </tr>

              {/* Buttons */}
              <tr>
                <td className="border border-slate-200 p-4"></td>

                {quotations.map((q, index) => (
                  <td
                    key={index}
                    className={`border border-slate-200 p-4 text-center ${
                      q.lowest ? "bg-emerald-50" : ""
                    }`}
                  >
                    {q.lowest ? (
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-medium transition">
                        Select & Approve
                      </button>
                    ) : (
                      <button className="border border-slate-300 hover:bg-slate-50 px-6 py-2 rounded-full font-medium transition">
                        Select
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* Footer Note */}
          <div className="mt-5 text-sm text-red-500">
            Green highlighted quotation indicates the lowest evaluated price.
            Selecting a vendor will initiate the approval workflow.
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recommendation Summary
          </h2>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <p className="text-slate-700">
              <span className="font-semibold text-emerald-700">
                Infra Supplies
              </span>{" "}
              offers the lowest quotation amount with a strong vendor rating and
              acceptable delivery timeline. This vendor is recommended for
              approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationComparisonPage;