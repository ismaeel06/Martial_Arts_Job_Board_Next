'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import { FaEye, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

// Mock data for applications
const applications = [
  {
    id: 1,
    jobTitle: "Karate Instructor",
    applicantName: "John Doe",
    school: "Phoenix Martial Arts",
    appliedDate: "2025-06-22",
    status: "Pending",
    experience: "5 years",
    coverLetter: "I am passionate about teaching martial arts...",
    resume: "resume_john.pdf",
  },
  {
    id: 2,
    jobTitle: "Taekwondo Coach",
    applicantName: "Jane Smith",
    school: "Golden Dragon Academy",
    appliedDate: "2025-06-20",
    status: "Accepted",
    experience: "8 years",
    coverLetter: "With my extensive background in Taekwondo...",
    resume: "resume_jane.pdf",
  },
  {
    id: 3,
    jobTitle: "Jiu-Jitsu Trainer",
    applicantName: "Mike Johnson",
    school: "Elite Combat Center",
    appliedDate: "2025-06-18",
    status: "Rejected",
    experience: "3 years",
    coverLetter: "I specialize in Brazilian Jiu-Jitsu...",
    resume: "resume_mike.pdf",
  },
  {
    id: 4,
    jobTitle: "Kung Fu Instructor",
    applicantName: "Sarah Williams",
    school: "Harmony Martial Arts",
    appliedDate: "2025-06-15",
    status: "Pending",
    experience: "6 years",
    coverLetter: "Traditional Kung Fu has been my passion...",
    resume: "resume_sarah.pdf",
  },
  {
    id: 5,
    jobTitle: "MMA Coach",
    applicantName: "Alex Chen",
    school: "Victory Fight Club",
    appliedDate: "2025-06-10",
    status: "Accepted",
    experience: "10 years",
    coverLetter: "As an experienced MMA coach...",
    resume: "resume_alex.pdf",
  },
];

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  Accepted: 'bg-green-100 text-green-700 border-green-400',
  Rejected: 'bg-red-100 text-red-700 border-red-400',
};

export default function AdminApplicationsTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [applicationsData, setApplicationsData] = useState(applications);

  // Filter applications based on search and status
  const filteredApplications = applicationsData.filter(app => {
    const matchesSearch = search === '' || 
      app.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      app.school.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle application status change
  const handleStatusChange = (id, newStatus) => {
    setApplicationsData(applicationsData.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="w-full">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              type="text"
              placeholder="Search applications..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="dashboard-search px-4 py-2 border rounded-lg shadow focus:outline-none w-full max-w-xs"
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/95 animate-fade-in border border-orange-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white">
                  <th className="px-6 py-4 text-left font-bold rounded-tl-2xl">Job</th>
                  <th className="px-6 py-4 text-left font-bold">Applicant</th>
                  <th className="px-6 py-4 text-left font-bold">School</th>
                  <th className="px-6 py-4 text-left font-bold">Applied Date</th>
                  <th className="px-6 py-4 text-left font-bold">Experience</th>
                  <th className="px-6 py-4 text-center font-bold">Status</th>
                  <th className="px-6 py-4 text-center font-bold rounded-tr-2xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app, i) => (
                    <tr
                      key={app.id}
                      className="border-b border-orange-100 hover:bg-orange-50"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <td className="px-6 py-4 font-semibold text-black">{app.jobTitle}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center font-bold text-orange-700 border-2 border-orange-400 shadow">
                            {app.applicantName.charAt(0)}
                          </span>
                          {app.applicantName}
                        </div>
                      </td>
                      <td className="px-6 py-4">{app.school}</td>
                      <td className="px-6 py-4">{app.appliedDate}</td>
                      <td className="px-6 py-4">{app.experience}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[app.status]}`}>
                          {app.status}
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
        <Button
      variant="primary"
      size="sm"
      title="Delete Application"
      className="mx-1"
    >
      <FaTrash className="mr-1" /> Delete
    </Button>
    
    <div className="flex gap-2">
      {/* <button
        onClick={app.status === "Pending" ? () => handleStatusChange(app.id, "Accepted") : undefined}
        className={`p-2 rounded-full ${
          app.status === "Pending" 
            ? "bg-green-100 text-green-700 hover:bg-green-200" 
            : "bg-gray-100 text-gray-400 cursor-default"
        } mx-1`}
        title={app.status === "Pending" ? "Accept Application" : "Action unavailable"}
        disabled={app.status !== "Pending"}
      >
        <FaCheck />
      </button>
      <button
        onClick={app.status === "Pending" ? () => handleStatusChange(app.id, "Rejected") : undefined}
        className={`p-2 rounded-full ${
          app.status === "Pending" 
            ? "bg-red-100 text-red-700 hover:bg-red-200" 
            : "bg-gray-100 text-gray-400 cursor-default"
        } mx-1`}
        title={app.status === "Pending" ? "Reject Application" : "Action unavailable"}
        disabled={app.status !== "Pending"}
      >
        <FaTimes />
      </button> */}
    </div>
  </div>
</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No applications found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredApplications.length}</span> applications
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