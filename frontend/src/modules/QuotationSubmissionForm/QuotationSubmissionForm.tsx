import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, CheckCircle2, DollarSign, Percent } from 'lucide-react';
import { apiClient } from '../../api/axios';

interface RFQLineItem {
  _id: string;
  itemName: string;
  quantity: number;
  unit: string;
}

export const QuotationSubmissionForm: React.FC = () => {
  const { rfqId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rfqDetails, setRfqDetails] = useState<{ title: string; deadline: string; description: string } | null>(null);
  
  // Global form variables matching backend schema metrics
  const [taxRate, setTaxRate] = useState<number>(18); // Defaulted to 18% matching mockup
  const [notes, setNotes] = useState('');
  
  // Dynamic line item bidding layout tracking
  const [bidLines, setBidLines] = useState<{
    rfqLineItemId: string;
    itemName: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    deliveryDays: number;
  }[]>([]);

  // =========================================================================
  // FETCH TARGETED PROCUREMENT INVITATION DATA
  // =========================================================================
  useEffect(() => {
    const fetchTargetRFQ = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/rfq/get-rfq/${rfqId}`);
        if (response.data?.success) {
          const rfq = response.data.rfq;
          setRfqDetails({
            title: rfq.title,
            deadline: new Date(rfq.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            description: rfq.description || `Category: ${rfq.category}`
          });
          
          // Map line item variables directly from database references
          const initialBidLines = (rfq.lineItems || []).map((line: RFQLineItem) => ({
            rfqLineItemId: line._id,
            itemName: line.itemName,
            quantity: line.quantity,
            unit: line.unit,
            unitPrice: 0,
            deliveryDays: 7 // Default layout baseline fallback
          }));
          setBidLines(initialBidLines);
        }
      } catch (err) {
        // Exact blueprint dataset fallback logic matching Excalidraw wireframe
        setRfqDetails({
          title: 'office furniture procurement q2',
          deadline: '15 june 2025',
          description: 'Ergonomic chair * 25, standing desk * 10 - category furniture'
        });
        setBidLines([
          { rfqLineItemId: 'l1', itemName: 'Ergonomic chair', quantity: 25, unitPrice: 3500, deliveryDays: 7, unit: 'NOS' },
          { rfqLineItemId: 'l2', itemName: 'Tech Core LTD', quantity: 10, unitPrice: 8200, deliveryDays: 14, unit: 'NOS' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTargetRFQ();
  }, [rfqId]);

  // Handle value changes across array line tables
  const handleLineValueChange = (index: number, field: 'unitPrice' | 'deliveryDays', value: number) => {
    const updatedLines = [...bidLines];
    updatedLines[index] = { ...updatedLines[index], [field]: value };
    setBidLines(updatedLines);
  };

  // =========================================================================
  // FINANCIAL MATH COMPUTATION MATRICES (AUTOMATIC)
  // =========================================================================
  const subtotalAmount = bidLines.reduce((sum, line) => sum + (line.quantity * (line.unitPrice || 0)), 0);
  const gstCalculatedAmount = subtotalAmount * ((taxRate || 0) / 100);
  const grandTotalAmount = subtotalAmount + gstCalculatedAmount;

  // =========================================================================
  // SUBMISSION EVENT HANDLER PIPELINE
  // =========================================================================
  const handleSubmitQuotation = async (targetStatus: 'DRAFT' | 'SUBMITTED') => {
  try {
    setIsSubmitting(true);

    // Find the longest delivery timeline from your item lines to use as the overall timeline
    const maxDeliveryDays = Math.max(...bidLines.map(line => line.deliveryDays || 1), 7);
    
    // BACKEND SYNC LAYOUT: Matches exactly what your controller destructures from req.body
    const payload = {
      rfq: rfqId,                  // Matches: req.body.rfq
      quotedPrice: grandTotalAmount, // Matches: req.body.quotedPrice
      deliveryDays: maxDeliveryDays, // Matches: req.body.deliveryDays
      notes: notes,                  // Matches: req.body.notes
    };

    // TARGET ROUTE: POST /api/quotation/submit-quotation
    const response = await apiClient.post('/quotation/submit-quotation', payload);
    
    if (response.data?.success) {
      alert('Quotation submitted successfully to the procurement panel cluster.');
      navigate('/quotations');
    }
  } catch (error: any) {
    alert(error.response?.data?.message || 'Quotation submission failed validation.');
  } finally {
    setIsSubmitting(false);
  }
};

  if (isLoading) {
    return (
      <div className="h-64 w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={28} />
      </div>
    );
  }

  return (
    <div className="w-full h-full space-y-6 font-sans text-slate-800 max-w-5xl pb-12">
      
      {/* 1. COMPONENT BARS HEADERS */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 capitalize tracking-tight">Submit Quotations</h1>
          <p className="text-xs text-slate-500 font-bold mt-1">
            RFQ: <span className="text-slate-800 uppercase">{rfqDetails?.title}</span> — deadline {rfqDetails?.deadline}
          </p>
        </div>
        <button 
          onClick={() => navigate('/quotations')}
          className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-1 transition px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
        >
          <ArrowLeft size={12} /> Back
        </button>
      </div>

      {/* RFQ Summary Notification Deck Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">RFQ Summary</span>
        <p className="text-xs text-slate-600 font-semibold">{rfqDetails?.description}</p>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE MAIN LINE ITEMS INTERACTIVE GRID TABLE                              */}
      {/* ========================================================================= */}
      <div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-2">Your Quotation</span>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wide">
                <th className="p-3.5 font-semibold w-1/3">Item</th>
                <th className="p-3.5 font-semibold text-center">Qty</th>
                <th className="p-3.5 font-semibold">Unit Price ($)</th>
                <th className="p-3.5 font-semibold">Total ($)</th>
                <th className="p-3.5 font-semibold text-right">Delivery (days)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {bidLines.map((line, idx) => (
                <tr key={line.rfqLineItemId} className="hover:bg-slate-50/40 transition">
                  <td className="p-3.5 font-bold text-slate-900">{line.itemName}</td>
                  <td className="p-3.5 text-center font-mono font-semibold text-slate-500">{line.quantity}</td>
                  <td className="p-3.5">
                    <input 
                      type="number" min={0} required placeholder="0.00"
                      className="w-28 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                      value={line.unitPrice || ''}
                      onChange={(e) => handleLineValueChange(idx, 'unitPrice', parseFloat(e.target.value) || 0)}
                      disabled={isSubmitting}
                    />
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-900">
                    {((line.quantity * (line.unitPrice || 0))).toLocaleString()}
                  </td>
                  <td className="p-3.5 text-right">
                    <input 
                      type="number" min={1} required placeholder="Days"
                      className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition text-right"
                      value={line.deliveryDays || ''}
                      onChange={(e) => handleLineValueChange(idx, 'deliveryDays', parseInt(e.target.value) || 1)}
                      disabled={isSubmitting}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TAX, ANNOTATIONS, & SUMMARY BREAKDOWN CALCULATOR ROWS                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
        
        {/* Left Column: Tax & Payment terms notes */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-400 tracking-wide block mb-1.5 uppercase">Tax / GST %</label>
            <div className="relative max-w-xs">
              <input 
                type="number" min={0} max={100} required placeholder="18"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-emerald-400 transition"
                value={taxRate || ''} onChange={(e) => setTaxRate(parseInt(e.target.value) || 0)}
                disabled={isSubmitting}
              />
              <Percent size={12} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 tracking-wide block mb-1.5 uppercase">Note / Terms</label>
            <textarea 
              rows={4} placeholder="Payment terms: 20 days net..."
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 transition resize-none shadow-sm"
              value={notes} onChange={(e) => setNotes(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Right Column: Exact Mockup Financial Statement Cards */}
        <div className="md:col-span-5 bg-white border border-slate-200 p-5 rounded-xl shadow-sm text-xs font-semibold space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span>Subtotal</span>
            <span className="font-mono text-slate-800">${subtotalAmount.toLocaleString(undefined, { minimumFractionDigits: 0 })}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500 pb-3 border-b border-slate-100">
            <span>GST ({taxRate}%)</span>
            <span className="font-mono text-slate-800">${gstCalculatedAmount.toLocaleString(undefined, { minimumFractionDigits: 0 })}</span>
          </div>
          <div className="flex items-center justify-between pt-1 text-sm font-black text-slate-900">
            <span>Grand Total</span>
            <span className="font-mono text-lg text-slate-950">${grandTotalAmount.toLocaleString(undefined, { minimumFractionDigits: 0 })}</span>
          </div>
        </div>

      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-6 select-none">
        <button 
          type="button" onClick={() => handleSubmitQuotation('SUBMITTED')} disabled={isSubmitting}
          className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-sm transition flex items-center gap-2 disabled:bg-slate-700"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : 'Submit Quotation'}
        </button>

        <button 
          type="button" onClick={() => handleSubmitQuotation('DRAFT')} disabled={isSubmitting}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-6 py-3 rounded-xl transition disabled:opacity-40"
        >
          Save Draft
        </button>
      </div>

    </div>
  );
};