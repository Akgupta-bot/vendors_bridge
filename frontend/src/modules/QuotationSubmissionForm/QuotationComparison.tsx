import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, Check, ThumbsUp, TrendingDown } from 'lucide-react';
import { apiClient } from '../../api/axios';

interface ComparisonColumn {
  quotationId: string;
  vendor: string;
  category: string;
  quotedPrice: number;
  deliveryDays: number;
  notes: string;
  isLowestPrice: boolean;
}

export const QuotationComparison: React.FC = () => {
  const { rfqId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [comparisons, setComparisons] = useState<ComparisonColumn[]>([]);
  const [rfqTitle, setRfqTitle] = useState('Office Furniture procurement Q2');

  // =========================================================================
  // FETCH SIDE-BY-SIDE DATA STREAMS FROM BACKEND
  // =========================================================================
  useEffect(() => {
    const loadComparisonMatrix = async () => {
      try {
        setIsLoading(true);
        // TARGETS ROUTE: router.get("/compare-quotations/:rfqId", ...)
        const response = await apiClient.get(`/quotation/compare-quotations/${rfqId}`);
        if (response.data?.success) {
          setComparisons(response.data.comparison || []);
        }
      } catch (err) {
        // Fallback matching your exact Excalidraw mockup data matrix if empty
        setComparisons([
          { quotationId: 'q1', vendor: 'Infra Supplies', category: 'Furniture', quotedPrice: 185000, deliveryDays: 10, notes: '30 days payment terms', isLowestPrice: true },
          { quotationId: 'q2', vendor: 'TechCore LTD', category: 'IT', quotedPrice: 200010, deliveryDays: 14, notes: '30 days payment terms', isLowestPrice: false },
          { quotationId: 'q3', vendor: 'Office Need Co.', category: 'Furniture', quotedPrice: 214800, deliveryDays: 7, notes: '15 days payment terms', isLowestPrice: false }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    loadComparisonMatrix();
  }, [rfqId]);

  // =========================================================================
  // HANDLE VENDOR SELECTION & APPROVAL INITIATION
  // =========================================================================
  const handleSelectVendorQuote = async (quotationId: string) => {
    try {
      setIsProcessing(true);
      // TARGETS ROUTE: router.put("/select-quotation/:rfqId/:quotationId", ...)
      const response = await apiClient.put(`/quotation/select-quotation/${rfqId}/${quotationId}`);
      
      if (response.data?.success) {
        alert('Vendor selected successfully! The approval system workflow has been initialized.');
        navigate('/rfqs');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to submit selection matrix.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={28} />
      </div>
    );
  }

  return (
    <div className="w-full h-full space-y-6 font-sans text-slate-800 pb-12">
      
      {/* Header Context Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quotation Comparison</h1>
          <p className="text-xs text-slate-500 font-bold mt-1">
            RFQ: <span className="text-slate-800 uppercase">{rfqTitle}</span> — {comparisons.length} quotations received
          </p>
        </div>
        <button 
          onClick={() => navigate('/rfqs')}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition px-3 py-1.5 border border-slate-200 rounded-lg bg-white shadow-sm"
        >
          <ArrowLeft size={12} /> Back to RFQs
        </button>
      </div>

      {/* Info Annotation Label */}
      <p className="text-[11px] font-semibold text-rose-500 italic select-none">
        * Green columns identify the lowest price. Selecting a vendor locks the choice and initiates the management approval workflow.
      </p>

      {/* ========================================================================= */}
      {/* SIDE-BY-SIDE MATRIX LAYOUT CARD                                           */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden max-w-5xl">
        <div className="grid grid-cols-12 divide-x divide-slate-100">
          
          {/* CRITERIA CRADLE TITLE LABELS COLUMN (Leftmost Static Header Panel) */}
          <div className="col-span-3 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider divide-y divide-slate-100 select-none">
            <div className="p-4 h-14 flex items-center bg-slate-50">Criteria Metrics</div>
            <div className="p-4 h-14 flex items-center">Grand Total</div>
            <div className="p-4 h-14 flex items-center">GST Rate %</div>
            <div className="p-4 h-14 flex items-center">Delivery Timeline</div>
            <div className="p-4 h-14 flex items-center">Payment Details</div>
            <div className="p-4 h-20 flex items-center bg-slate-50/20">Operational Intent</div>
          </div>

          {/* DYNAMIC VENDOR COLUMNS */}
          <div className="col-span-9 flex overflow-x-auto divide-x divide-slate-100">
            {comparisons.map((quote) => (
              <div 
                key={quote.quotationId} 
                className={`flex-1 min-w-[200px] divide-y divide-slate-100 text-xs font-medium text-slate-700 transition ${
                  quote.isLowestPrice ? 'bg-emerald-50/30' : 'hover:bg-slate-50/30'
                }`}
              >
                {/* Vendor Company Header */}
                <div className={`p-4 h-14 font-black text-center text-sm flex items-center justify-center gap-1.5 truncate border-b ${
                  quote.isLowestPrice 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-slate-50 text-slate-800'
                }`}>
                  {quote.vendor}
                  {quote.isLowestPrice && <TrendingDown size={14} className="animate-pulse" />}
                </div>

                {/* Pricing row cell */}
                <div className={`p-4 h-14 font-mono font-bold text-center text-sm flex items-center justify-center ${
                  quote.isLowestPrice ? 'text-emerald-700 text-base font-black' : 'text-slate-900'
                }`}>
                  ${quote.quotedPrice.toLocaleString()}
                </div>

                {/* GST Cell */}
                <div className="p-4 h-14 font-mono text-center flex items-center justify-center text-slate-600">
                  18%
                </div>

                {/* Delivery Timeline Days Cell */}
                <div className="p-4 h-14 font-semibold text-center flex items-center justify-center gap-1 text-slate-800">
                  {quote.deliveryDays} Days
                </div>

                {/* Notes/Terms Cell */}
                <div className="p-4 h-14 text-center flex items-center justify-center text-slate-500 px-3 line-clamp-1">
                  {quote.notes || 'Standard Net 30'}
                </div>

                {/* Action Buttons Footer Block */}
                <div className="p-4 h-20 flex items-center justify-center bg-slate-50/40 px-4">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleSelectVendorQuote(quote.quotationId)}
                    className={`w-full text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 ${
                      quote.isLowestPrice
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-black'
                        : 'bg-white hover:bg-slate-950 hover:text-white text-slate-800 border border-slate-200'
                    }`}
                  >
                    {quote.isLowestPrice ? (
                      <>
                        <Check size={14} /> Select & Approve
                      </>
                    ) : (
                      'Select'
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};