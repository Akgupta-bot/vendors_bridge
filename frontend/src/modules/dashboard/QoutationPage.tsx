import  { useState } from "react";
import Sidebar from "./Sidebar";
import {
  FileText,
  Save,
  Send,
  Calculator,
} from "lucide-react";

const QuotationsPage = () => {
  const [gst, setGst] = useState(18);

  const quotationItems = [
    {
      id: 1,
      item: "Ergonomic Chair",
      qty: 25,
      unitPrice: 3500,
      delivery: 7,
    },
    {
      id: 2,
      item: "Standing Desk",
      qty: 10,
      unitPrice: 8200,
      delivery: 14,
    },
  ];

  const subtotal = quotationItems.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );

  const gstAmount = (subtotal * gst) / 100;
  const grandTotal = subtotal + gstAmount;

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
            Submit Quotation
          </h1>

          <p className="text-slate-500 mt-2">
            Submit your quotation against the RFQ.
          </p>
        </div>

        {/* RFQ Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 mb-6">

          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-emerald-600" />
            <h2 className="text-xl font-semibold">
              RFQ Details
            </h2>
          </div>

          <h3 className="text-lg font-semibold text-slate-800">
            Office Furniture Procurement Q2
          </h3>

          <p className="text-slate-500 mt-1">
            Deadline: 15 June 2025
          </p>

          <div className="mt-5 bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <h4 className="font-medium mb-2">
              RFQ Summary
            </h4>

            <p className="text-slate-600 text-sm">
              Ergonomic Chair × 25,
              Standing Desk × 10
            </p>

            <p className="text-slate-600 text-sm">
              Category: Furniture
            </p>
          </div>
        </div>

        {/* Quotation Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

          <h2 className="text-xl font-semibold mb-6">
            Your Quotation
          </h2>

          {/* Items Table */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4">Item</th>
                  <th className="text-left">Qty</th>
                  <th className="text-left">Unit Price</th>
                  <th className="text-left">Total</th>
                  <th className="text-left">Delivery (Days)</th>
                </tr>
              </thead>

              <tbody>
                {quotationItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100"
                  >
                    <td className="py-4 font-medium">
                      {item.item}
                    </td>

                    <td>{item.qty}</td>

                    <td>₹ {item.unitPrice.toLocaleString()}</td>

                    <td>
                      ₹{" "}
                      {(item.qty * item.unitPrice).toLocaleString()}
                    </td>

                    <td>{item.delivery}</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

          {/* GST + Notes */}
          <div className="grid lg:grid-cols-2 gap-8 mt-8">

            <div>

              <label className="block font-medium mb-2">
                GST %
              </label>

              <input
                type="number"
                value={gst}
                onChange={(e) =>
                  setGst(Number(e.target.value))
                }
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
              />

              <label className="block font-medium mt-6 mb-2">
                Notes / Terms
              </label>

              <textarea
                rows={5}
                placeholder="Payment Terms: 20 days net..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Calculation Card */}
            <div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-5">
                  <Calculator
                    className="text-emerald-600"
                    size={20}
                  />

                  <h3 className="font-semibold">
                    Calculation Summary
                  </h3>
                </div>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      ₹ {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST ({gst}%)</span>
                    <span>
                      ₹ {gstAmount.toLocaleString()}
                    </span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-lg font-bold text-emerald-700">
                    <span>Grand Total</span>
                    <span>
                      ₹ {grandTotal.toLocaleString()}
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">

            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition">
              <Send size={18} />
              Submit Quotation
            </button>

            <button className="flex items-center gap-2 border border-slate-300 px-6 py-3 rounded-full font-semibold hover:bg-slate-50">
              <Save size={18} />
              Save Draft
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default QuotationsPage;