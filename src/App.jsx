import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from './utils/auth';

import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

import UserDashboard from './pages/user/UserDashboard';
import UserTransactions from './pages/user/UserTransactions';
import UserTransfer from './pages/user/UserTransfer';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAccounts from './pages/admin/AdminAccounts';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';

import AuditorDashboard from './pages/auditor/AuditorDashboard';
import AuditorVerify from './pages/auditor/AuditorVerify';
import AuditorAISummary from './pages/auditor/AuditorAISummary';
import AuditorLogs from './pages/auditor/AuditorLogs';
import AuditorAlerts from './pages/auditor/AuditorAlerts';

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  const role = getUserRole();
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* User Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />

          <Route path="transactions" element={<UserTransactions />} />
          <Route path="transfer" element={<UserTransfer />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="accounts" element={<AdminAccounts />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          {/* Missing in sidebar originally but added to prevent 404s */}
          <Route path="system" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Auditor Routes */}
        <Route
          path="/auditor"
          element={
            <ProtectedRoute allowedRoles={['auditor']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AuditorDashboard />} />
          <Route path="logs" element={<AuditorLogs />} />
          <Route path="verify" element={<AuditorVerify />} />
          <Route path="alerts" element={<AuditorAlerts />} />
          <Route path="ai-summary" element={<AuditorAISummary />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
