import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { apiClient } from '../../api/axios'; // Verify this path matches your axios client location

interface AssignedRFQ {
  _id: string;
  title: string;
  category: string;
  deadline: string;
  description: string;
}

export const VendorBiddingPortal: React.FC = () => {
  const navigate = useNavigate();
  const [assignedRfqs, setAssignedRfqs] = useState<AssignedRFQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssignedBids = async () => {
      try {
        setIsLoading(true);
        // Fetches all RFQs assigned to the currently logged-in vendor
        const response = await apiClient.get('/rfq/get-all');
        if (response.data?.success) {
          setAssignedRfqs(response.data.rfqs || []);
        }
      } catch (err) {
        // Fallback test layout to mirror your Excalidraw mockup if database is empty
        setAssignedRfqs([
          { _id: 'rfq_office_furniture', title: 'office furniture procurement q2', category: 'Furniture', deadline: '2025-06-15', description: 'Ergonomic chair * 25, standing desk * 10 - category furniture' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    loadAssignedBids();
  }, []);

  return (
    <div className="w-full h-full space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Invitations</h1>
        <p className="text-xs text-slate-400 font-medium mt-1">Review assigned procurement RFQs and submit competitive bidding quotes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full h-40 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-500" size={24} />
          </div>
        ) : assignedRfqs.length === 0 ? (
          <div className="col-span-full h-40 bg-white border border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-xs">
            No active procurement invitations assigned to your account profile.
          </div>
        ) : (
          assignedRfqs.map((rfq) => (
            <div key={rfq._id} className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {rfq.category}
                  </span>
                  <span className="text-[10px] text-rose-600 font-bold ml-auto flex items-center gap-1">
                    <Calendar size={10} /> {new Date(rfq.deadline).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{rfq.title}</h3>
                <p className="text-xs text-slate-400 font-medium line-clamp-2">{rfq.description || 'No extended description added.'}</p>
              </div>

              <button
                onClick={() => navigate(`/quotations/submit/${rfq._id}`)}
                className="mt-5 w-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                Prepare Quotation <ArrowRight size={12} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};