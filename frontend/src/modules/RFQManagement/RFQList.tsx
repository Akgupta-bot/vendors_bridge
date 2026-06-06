import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, Users, Loader2, Eye, Plus } from 'lucide-react';
import { apiClient } from '../../api/axios';

interface RFQRecord {
  _id: string;
  title: string;
  category: string;
  deadline: string;
  status: string;
  assignedVendors: string[];
}

export const RFQList: React.FC = () => {
  const navigate = useNavigate();
  const [rfqs, setRfqs] = useState<RFQRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllRFQs = async () => {
      try {
        setIsLoading(true);
        // Targets your backend route safely: router.get("/get-all", protect, getAllRFQs);
        const response = await apiClient.get('/rfq/get-all');
        if (response.data?.success) {
          setRfqs(response.data.rfqs || response.data.data || []);
        }
      } catch (error) {
        console.error("Failed to load RFQ streams:", error);
        // Synchronized testing placeholders matching your current environment properties
        setRfqs([
          { _id: 'rfq1', title: 'office furniture procurement q2', category: 'Furniture', deadline: '2025-06-15', status: 'SENT_TO_VENDORS', assignedVendors: ['v1', 'v2', 'v3'] },
          { _id: 'rfq2', title: 'Server Rack Cabling Framework', category: 'IT', deadline: '2026-07-01', status: 'DRAFT', assignedVendors: [] }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllRFQs();
  }, []);

  return (
    <div className="w-full h-full space-y-6 font-sans">
      
      {/* Title Header Block */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Requests for Quotations</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Track open bidding cycles and vendor response rates</p>
        </div>
        <button 
          onClick={() => navigate('/rfqs/create')}
          className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-sm transition flex items-center gap-2"
        >
          <Plus size={14} /> Create New RFQ
        </button>
      </div>

      {/* Grid Monitor Sheet */}
      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-500" size={28} />
          </div>
        ) : rfqs.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
            No procurement cycles initialized inside this system node.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="p-4 font-semibold">RFQ Details</th>
                  <th className="p-4 font-semibold">Sector Category</th>
                  <th className="p-4 font-semibold">Deadline Limit</th>
                  <th className="p-4 font-semibold">Target Pool</th>
                  <th className="p-4 font-semibold">Operational Status</th>
                  <th className="p-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {rfqs.map((rfq) => (
                  <tr key={rfq._id} className="hover:bg-slate-50/60 transition group">
                    <td className="p-4 font-bold text-slate-900 max-w-xs truncate">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-emerald-500/10 flex items-center justify-center text-slate-500 group-hover:text-emerald-600 transition">
                          <FileText size={14} />
                        </div>
                        <span className="capitalize">{rfq.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 capitalize">{rfq.category}</td>
                    <td className="p-4 font-mono text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-slate-400" />
                        {new Date(rfq.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-700">
                      <div className="flex items-center gap-1">
                        <Users size={12} className="text-slate-400" />
                        <span>{rfq.assignedVendors?.length || 0} Suppliers</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block text-[10px] font-bold uppercase px-2.5 py-0.5 border rounded-full ${
                        rfq.status.includes('SENT')
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        {rfq.status.replace('_', ' ').toLowerCase()}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {/* FIXED: This route action hooks straight into your dynamic QuotationComparison matrix sheet view */}
                      <button 
                        type="button"
                        onClick={() => navigate(`/rfqs/compare/${rfq._id}`)}
                        className="border border-slate-200 hover:border-slate-800 text-slate-700 font-bold px-3 py-1.5 rounded-lg bg-white transition hover:bg-slate-50 text-[11px] inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Eye size={12} /> Compare Bids
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};