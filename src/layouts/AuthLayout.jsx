import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const AuthLayout = () => {
  if (isAuthenticated()) {
    return <Navigate to={`/${getUserRole()}/dashboard`} replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900">
          AuditChain
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enterprise Transaction Verification
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
