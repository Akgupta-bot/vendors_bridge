import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Loader2, CheckCircle2, Upload, Paperclip } from 'lucide-react';
import { apiClient } from '../../api/axios';

interface VendorSelectionPool {
  _id: string;
  companyName: string;
  category: string;
  email: string;
}

export const RFQManagement: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [vendorPool, setVendorPool] = useState<VendorSelectionPool[]>([]);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Core RFQ Payload Form Mapping Matrix
  const [rfqForm, setRfqForm] = useState({
    title: '',
    category: 'Furniture',
    deadline: '',
    description: '',
  });

  // Structural arrays for dynamic line elements and target assignments
  const [lineItems, setLineItems] = useState([{ itemName: '', quantity: 1, unit: 'NOS' }]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  // =========================================================================
  // CORE API INTEGRATION PIPELINES
  // =========================================================================
  useEffect(() => {
    const loadVendorOptions = async () => {
      try {
        const response = await apiClient.get('/vendor/get-all-vender');
        if (response.data?.success) {
          setVendorPool(response.data.vendors || []);
        }
      } catch (err) {
        // Fallback testing placeholders matching your Excalidraw mockup if DB is empty
        setVendorPool([
          { _id: 'v1', companyName: 'Infra Supplies Pvt Ltd', category: 'Constructions', email: 'infra@supply.com' },
          { _id: 'v2', companyName: 'Techcore LTD', category: 'IT', email: 'core@tech.com' },
          { _id: 'v3', companyName: 'FastLog Transport', category: 'Logistics', email: 'fast@log.com' }
        ]);
      }
    };
    loadVendorOptions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setRfqForm({ ...rfqForm, [e.target.name]: e.target.value });
  };

  // Line Item Grid Modification Functions
  const handleLineItemChange = (index: number, field: string, value: string | number) => {
    const updatedLines = [...lineItems];
    updatedLines[index] = { ...updatedLines[index], [field]: value };
    setLineItems(updatedLines);
  };

  const addLineItemRow = () => {
    setLineItems([...lineItems, { itemName: '', quantity: 1, unit: 'NOS' }]);
  };

  const removeLineItemRow = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const toggleVendorSelection = (vendorId: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) ? prev.filter(id => id !== vendorId) : [...prev, vendorId]
    );
  };

  // Attachment Actions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const submitRfqWorkflow = async (targetStatus: 'DRAFT' | 'SENT_TO_VENDORS') => {
    if (!rfqForm.title || !rfqForm.deadline) {
      alert('Please fill out the title and deadline parameters.');
      return;
    }

    try {
      setIsLoading(true);
      setServerMessage(null);

      const payload = {
        title: rfqForm.title,
        category: rfqForm.category,
        deadline: rfqForm.deadline,
        description: rfqForm.description,
        lineItems: lineItems,
        assignedVendors: selectedVendors,
        status: targetStatus
      };

      // FIXED: Endpoint targets backend route map accurately ('/rfq/create')
      const response = await apiClient.post('/rfq/create', payload);

      if (response.data?.success) {
        setServerMessage(response.data.message);
        // Clear workflow parameters on clean save sequence
        setRfqForm({ title: '', category: 'Furniture', deadline: '', description: '' });
        setLineItems([{ itemName: '', quantity: 1, unit: 'NOS' }]);
        setSelectedVendors([]);
        setUploadedFiles([]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'RFQ creation serialization rejected.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full space-y-6 font-sans pb-12">
      
      {/* Page Title Context Banner */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create RFQ's</h1>
        <p className="text-xs text-slate-400 font-medium mt-1">new request for quotation</p>
      </div>

      {/* 1. STRUCTURAL TIMELINE STEP INDICATOR BAR */}
      <div className="flex items-center gap-4 max-w-xl pb-2 select-none">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div className="w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition bg-slate-950 text-emerald-400 border border-slate-950 shadow">
              {step}
            </div>
            {step < 3 && <div className="flex-1 h-[2px] bg-slate-900" />}
          </React.Fragment>
        ))}
      </div>

      {serverMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-xl flex items-center gap-2 max-w-5xl shadow-sm">
          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
          <span className="font-bold">{serverMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DUAL-COLUMN LAYOUT PANEL BLOCK                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl items-start">
        
        {/* LEFT COMPARTMENT: Core Meta Metadata Parameters Fields */}
        <div className="lg:col-span-2 space-y-4 bg-white p-6 border border-slate-200/60 rounded-2xl shadow-sm">
          <div>
            <label className="text-[11px] font-bold text-slate-500 tracking-wide block mb-1.5 uppercase">RFQ's title*</label>
            <input 
              type="text" name="title" required placeholder="Office Furniture procurement Q2"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
              value={rfqForm.title} onChange={handleInputChange} disabled={isLoading}
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 tracking-wide block mb-1.5 uppercase">Category</label>
            <select 
              name="category"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition appearance-none"
              value={rfqForm.category} onChange={handleInputChange} disabled={isLoading}
            >
              <option value="Furniture">Furniture</option>
              <option value="Constructions">Constructions</option>
              <option value="IT">IT Infrastructure</option>
              <option value="Logistics">Logistics</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 tracking-wide block mb-1.5 uppercase">Deadline*</label>
            <input 
              type="date" name="deadline" required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
              value={rfqForm.deadline} onChange={handleInputChange} disabled={isLoading}
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 tracking-wide block mb-1.5 uppercase">Description</label>
            <textarea 
              name="description" rows={4} placeholder="Ergonomic chairs and standing desks for 3rd floor"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition resize-none"
              value={rfqForm.description} onChange={handleInputChange} disabled={isLoading}
            />
          </div>
        </div>

        {/* RIGHT COMPARTMENT: Dynamic Line Items Matrix & Assignment Pool */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Dynamic Grid Grid Array Fields Container */}
          <div className="bg-white p-6 border border-slate-200/60 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Line Items Table</h3>
            
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {lineItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <input 
                    type="text" placeholder="Item/Asset description" required
                    className="col-span-6 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                    value={item.itemName} onChange={(e) => handleLineItemChange(idx, 'itemName', e.target.value)} disabled={isLoading}
                  />
                  <input 
                    type="number" min={1} placeholder="Qty" required
                    className="col-span-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition font-mono"
                    value={item.quantity} onChange={(e) => handleLineItemChange(idx, 'quantity', parseInt(e.target.value) || 1)} disabled={isLoading}
                  />
                  <select 
                    className="col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition appearance-none text-center"
                    value={item.unit} onChange={(e) => handleLineItemChange(idx, 'unit', e.target.value)} disabled={isLoading}
                  >
                    <option value="NOS">NOS</option>
                    <option value="KG">KG</option>
                    <option value="PCS">PCS</option>
                  </select>
                  <button 
                    type="button" onClick={() => removeLineItemRow(idx)} disabled={lineItems.length === 1 || isLoading}
                    className="col-span-1 text-slate-400 hover:text-rose-500 disabled:opacity-30 transition flex justify-center"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <button 
              type="button" onClick={addLineItemRow} disabled={isLoading}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition flex items-center gap-1.5 pt-1"
            >
              <Plus size={14} /> + add line item
            </button>
          </div>

          {/* Searchable Assigned Suppliers Checker Array Container */}
          <div className="bg-white p-6 border border-slate-200/60 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Assign Vendors</h3>
            
            <div className="grid grid-cols-1 gap-2 max-h-36 overflow-y-auto pr-1">
              {vendorPool.map((vendor) => (
                <label 
                  key={vendor._id} 
                  className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer select-none text-xs ${
                    selectedVendors.includes(vendor._id)
                      ? 'bg-emerald-50/40 border-emerald-300 text-slate-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{vendor.companyName}</span>
                    <span className="text-[10px] text-slate-400 font-normal font-mono">{vendor.email}</span>
                  </div>
                  <input 
                    type="checkbox" className="accent-slate-950 h-3.5 w-3.5 rounded"
                    checked={selectedVendors.includes(vendor._id)}
                    onChange={() => toggleVendorSelection(vendor._id)}
                    disabled={isLoading}
                  />
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ATTACHMENT BOX & PIPELINE MUTATION SUBMIT ACTIONS                      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl items-center pt-2">
        
        {/* Core Dispatch Execution Buttons */}
        <div className="lg:col-span-2 space-y-2 select-none">
          <button 
            type="button" onClick={() => submitRfqWorkflow('SENT_TO_VENDORS')} disabled={isLoading}
            className="w-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:bg-slate-700"
          >
            {isLoading ? <Loader2 className="animate-spin" size={14} /> : 'Save & Send to Vendors'}
          </button>
          <button 
            type="button" onClick={() => submitRfqWorkflow('DRAFT')} disabled={isLoading}
            className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold py-3 rounded-xl shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            Save as Draft
          </button>
        </div>

        {/* Drag & Drop File Upload Field Container */}
        <div className="lg:col-span-3">
          <div 
            onClick={() => !isLoading && fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 hover:border-emerald-400 bg-white p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition shadow-sm group"
          >
            <Upload size={20} className="text-slate-400 group-hover:text-emerald-500 transition mb-2" />
            <p className="text-xs font-bold text-slate-700">Drag & drop files or click to upload</p>
            <p className="text-[10px] text-slate-400 mt-0.5">PDF, DOCX, XLSX assets file attachments up to 10MB</p>
            <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} disabled={isLoading} />

            {/* Render selected attachment file markers */}
            {uploadedFiles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 justify-center w-full max-h-16 overflow-y-auto">
                {uploadedFiles.map((file, i) => (
                  <span key={i} className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 font-mono text-[9px] font-bold px-2 py-0.5 rounded-md border border-slate-200 max-w-[120px] truncate">
                    <Paperclip size={8} /> {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};