import UserTable from '../../../components/dashboard/UserTable';

export default function ManageUsers() {
  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 md:px-8 py-4 w-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-accent">Manage Users</h2>
      <div className="bg-white/80 rounded-2xl shadow-xl p-2 sm:p-4 md:p-6 overflow-x-auto">
        <UserTable />
      </div>
    </div>
  );
}
