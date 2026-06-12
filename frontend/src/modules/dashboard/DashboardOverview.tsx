import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, ClipboardCheck, DollarSign, AlertCircle, Plus, UserPlus, ArrowUpRight, Loader2 
} from 'lucide-react';
import { apiClient } from '../../api/axios';
import { useAuthStore } from '../../store/authStore';

interface DashboardMetrics {
  activeRfqs: number;
  pendingApprovals: number;
  monthlyPoTotal: string;
  overdueInvoices: number;
}

interface RecentPurchaseOrder {
  _id: string;
  poNumber: string;
  vendor: { companyName: string } | null;
  totalAmount: number;
  status: 'CREATED' | 'SENT' | 'COMPLETED';
}

export const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeRfqs: 12,
    pendingApprovals: 5,
    monthlyPoTotal: '$ 2.3M',
    overdueInvoices: 3
  });
  const [recentOrders, setRecentOrders] = useState<RecentPurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // =========================================================================
  // CORE DISPATCH NETWORK REFRESH STRATEGIES
  // =========================================================================
  useEffect(() => {
    const aggregateDashboardTelemetry = async () => {
      try {
        setIsLoading(true);
        const [poResponse, rfqResponse, invoiceResponse] = await Promise.all([
          apiClient.get('/purchase-order/get-all'),
          apiClient.get('/rfq/get-all').catch(() => ({ data: { count: 12 } })),
          apiClient.get('/invoice/get-all').catch(() => ({ data: { count: 3 } }))
        ]);

        if (poResponse.data?.success) {
          const orders: RecentPurchaseOrder[] = poResponse.data.orders;
          setRecentOrders(orders.slice(0, 3)); 

          const computedSum = orders.reduce((sum, order) => sum + order.totalAmount, 0);
          const formattedTotal = computedSum >= 1000000 
            ? `$ ${(computedSum / 1000000).toFixed(1)}M` 
            : `$ ${(computedSum / 1000).toFixed(0)}K`;

          setMetrics({
            activeRfqs: rfqResponse.data?.count || 12,
            pendingApprovals: 5, 
            monthlyPoTotal: computedSum > 0 ? formattedTotal : '$ 2.3M',
            overdueInvoices: invoiceResponse.data?.count || 3
          });
        }
      } catch (error) {
        console.error("Failed to load telemetry modules:", error);
      } finally {
        setIsLoading(false);
      }
    };

    aggregateDashboardTelemetry();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'SENT': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-6">
      
      {/* Upper Content Frame */}
      <div className="space-y-6">
        {/* Sub-header greetings block */}
        <div>
          <p className="text-sm text-slate-400 font-medium">
            Welcome back, <span className="text-slate-700 font-bold">{user ? `${user.firstName} ${user.role.replace('_', ' ')}` : 'Procurement Officer'}</span> — Today's Overview
          </p>
        </div>

        {/* Analytics Parameter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active RFQ's", val: metrics.activeRfqs, icon: <FileText size={18} />, color: "bg-emerald-500/10 text-emerald-600" },
            { label: "Pending Approvals", val: metrics.pendingApprovals, icon: <ClipboardCheck size={18} />, color: "bg-blue-500/10 text-blue-600" },
            { label: "PO's this month", val: metrics.monthlyPoTotal, icon: <DollarSign size={18} />, color: "bg-amber-500/10 text-amber-600" },
            { label: "Overdue Invoices", val: metrics.overdueInvoices, icon: <AlertCircle size={18} />, color: "bg-rose-500/10 text-rose-600" }
          ].map((card, idx) => (
            <div key={idx} className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-medium tracking-wide block">{card.label}</span>
                <span className="text-2xl font-black text-slate-800 block">{card.val}</span>
              </div>
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center shrink-0`}>
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Middle Visualisation Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Purchase Order Table block */}
          <div className="lg:col-span-3 bg-white border border-slate-200/60 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 tracking-tight">Recent Purchase Orders</h3>
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Live Tracking</span>
            </div>

            {isLoading ? (
              <div className="h-40 flex items-center justify-center">
                <Loader2 className="animate-spin text-emerald-500" size={20} />
              </div>
            ) : recentOrders.length === 0 ? (
              // Mockup fallback values if DB collections are empty
              <div className="overflow-x-auto text-xs text-slate-700">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="pb-2 font-medium">PO#</th>
                      <th className="pb-2 font-medium">Vendor</th>
                      <th className="pb-2 font-medium">Amount</th>
                      <th className="pb-2 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="font-medium"><td className="py-3 font-bold text-slate-900">Po1</td><td className="py-3">Infra</td><td className="py-3 font-semibold">87000</td><td className="py-3 text-right text-emerald-600 font-bold">Approved</td></tr>
                    <tr className="font-medium"><td className="py-3 font-bold text-slate-900">Po2</td><td className="py-3">Tech core</td><td className="py-3 font-semibold">140000</td><td className="py-3 text-right text-amber-500 font-bold">Pending</td></tr>
                    <tr className="font-medium"><td className="py-3 font-bold text-slate-900">Po3</td><td className="py-3">OfficeNeed Co</td><td className="py-3 font-semibold">34900</td><td className="py-3 text-right text-slate-400 font-bold">draft</td></tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="pb-2 font-medium">PO#</th>
                      <th className="pb-2 font-medium">Vendor</th>
                      <th className="pb-2 font-medium">Amount</th>
                      <th className="pb-2 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recentOrders.map((po) => (
                      <tr key={po._id} className="text-slate-700 hover:bg-slate-50/50 transition">
                        <td className="py-3.5 font-bold text-slate-900">{po.poNumber.slice(0, 8)}</td>
                        <td className="py-3.5 text-slate-500">{po.vendor?.companyName || "External Vendor"}</td>
                        <td className="py-3.5 font-semibold text-slate-800">${po.totalAmount.toLocaleString()}</td>
                        <td className="py-3.5 text-right">
                          <span className={`inline-block text-[10px] font-bold uppercase px-2.5 py-0.5 border rounded-full ${getStatusStyle(po.status)}`}>
                            {po.status.toLowerCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Minimalist Visual Trend Card Graphic representation */}
          <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight">Spending Trends last 6 months</h3>
              </div>
              
              <div className="relative w-full h-36 mt-6 flex items-end justify-between px-2">
                {[40, 75, 55, 90, 65, 100].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-full px-2 relative flex items-end justify-center h-28">
                      <div style={{ height: `${h}%` }} className="w-full bg-emerald-500/10 group-hover:bg-emerald-500/20 rounded-t-sm transition-all duration-500" />
                    </div>
                  </div>
                ))}
                <svg className="absolute inset-x-0 bottom-4 h-20 w-full px-4 overflow-visible pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 0 70 Q 20 30 40 50 T 80 15 T 100 5" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. EXACT EXCALIDRAW BLUEPRINT LOWER ACTION FOOTER BLOCK                   */}
      {/* ========================================================================= */}
      <div className="border-t border-slate-200 pt-6 flex flex-wrap items-center gap-3 select-none">
        <button 
          onClick={() => navigate('/rfqs')}
          className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-sm transition flex items-center gap-2"
        >
          <Plus size={14} /> + new RFQ
        </button>

        <button 
  onClick={() => navigate('/vendors', { state: { openDrawer: true } })}
  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold px-6 py-3 shadow-sm transition flex items-center gap-2"
>
  <UserPlus size={14} /> Add Vendor
</button>

        <button 
          onClick={() => navigate('/invoices')}
          className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold px-6 py-3 shadow-sm transition flex items-center gap-2"
        >
          view Invoices <ArrowUpRight size={14} />
        </button>
      </div>

    </div>
  );
};