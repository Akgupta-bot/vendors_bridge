import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';

import { AuthPages } from './modules/auth/AuthPages';
import Dashboard from './modules/dashboard/LandingPage';
import VendorsPage from "./modules/dashboard/VendorsPage";
import RFQsPage from "./modules/dashboard/RfqsPage";
import QoutationPage from "./modules/dashboard/QoutationPage";
import QuotationComparisonPage from "./modules/dashboard/QoutationComparisonPage";
import ApprovalPage from "./modules/dashboard/ApprovalPage";
import PurchaseOrderInvoicePage from "./modules/dashboard/PurchaseOrderInvoicePage";
import ActivityLogsPage from "./modules/dashboard/ActivityLogsPage";
import ReportsPage from "./modules/dashboard/ReportsPage";


const UnauthorizedMock = () => <div className="p-8 text-rose-600 font-bold">Access Denied: You do not have permissions for this module.</div>;

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
       <Route path="/login" element={<AuthPages />} />
        {/* <Route path="/unauthorized" element={<UnauthorizedMock />} /> */}

        {/* Protected Dashboard Routes */}
        {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<QoutationPage />} />
            
            {/* Scoped Role Routes */}
            {/* <Route element={<ProtectedRoute allowedRoles={['PROCUREMENT_OFFICER', 'ADMIN']} />}>
              <Route path="/rfqs" element={<RFQMock />} />
            </Route> */}
            
            {/* More sub-modules can be added here seamlessly */}
          </Route>
        {/* </Route> */}

        {/* Fallback routing */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/vendors" element={<VendorsPage />} />
        <Route path="/rfqs" element={<RFQsPage />} />
        <Route path="/qotation" element={<QoutationPage/>} />
        <Route path="/quotation-comparison" element={<QuotationComparisonPage />}/>
        <Route path="/approval" element={<ApprovalPage />}/>
        <Route path="/purchase-order-invoice" element={<PurchaseOrderInvoicePage />}/>
        <Route path="/activity" element={<ActivityLogsPage />}/>
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
}