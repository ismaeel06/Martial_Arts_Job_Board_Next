'use client';

import { useState } from 'react';
import { FaRegFileAlt, FaUserTie } from 'react-icons/fa';
import Button from '../ui/Button';

// Example application data (replace with backend integration)
const applications = [
	{
		id: 1,
		job: 'Head Karate Instructor',
		instructor: 'Bruce Lee',
		status: 'Pending',
		applied_at: '2025-06-20',
		cover_letter: 'I am passionate about teaching...',
		resume: 'resume_bruce.pdf',
		video: 'https://youtu.be/demo',
	},
	{
		id: 2,
		job: 'Judo Coach',
		instructor: 'Jane Smith',
		status: 'Accepted',
		applied_at: '2025-06-18',
		cover_letter: 'Experienced in Judo...',
		resume: 'resume_jane.pdf',
		video: '',
	},
];

const statusColors = {
	Pending: 'bg-yellow-100 text-yellow-700 border-yellow-400',
	Accepted: 'bg-green-100 text-green-700 border-green-400',
	Rejected: 'bg-red-100 text-red-700 border-red-400',
};

export default function ApplicationsTable({ forSchool, forInstructor }) {
	const [search, setSearch] = useState('');
	let filteredApps = applications.filter(app =>
		Object.values(app).some(val =>
			String(val).toLowerCase().includes(search.toLowerCase())
		)
	);

	// If forSchool, filter to only applications for this school's jobs (mock logic)
	if (forSchool) {
		filteredApps = filteredApps.filter(app => app.job && app.job.includes('Karate')); // Replace with real logic
	}
	// If forInstructor, filter to only applications by this instructor (mock logic)
	if (forInstructor) {
		filteredApps = filteredApps.filter(app => app.instructor && app.instructor === 'Bruce Lee'); // Replace with real logic
	}

	return (
		<div className="w-full">
			<div className="overflow-x-auto">
				<div className="w-full">
					<div className="mb-4 flex items-center">
						<input
							type="text"
							placeholder="Search applications..."
							value={search}
							onChange={e => setSearch(e.target.value)}
							className="dashboard-search px-4 py-2 border rounded-lg shadow focus:outline-none w-full max-w-xs"
						/>
					</div>
					<div className="overflow-x-auto rounded-2xl shadow-xl bg-white/95 animate-fade-in border border-orange-200">
						<table className="min-w-full text-sm table-auto">
							<thead className="sticky top-0 z-10">
								<tr className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white">
									<th className="px-6 py-4 text-left font-bold rounded-tl-2xl">
										Job
									</th>
									<th className="px-6 py-4 text-left font-bold">
										Instructor
									</th>
									<th className="px-6 py-4 text-left font-bold">Status</th>
									<th className="px-6 py-4 text-left font-bold">Applied</th>
									<th className="px-6 py-4 text-left font-bold">
										Cover Letter
									</th>
									<th className="px-6 py-4 text-left font-bold">Resume</th>
									<th className="px-6 py-4 text-left font-bold">Video</th>
									<th className="px-6 py-4 text-center font-bold rounded-tr-2xl">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{filteredApps.map((app, i) => (
									<tr
										key={app.id}
										className="group transition-all duration-300 bg-white hover:bg-orange-50 border-b border-orange-100 shadow-sm hover:shadow-lg rounded-2xl animate-fade-in"
										style={{ animationDelay: `${i * 60}ms` }}
									>
										<td className="px-6 py-4 font-semibold text-black">
											{app.job}
										</td>
										<td className="px-6 py-4 text-black">
											{app.instructor}
										</td>
										<td className="px-6 py-4">
											<span
												className={`px-3 py-1 rounded-full text-xs font-semibold border ${
													statusColors[app.status] ||
													'bg-gray-100 text-gray-700 border-gray-300'
												}`}
											>
												{app.status}
											</span>
										</td>
										<td className="px-6 py-4 text-black">
											{app.applied_at}
										</td>
										<td className="px-6 py-4 text-black max-w-xs truncate">
											{app.cover_letter}
										</td>
										<td className="px-6 py-4 text-black">
											<a
												href={`/${app.resume}`}
												className="text-orange-600 underline"
												target="_blank"
												rel="noopener noreferrer"
											>
												Resume
											</a>
										</td>
										<td className="px-6 py-4 text-black">
											{app.video ? (
												<a
													href={app.video}
													className="text-orange-600 underline"
													target="_blank"
													rel="noopener noreferrer"
												>
													Video
												</a>
											) : (
												'-'
											)}
										</td>
										<td className="px-6 py-4 text-center flex gap-2 justify-center">
											<Button
												variant="primary"
												size="sm"
												title="Review"
											>
												Review
											</Button>
											<Button
												variant="outline"
												size="sm"
												title="Delete"
											>
												Delete
											</Button>
										</td>
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
