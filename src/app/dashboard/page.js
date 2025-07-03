'use client';

import OverviewCards from '../../components/dashboard/OverviewCards';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from '../../store';
import { setRole } from '../../roleSlice';

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'School', value: 'school' },
  { label: 'Instructor', value: 'instructor' },
];

function DashboardHomeContent() {
  const role = useSelector(state => state.role.value);
  const dispatch = useDispatch();

  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 md:px-8 py-4 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
          {role === 'admin' && 'Admin Dashboard'}
          {role === 'school' && 'School Dashboard'}
          {role === 'instructor' && 'Instructor Dashboard'}
        </h1>
        <select
          className="px-4 py-2 rounded-lg border border-orange-300 bg-white text-black font-semibold shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={role}
          onChange={e => dispatch(setRole(e.target.value))}
        >
          {roles.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>
      <OverviewCards role={role} />
    </div>
  );
}

export default function DashboardHome() {
  return (
    <Provider store={store}>
      <DashboardHomeContent />
    </Provider>
  );
}
