import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthPages } from './modules/auth/AuthPages';

const LoginMock = () => <div className="p-8 font-bold">Login Screen (Phase 2 Form will go here)</div>;
const DashboardMock = () => <div className="text-2xl font-bold text-slate-800">Welcome to VendorBridge Overview Dashboard</div>;
const RFQMock = () => <div className="text-2xl font-bold text-slate-800">RFQ Creation and Tracking Portal</div>;
const UnauthorizedMock = () => <div className="p-8 text-rose-600 font-bold">Access Denied: You do not have permissions for this module.</div>;

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
       <Route path="/login" element={<AuthPages />} />
        <Route path="/unauthorized" element={<UnauthorizedMock />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardMock />} />
            
            {/* Scoped Role Routes */}
            <Route element={<ProtectedRoute allowedRoles={['PROCUREMENT_OFFICER', 'ADMIN']} />}>
              <Route path="/rfqs" element={<RFQMock />} />
            </Route>
            
            {/* More sub-modules can be added here seamlessly */}
          </Route>
        </Route>

        {/* Fallback routing */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}