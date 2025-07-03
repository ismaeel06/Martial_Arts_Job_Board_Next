'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import { FaEye, FaBan, FaRedo } from 'react-icons/fa';

// Mock data for subscriptions
const subscriptions = [
  {
    id: 1,
    user: "Phoenix Martial Arts",
    email: "contact@phoenixma.com",
    plan: "Premium",
    startDate: "2025-01-15",
    nextBilling: "2025-07-15",
    amount: "$49.99",
    status: "Active",
    paymentMethod: "Credit Card (****4532)",
  },
  {
    id: 2,
    user: "Golden Dragon Academy",
    email: "admin@goldendragon.com",
    plan: "Basic",
    startDate: "2025-03-10",
    nextBilling: "2025-07-10",
    amount: "$29.99",
    status: "Active",
    paymentMethod: "PayPal",
  },
  {
    id: 3,
    user: "Elite Combat Center",
    email: "info@elitecombat.com",
    plan: "Premium",
    startDate: "2025-02-22",
    nextBilling: "2025-07-22",
    amount: "$49.99",
    status: "Suspended",
    paymentMethod: "Credit Card (****7890)",
  },
  {
    id: 4,
    user: "Harmony Martial Arts",
    email: "contact@harmonyma.com",
    plan: "Premium",
    startDate: "2024-12-05",
    nextBilling: "2025-07-05",
    amount: "$49.99",
    status: "Active",
    paymentMethod: "Credit Card (****2345)",
  },
  {
    id: 5,
    user: "Victory Fight Club",
    email: "admin@victoryfight.com",
    plan: "Enterprise",
    startDate: "2025-04-18",
    nextBilling: "2025-07-18",
    amount: "$99.99",
    status: "Canceled",
    paymentMethod: "Bank Transfer",
  },
];

const statusColors = {
  Active: 'bg-green-100 text-green-700 border-green-400',
  Suspended: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  Canceled: 'bg-red-100 text-red-700 border-red-400',
};

export default function AdminSubscriptionsTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [subscriptionsData, setSubscriptionsData] = useState(subscriptions);

  // Filter subscriptions based on search, status, and plan
  const filteredSubscriptions = subscriptionsData.filter(sub => {
    const matchesSearch = search === '' || 
      sub.user.toLowerCase().includes(search.toLowerCase()) ||
      sub.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
    const matchesPlan = planFilter === 'All' || sub.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Handle subscription status change
  const handleStatusChange = (id, newStatus) => {
    setSubscriptionsData(subscriptionsData.map(sub => 
      sub.id === id ? { ...sub, status: newStatus } : sub
    ));
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="w-full">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="dashboard-search px-4 py-2 border rounded-lg shadow focus:outline-none w-full sm:w-auto"
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-orange-400 w-full sm:w-auto"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Canceled">Canceled</option>
            </select>
            <select
              value={planFilter}
              onChange={e => setPlanFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-orange-400 w-full sm:w-auto"
            >
              <option value="All">All Plans</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/95 animate-fade-in border border-orange-200">
            <table className="min-w-full text-sm table-auto">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white">
                  <th className="px-6 py-4 text-left font-bold rounded-tl-2xl">User</th>
                  <th className="px-6 py-4 text-left font-bold">Plan</th>
                  <th className="px-6 py-4 text-left font-bold">Start Date</th>
                  <th className="px-6 py-4 text-left font-bold">Next Billing</th>
                  <th className="px-6 py-4 text-left font-bold">Amount</th>
                  <th className="px-6 py-4 text-left font-bold">Status</th>
                  <th className="px-6 py-4 text-center font-bold rounded-tr-2xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.length > 0 ? (
                  filteredSubscriptions.map((sub, i) => (
                    <tr
                      key={sub.id}
                      className="group transition-all duration-300 bg-white hover:bg-orange-50 border-b border-orange-100 shadow-sm hover:shadow-lg rounded-2xl animate-fade-in"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <td className="px-6 py-4 font-semibold text-black">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center font-bold text-orange-700 border-2 border-orange-400 shadow">
                              {sub.user.charAt(0)}
                            </span>
                            {sub.user}
                          </div>
                          <div className="text-gray-500 font-normal text-xs mt-1">{sub.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-black">{sub.plan}</td>
                      <td className="px-6 py-4 text-black">{sub.startDate}</td>
                      <td className="px-6 py-4 text-black">{sub.nextBilling}</td>
                      <td className="px-6 py-4 text-black">{sub.amount}/month</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[sub.status]}`}>
                          {sub.status}
                        </span>
                      </td>


<td className="px-6 py-4 text-center">
  <div className="flex justify-center items-center gap-2">
    <Button
      variant="primary"
      size="sm"
      title="View Details"
      className="mx-1"
    >
      <FaEye className="mr-1" /> View
    </Button>
    
    <div className="flex gap-2">
      {/* Suspend button - shown for Active subscriptions, disabled otherwise */}
      <button
        onClick={sub.status === "Active" ? () => handleStatusChange(sub.id, "Suspended") : undefined}
        className={`p-2 rounded-full ${
          sub.status === "Active" 
            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" 
            : "bg-gray-100 text-gray-400 cursor-default"
        } mx-1`}
        title={sub.status === "Active" ? "Suspend Subscription" : "Action unavailable"}
        disabled={sub.status !== "Active"}
      >
        <FaBan />
      </button>
      
      {/* Reactivate button - shown for Suspended subscriptions, disabled otherwise */}
      <button
        onClick={sub.status === "Suspended" ? () => handleStatusChange(sub.id, "Active") : undefined}
        className={`p-2 rounded-full ${
          sub.status === "Suspended" 
            ? "bg-green-100 text-green-700 hover:bg-green-200" 
            : "bg-gray-100 text-gray-400 cursor-default"
        } mx-1`}
        title={sub.status === "Suspended" ? "Reactivate Subscription" : "Action unavailable"}
        disabled={sub.status !== "Suspended"}
      >
        <FaRedo />
      </button>
      
      {/* Cancel button - shown for Active/Suspended subscriptions, disabled otherwise */}
      <button
        onClick={(sub.status === "Active" || sub.status === "Suspended") 
          ? () => handleStatusChange(sub.id, "Canceled") 
          : undefined}
        className={`p-2 rounded-full ${
          (sub.status === "Active" || sub.status === "Suspended")
            ? "bg-red-100 text-red-700 hover:bg-red-200" 
            : "bg-gray-100 text-gray-400 cursor-default"
        } mx-1`}
        title={(sub.status === "Active" || sub.status === "Suspended") 
          ? "Cancel Subscription" 
          : "Action unavailable"}
        disabled={!(sub.status === "Active" || sub.status === "Suspended")}
      >
        <FaBan />
      </button>
    </div>
  </div>
</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No subscriptions found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredSubscriptions.length}</span> subscriptions
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="bg-orange-50 border-orange-500 text-orange-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
          <style jsx>{`
            .animate-fade-in {
              animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}