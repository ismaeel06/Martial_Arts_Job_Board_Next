'use client';

import React, { useState } from "react";
import Button from "../ui/Button";
import { useSelector } from 'react-redux';

// Example user data (replace with backend data integration)
const users = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		role: "Instructor",
		status: "Active",
		joined: "2024-01-15",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		role: "Employer",
		status: "Pending",
		joined: "2024-03-22",
	},
	{
		id: 3,
		name: "Bruce Lee",
		email: "bruce@martial.com",
		role: "Instructor",
		status: "Active",
		joined: "2024-02-10",
	},
];

const statusColors = {
	Active: "bg-green-100 text-green-700 border-green-400",
	Pending: "bg-yellow-100 text-yellow-700 border-yellow-400",
	Inactive: "bg-gray-100 text-gray-700 border-gray-300",
};

export default function UserTable() {
	const role = useSelector(state => state.role.value);
	const [search, setSearch] = useState('');
	const currentUserId = null; // Replace with actual user ID from Redux or props if needed

	// role: 'admin', 'school', 'instructor'
	// currentUserId: for instructor to filter their own profile

	const columnsByRole = {
		admin: [
			{ key: 'name', label: 'Name' },
			{ key: 'email', label: 'Email' },
			{ key: 'role', label: 'Role' },
			{ key: 'joined', label: 'Joined' },
			{ key: 'actions', label: 'Actions', align: 'center' },
		],
		school: [
			{ key: 'name', label: 'Name' },
			{ key: 'email', label: 'Email' },
			{ key: 'status', label: 'Status' },
			{ key: 'joined', label: 'Joined' },
			{ key: 'actions', label: 'Actions', align: 'center' },
		],
		instructor: [
			{ key: 'name', label: 'Name' },
			{ key: 'email', label: 'Email' },
			{ key: 'status', label: 'Status' },
			{ key: 'joined', label: 'Joined' },
		],
	};

	let usersToShow = users;
	if (role === 'school') {
		// Show only instructors and staff (for demo, filter instructors)
		usersToShow = users.filter(u => u.role === 'Instructor' || u.role === 'Staff');
	}
	if (role === 'instructor' && currentUserId) {
		usersToShow = users.filter(u => u.id === currentUserId);
	}

	// Filter users by search (all roles)
	const filteredUsers = usersToShow.filter(user =>
		Object.values(user).some(val =>
			String(val).toLowerCase().includes(search.toLowerCase())
		)
	);

	const columns = columnsByRole[role] || columnsByRole.admin;

	return (
		<div className="w-full overflow-x-auto">
			<div className="min-w-[600px]">
				{(
					<div className="mb-4 flex items-center">
						<input
							type="text"
							placeholder="Search users..."
							value={search}
							onChange={e => setSearch(e.target.value)}
							className="dashboard-search px-4 py-2 border rounded-lg shadow focus:outline-none w-full max-w-xs"
						/>
					</div>
				)}
				<div className="overflow-x-auto rounded-2xl shadow-xl bg-white/95 animate-fade-in border border-orange-200">
					<table className="min-w-full text-sm">
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
							{filteredUsers.map((user, i) => (
								<tr
									key={user.id}
									className="group transition-all duration-300 bg-white hover:bg-orange-50 border-b border-orange-100 shadow-sm hover:shadow-lg rounded-2xl animate-fade-in"
									style={{ animationDelay: `${i * 60}ms` }}
								>
									{columns.map((col) => {
										if (col.key === 'name') {
											return (
												<td key={col.key} className="px-6 py-4 flex items-center gap-3">
													<span className="w-9 h-9 bg-orange-200 rounded-full flex items-center justify-center font-bold text-orange-700 border-2 border-orange-400 shadow">
														{user.name.charAt(0)}
													</span>
													<span className="font-semibold text-black">{user.name}</span>
												</td>
											);
										}
										if (col.key === 'role') {
											return (
												<td key={col.key} className="px-6 py-4">
													<span
														className={`px-3 py-1 rounded-full text-xs font-semibold ${
															user.role === 'Instructor'
																? 'bg-orange-100 text-orange-700 border border-orange-400'
																: 'bg-black text-white border border-black'
														}`}
													>
														{user.role}
													</span>
												</td>
											);
										}
										if (col.key === 'status') {
											return (
												<td key={col.key} className="px-6 py-4">
													<span
														className={`px-3 py-1 rounded-full text-xs font-semibold border ${
															statusColors[user.status] ||
															'bg-gray-100 text-gray-700 border-gray-300'
														}`}
													>
														{user.status}
													</span>
												</td>
											);
										}
										if (col.key === 'actions') {
											return (
												<td key={col.key} className="px-6 py-4 text-center flex gap-2 ">
													<Button
														variant="primary"
														size="sm"
														title="View User"
														className="mr-2 min-w-[90px]"
													>
														<span className="material-icons align-middle text-base">view</span>
													</Button>
													<Button variant="outline" size="sm" title="Delete User" className="min-w-[90px]">
														<span className="material-icons align-middle text-base">delete</span>
													</Button>
												</td>
											);
										}
										return (
											<td key={col.key} className="px-6 py-4 text-black">
												{user[col.key]}
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
	);
}
