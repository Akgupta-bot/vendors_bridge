import React from "react";
import {
  Download,
  Printer,
  Mail,
  CheckCircle,
  Clock,
} from "lucide-react";

import Sidebar from "./Sidebar";

const PurchaseOrderInvoicePage = () => {
  const items = [
    {
      id: 1,
      item: "Ergonomic Chair",
      qty: 25,
      price: 3500,
      total: 87500,
    },
    {
      id: 2,
      item: "Tech Core LTD",
      qty: 10,
      price: 8200,
      total: 82000,
    },
  ];

  const subtotal = 169500;
  const cgst = 15255;
  const sgst = 15255;
  const grandTotal = 200010;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 min-h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Purchase Order & Invoice
            </h1>

            <p className="text-slate-500 mt-2">
              PO-2025-0068 • Auto generated after approval
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl hover:bg-slate-50">
              <Download size={18} />
              Download PDF
            </button>

            <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl hover:bg-slate-50">
              <Printer size={18} />
              Print
            </button>

            <button className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl hover:bg-emerald-700">
              <Mail size={18} />
              Email Invoice
            </button>
          </div>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          {/* Company Details */}
          <div className="grid lg:grid-cols-2 gap-8 border-b border-slate-200 pb-8">
            {/* Bill To */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Bill To
              </h3>

              <p className="font-semibold text-slate-800">
                Your Organization Name
              </p>

              <p className="text-slate-600 mt-2">
                123 Business Park
                <br />
                Ahmedabad, Gujarat
                <br />
                GSTIN: 25ABCD1234F1Z5
              </p>
            </div>

            {/* Vendor */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Vendor
              </h3>

              <p className="font-semibold text-slate-800">
                Infra Supplies Pvt Ltd
              </p>

              <p className="text-slate-600 mt-2">
                456 Industrial Estate
                <br />
                Surat, Gujarat
                <br />
                GSTIN: 34XYZD44523
              </p>
            </div>
          </div>

          {/* PO Details */}
          <div className="grid lg:grid-cols-2 gap-8 py-8 border-b border-slate-200">
            <div className="space-y-3">
              <p>
                <span className="font-semibold">PO Number:</span>{" "}
                PO-2025-0068
              </p>

              <p>
                <span className="font-semibold">PO Date:</span>{" "}
                21 May 2025
              </p>
            </div>

            <div className="space-y-3">
              <p>
                <span className="font-semibold">Invoice Date:</span>{" "}
                22 May 2025
              </p>

              <p>
                <span className="font-semibold">Due Date:</span>{" "}
                21 June 2025
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mt-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4">Item</th>
                  <th className="text-center">Qty</th>
                  <th className="text-center">Unit Price</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100"
                  >
                    <td className="py-4 font-medium">
                      {item.item}
                    </td>

                    <td className="text-center">
                      {item.qty}
                    </td>

                    <td className="text-center">
                      ₹{item.price.toLocaleString()}
                    </td>

                    <td className="text-right font-medium">
                      ₹{item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mt-8">
            <div className="w-full lg:w-96">
              <div className="flex justify-between py-3 border-b">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span>CGST (9%)</span>
                <span>₹{cgst.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span>SGST (9%)</span>
                <span>₹{sgst.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-4 text-lg font-bold">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mt-10 flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock
                size={18}
                className="text-amber-500"
              />

              <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
                Pending Payment
              </span>
            </div>

            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-medium">
              <CheckCircle size={18} />
              Mark as Paid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderInvoicePage;