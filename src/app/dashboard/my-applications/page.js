'use client';

import ApplicationsTable from '../../../components/dashboard/ApplicationsTable';
import { useSelector } from 'react-redux';

export default function MyApplicationsPage() {
  const role = useSelector(state => state.role.value);
  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 md:px-8 py-4 w-full">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-8">My Applications</h2>
      <div className="bg-white/80 rounded-2xl shadow-xl p-2 sm:p-4 md:p-6 overflow-x-auto">
        <ApplicationsTable forInstructor={role === 'instructor'} />
      </div>
    </div>
  );
}
