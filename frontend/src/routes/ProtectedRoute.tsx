import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  // Directly extract the literal string array combinations from your core store type
  allowedRoles?: Array<"ADMIN" | "MANAGER" | "PROCUREMENT_OFFICER" | "VENDOR">;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  // If the bearer token or session mapping is missing, redirect to login page immediately
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user's secure model clearance string is missing from your routing array layout, drop to 403 route
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Passed all validation barriers! Render child routes within the application dashboard container layouts
  return <Outlet />;
};