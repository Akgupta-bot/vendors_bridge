// src/layouts/DashboardLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../modules/sidebar/Sidebar'; // Adjust path based on your folders

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* 1. This sidebar stays fixed on the screen across ALL sub-routes */}
      <Sidebar />

      {/* 2. Main content viewport shell */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Global Operational Header Banner */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm shrink-0 select-none">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Procurement Operations Cluster
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              System Connected
            </span>
          </div>
        </header>

        {/* 3. Your view components automatically drop right into this section! */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};