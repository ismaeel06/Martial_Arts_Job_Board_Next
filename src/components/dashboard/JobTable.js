'use client';
import JobActions from './JobActions';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Placeholder data, ready for backend integration
const jobs = [
	{
		id: 1,
		title: 'Head Karate Instructor',
		employer: 'Dragon Martial Arts',
		employerLogo: '/logo.svg',
		location: 'New York, NY',
		type: 'Full-Time',
		salary: '$3,000/mo',
		status: 'pending',
		posted_at: '2025-06-20',
	},
	{
		id: 2,
		title: 'Judo Coach',
		employer: 'Samurai Dojo',
		employerLogo: '/logo.svg',
		location: 'Los Angeles, CA',
		type: 'Part-Time',
		salary: '$1,500/mo',
		status: 'published',
		posted_at: '2025-06-18',
	},
];

const statusColors = {
	published: 'bg-green-100 text-green-700 border-green-400',
	pending: 'bg-yellow-100 text-yellow-700 border-yellow-400',
	closed: 'bg-red-100 text-red-700 border-red-400',
};

export default function JobTable({ statusFilter, forInstructor }) {
	const role = useSelector((state) => state.role.value);
	const [search, setSearch] = useState('');

	// Define columns for each role
	const columnsByRole = {
		admin: [
			{ key: 'title', label: 'Title' },
			{ key: 'employer', label: 'Employer' },
			{ key: 'location', label: 'Location' },
			{ key: 'type', label: 'Type' },
			{ key: 'salary', label: 'Salary' },
			{ key: 'status', label: 'Status' },
			{ key: 'posted_at', label: 'Posted' },
			{ key: 'actions', label: 'Actions', align: 'center' },
		],
		school: [
			{ key: 'title', label: 'Title' },
			{ key: 'applicants', label: 'Applicants' },
			{ key: 'status', label: 'Status' },
			{ key: 'posted_at', label: 'Posted' },
			{ key: 'actions', label: 'Actions', align: 'center' },
		],
		instructor: [
			{ key: 'title', label: 'Title' },
			{ key: 'employer', label: 'Employer' },
			{ key: 'location', label: 'Location' },
			{ key: 'type', label: 'Type' },
			{ key: 'salary', label: 'Salary' },
			{ key: 'status', label: 'Status' },
			{ key: 'posted_at', label: 'Posted' },
			{ key: 'actions', label: 'Actions', align: 'center' },
		],
	};

	// Add applicants count for school role (placeholder)
	const jobsWithApplicants = jobs.map((job) => ({ ...job, applicants: Math.floor(Math.random() * 20) + 1 }));
	const jobsToShow = role === 'school' ? jobsWithApplicants : jobs;

	// Filter jobs by search (all roles)
	let filteredJobs = jobsToShow.filter(job =>
		Object.values(job).some(val =>
			String(val).toLowerCase().includes(search.toLowerCase())
		)
	);

	// Additional filter for school role by status
	if (role === 'school' && statusFilter) {
		if (statusFilter === 'active') filteredJobs = filteredJobs.filter(j => j.status === 'published' || j.status === 'pending');
		if (statusFilter === 'filled') filteredJobs = filteredJobs.filter(j => j.status === 'filled');
		if (statusFilter === 'closed') filteredJobs = filteredJobs.filter(j => j.status === 'closed');
	}
	// For instructor, show only open jobs (mock logic)
	if (forInstructor) {
		filteredJobs = filteredJobs.filter(j => j.status === 'published' || j.status === 'pending');
	}

	const columns = columnsByRole[role] || columnsByRole.admin;

	return (
		<div className="w-full">
			<div className="overflow-x-auto">
				<div className="w-full">
					<div className="mb-4 flex items-center">
						<input
							type="text"
							placeholder="Search jobs..."
							value={search}
							onChange={e => setSearch(e.target.value)}
							className="dashboard-search px-4 py-2 border rounded-lg shadow focus:outline-none w-full max-w-xs"
						/>
					</div>
					<div className="overflow-x-auto animate-fade-in border border-orange-200 rounded-2xl shadow-xl bg-white/95">
						<table className="min-w-full text-sm table-auto">
							<thead className="sticky top-0 z-10">
								<tr className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white">
									{columns.map((col, idx) => (
										<th
											key={col.key}
											className={`px-6 py-4 text-left font-bold ${idx === 0 ? 'rounded-tl-2xl' : ''} ${idx === columns.length - 1 ? 'rounded-tr-2xl' : ''} ${col.align === 'center' ? 'text-center' : ''}`}
										>
											{col.label}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{filteredJobs.map((job, i) => (
									<tr
										key={job.id}
										className="group transition-all duration-300 bg-white hover:bg-orange-50 border-b border-orange-100 shadow-sm hover:shadow-lg rounded-2xl animate-fade-in"
										style={{ animationDelay: `${i * 60}ms` }}
									>
										{columns.map((col) => {
											if (col.key === 'employer') {
												return (
													<td key={col.key} className="px-6 py-4 flex items-center gap-3">
														<image
															src={job.employerLogo}
															alt="logo"
															className="w-8 h-8 rounded-full border-2 border-orange-200 shadow"
														/>
														<span className="text-black font-medium">{job.employer}</span>
													</td>
												);
											}
											if (col.key === 'status') {
												return (
													<td key={col.key} className="px-6 py-4">
														<span
															className={`px-3 py-1 rounded-full text-xs font-semibold border ${
																statusColors[job.status] ||
																'bg-gray-100 text-gray-700 border-gray-300'
															}`}
														>
															{job.status.charAt(0).toUpperCase() + job.status.slice(1)}
														</span>
													</td>
												);
											}
											if (col.key === 'actions') {
												return (
													<td key={col.key} className="px-6 py-4 text-center flex gap-2 justify-center">
														{role === 'admin' && (
															<JobActions job={job} />
														)}
													</td>
												);
											}
											return (
												<td key={col.key} className="px-6 py-4 text-black{col.key === 'title' ? ' font-semibold' : ''}">
													{job[col.key]}
												</td>
											);
										})}
									</tr>
								))}
							</tbody>
						</table>
						<style jsx>{`
							.animate-fade-in {
								animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
							}
						`}</style>
					</div>
				</div>
			</div>
		</div>
	);
}
