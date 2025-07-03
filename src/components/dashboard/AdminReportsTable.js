'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import { FaEye, FaDownload, FaChartBar } from 'react-icons/fa';

// Mock data for reports
const reports = [
  {
    id: 1,
    name: "Monthly User Growth",
    category: "Users",
    period: "June 2025",
    generated: "2025-07-01",
    status: "Ready",
    insights: "15% increase in new user registrations",
    fileSize: "1.2 MB",
  },
  {
    id: 2,
    name: "Job Posting Analytics",
    category: "Jobs",
    period: "Q2 2025",
    generated: "2025-06-30",
    status: "Ready",
    insights: "Most popular job categories: Karate, BJJ",
    fileSize: "2.8 MB",
  },
  {
    id: 3,
    name: "Revenue Overview",
    category: "Finance",
    period: "YTD 2025",
    generated: "2025-06-29",
    status: "Processing",
    insights: "Subscription revenue up 22% from previous year",
    fileSize: "3.5 MB",
  },
  {
    id: 4,
    name: "Regional Distribution",
    category: "Analytics",
    period: "H1 2025",
    generated: "2025-06-25",
    status: "Ready",
    insights: "Highest growth regions: West Coast, Northeast",
    fileSize: "4.1 MB",
  },
  {
    id: 5,
    name: "Marketing Campaign Results",
    category: "Marketing",
    period: "May-June 2025",
    generated: "2025-06-22",
    status: "Failed",
    insights: "Data collection error, please regenerate",
    fileSize: "N/A",
  },
];

const statusColors = {
  Ready: 'bg-green-100 text-green-700 border-green-400',
  Processing: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  Failed: 'bg-red-100 text-red-700 border-red-400',
};

export default function AdminReportsTable() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [reportsData, setReportsData] = useState(reports);

  // Filter reports based on search and category
  const filteredReports = reportsData.filter(report => {
    const matchesSearch = search === '' || 
      report.name.toLowerCase().includes(search.toLowerCase()) ||
      report.period.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || report.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = ['All', ...new Set(reports.map(report => report.category))];

  // Handle report regeneration
  const handleRegenerateReport = (id) => {
    setReportsData(reportsData.map(report => 
      report.id === id ? { ...report, status: 'Processing' } : report
    ));
    
    // Simulate processing completion after 2 seconds
    setTimeout(() => {
      setReportsData(reportsData.map(report => 
        report.id === id ? { ...report, status: 'Ready', generated: '2025-07-03' } : report
      ));
    }, 2000);
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="w-full">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="dashboard-search px-4 py-2 border rounded-lg shadow focus:outline-none w-full sm:w-auto flex-grow"
            />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-orange-400 w-full sm:w-auto"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Button variant="primary" className="w-full sm:w-auto">
              <FaChartBar className="mr-2" /> Generate New Report
            </Button>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/95 animate-fade-in border border-orange-200">
            <table className="min-w-full text-sm table-auto">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white">
                  <th className="px-6 py-4 text-left font-bold rounded-tl-2xl">Report Name</th>
                  <th className="px-6 py-4 text-left font-bold">Category</th>
                  <th className="px-6 py-4 text-left font-bold">Period</th>
                  <th className="px-6 py-4 text-left font-bold">Generated</th>
                  <th className="px-6 py-4 text-left font-bold">Size</th>
                  <th className="px-6 py-4 text-left font-bold">Status</th>
                  <th className="px-6 py-4 text-center font-bold rounded-tr-2xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report, i) => (
                    <tr
                      key={report.id}
                      className="group transition-all duration-300 bg-white hover:bg-orange-50 border-b border-orange-100 shadow-sm hover:shadow-lg rounded-2xl animate-fade-in"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <td className="px-6 py-4 font-semibold text-black">
                        <div>
                          {report.name}
                          <div className="text-gray-500 font-normal text-xs mt-1">{report.insights}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-black">{report.category}</td>
                      <td className="px-6 py-4 text-black">{report.period}</td>
                      <td className="px-6 py-4 text-black">{report.generated}</td>
                      <td className="px-6 py-4 text-black">{report.fileSize}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[report.status]}`}>
                          {report.status}
                        </span>
                      </td>

<td className="px-6 py-4 text-center">
  <div className="flex justify-center items-center gap-2">
    <Button
      variant="primary"
      size="sm"
      disabled={report.status !== 'Ready'}
      title={report.status !== 'Ready' ? 'Report not ready' : 'View Report'}
      className="mx-1"
    >
      <FaEye className="mr-1" /> View
    </Button>
    
    <div className="flex gap-2">
      {/* Download button - always shown but disabled when not Ready */}
      <button
        className={`p-2 rounded-full ${
          report.status === 'Ready'
            ? "bg-blue-100 text-blue-700 hover:bg-blue-200" 
            : "bg-gray-100 text-gray-400 cursor-default"
        } mx-1`}
        title={report.status === 'Ready' ? "Download Report" : "Report not ready"}
        disabled={report.status !== 'Ready'}
      >
        <FaDownload />
      </button>
      
      {/* Regenerate button - always shown but only enabled for Failed */}
      <button
        onClick={report.status === 'Failed' ? () => handleRegenerateReport(report.id) : undefined}
        className={`p-2 rounded-full ${
          report.status === 'Failed'
            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" 
            : "bg-gray-100 text-gray-400 cursor-default"
        } mx-1`}
        title={report.status === 'Failed' ? "Regenerate Report" : "Action unavailable"}
        disabled={report.status !== 'Failed'}
      >
        <FaChartBar />
      </button>
    </div>
  </div>
</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No reports found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredReports.length}</span> reports
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