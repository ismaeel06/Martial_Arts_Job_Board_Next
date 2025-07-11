'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminReportsTable from '../../../components/dashboard/AdminReportsTable';

export default function AdminReportsPage() {
  const role = useSelector(state => state.role.value);
  const router = useRouter();

  // Redirect non-admin users
  React.useEffect(() => {
    if (role !== 'admin') {
      router.push('/dashboard');
    }
  }, [role, router]);

  if (role !== 'admin') return null;

  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 md:px-8 py-4 w-full">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-2">
          Reports
        </h1>
        <p className="text-gray-600">
          Generate and analyze platform metrics and business intelligence reports.
        </p>
      </div>

      <div className="bg-white/80 rounded-2xl shadow-xl p-2 sm:p-4 md:p-6 overflow-x-auto">
        <AdminReportsTable />
      </div>
    </div>
  );
}