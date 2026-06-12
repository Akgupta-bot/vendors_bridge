// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthPages } from './modules/auth/AuthPages';
import { DashboardOverview } from './modules/dashboard/DashboardOverview';
import { VendorManagement } from '../src/modules/VendorManagement/VendorManagement'; 
import { RFQManagement } from './modules/RFQManagement/RFQManagement';
import { RFQList } from './modules/RFQManagement/RFQList';
import { QuotationComparison } from './modules/QuotationSubmissionForm/QuotationComparison';

// NEW IMPORTS: Bringing in your new bidding portal and dynamic quotation form view modules
import { VendorBiddingPortal } from './modules/QuotationSubmissionForm/VendorBiddingPortal';
import { QuotationSubmissionForm } from './modules/QuotationSubmissionForm/QuotationSubmissionForm';
const UnauthorizedMock = () => <div className="p-8 text-rose-600 font-bold">Access Denied: You do not have permissions for this module.</div>;

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Authentication Gateways */}
        <Route path="/login" element={<AuthPages />} />
        <Route path="/unauthorized" element={<UnauthorizedMock />} />

        {/* SECURED ACCOUNT ROUTING MATRIX */}
        <Route element={<ProtectedRoute />}>
          
          {/* PARENT SHELL WRAPPER: Draws your persistent sidebar globally once */}
          <Route element={<DashboardLayout />}>
            
            {/* When URL is /dashboard -> displays Sidebar + Dashboard Graphs */}
            <Route path="/dashboard" element={<DashboardOverview />} />
            
            {/* When URL is /vendors -> displays Sidebar + Vendor Management Grid */}
            <Route path="/vendors" element={<VendorManagement />} />
            
            {/* 1. Procurement Team Specific Sub-Gateways */}
            <Route element={<ProtectedRoute allowedRoles={['PROCUREMENT_OFFICER', 'ADMIN']} />}>
              {/* Main Sidebar Link: Displays the full tracking table list */}
              <Route path="/rfqs" element={<RFQList />} />

              <Route path="/rfqs/compare/:rfqId" element={<QuotationComparison />} />
              
              {/* Form Wizard Path: Dispatched when clicking "+ new RFQ" */}
              <Route path="/rfqs/create" element={<RFQManagement />} />
            </Route>

            {/* 2. NEW ADDITION: External Vendor Partner Workspace Sub-Gateways */}
            {/* Inherits the exact layout matrix, placing the workspace inside your clean UI theme layout wrapper */}
            <Route element={<ProtectedRoute allowedRoles={['VENDOR', 'ADMIN']} />}>
              {/* Main Sidebar Link: Displays the vendor invitation inbox cards */}
              <Route path="/quotations" element={<VendorBiddingPortal />} />
              
              {/* Bidding Execution Path: Dynamic form using your Excalidraw subtotal-taxes breakdown layout */}
              <Route path="/quotations/submit/:rfqId" element={<QuotationSubmissionForm />} />
            </Route>
            
          </Route>
        </Route>

        {/* Fallback structural system navigation redirection */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}