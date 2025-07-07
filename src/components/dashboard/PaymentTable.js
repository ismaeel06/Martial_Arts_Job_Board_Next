'use client';

import React, { useState } from "react";
import Button from "../ui/Button";
import { useSelector } from 'react-redux';

// Mock data for payments
const payments = [
	{
		id: "pay_001",
		user: {
			name: "John Doe",
			avatar: "/logo.svg",
			type: "Employer",
		},
		amount: 99.99,
		status: "Completed",
		date: "2024-06-01",
		method: "Credit Card",
		job: "Karate Instructor",
	},
	{
		id: "pay_002",
		user: {
			name: "Jane Smith",
			avatar: "/logo.svg",
			type: "Instructor",
		},
		amount: 49.99,
		status: "Pending",
		date: "2024-06-02",
		method: "PayPal",
		job: "Judo Coach",
	},
	// ...more mock payments
];

const statusColors = {
	Completed: "bg-green-100 text-green-700 border-green-400",
	Pending: "bg-yellow-100 text-yellow-700 border-yellow-400",
	Failed: "bg-red-100 text-red-700 border-red-400",
};

export default function PaymentTable() {
	const role = useSelector(state => state.role.value);
	const [search, setSearch] = useState('');
	const currentUserName = null; // Replace with actual user name from Redux state if available

	const columnsByRole = {
		admin: [
			{ key: "user", label: "User" },
			{ key: "type", label: "Type" },
			{ key: "job", label: "Job" },
			{ key: "amount", label: "Amount" },
			{ key: "status", label: "Status" },
			{ key: "date", label: "Date" },
			{ key: "method", label: "Method" },
			{ key: "actions", label: "Actions" },
		],
		school: [
			{ key: "job", label: "Job" },
			{ key: "amount", label: "Amount" },
			{ key: "status", label: "Status" },
			{ key: "date", label: "Date" },
			{ key: "method", label: "Method" },
		],
		instructor: [
			{ key: "job", label: "Job" },
			{ key: "amount", label: "Amount" },
			{ key: "status", label: "Status" },
			{ key: "date", label: "Date" },
			{ key: "method", label: "Method" },
		],
	};

	let paymentsToShow = payments;
	if (role === "school" && currentUserName) {
		paymentsToShow = payments.filter(
			(p) => p.user.name === currentUserName && p.user.type === "Employer"
		);
	}
	if (role === "instructor" && currentUserName) {
		paymentsToShow = payments.filter(
			(p) => p.user.name === currentUserName && p.user.type === "Instructor"
		);
	}

	// Filter payments by search (all roles)
	const filteredPayments = paymentsToShow.filter(payment =>
		Object.values(payment).some(val =>
			(typeof val === 'object' ? Object.values(val).join(' ') : String(val)).toLowerCase().includes(search.toLowerCase())
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
							placeholder="Search payments..."
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
										className={`px-6 py-4 font-bold ${idx === 0 ? "rounded-tl-2xl" : ""} ${idx === columns.length - 1 ? "rounded-tr-2xl" : ""}`}
									>
										{col.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{filteredPayments.map((payment, i) => (
								<tr
									key={payment.id}
									className="group transition-all duration-300 bg-white hover:bg-orange-50 border-b border-orange-100 shadow-sm hover:shadow-lg rounded-2xl animate-fade-in"
									style={{ animationDelay: `${i * 60}ms` }}
								>
									{columns.map((col) => {
										if (col.key === "user") {
											return (
												<td
													key={col.key}
													className="flex items-center gap-3 px-6 py-4"
												>
													<image
														src={payment.user.avatar}
														alt={payment.user.name}
														className="w-9 h-9 rounded-full border-2 border-orange-400 shadow"
													/>
													<span className="font-semibold text-black">
														{payment.user.name}
													</span>
												</td>
											);
										}
										if (col.key === "type") {
											return (
												<td key={col.key} className="px-6 py-4">
													<span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-400">
														{payment.user.type}
													</span>
												</td>
											);
										}
										if (col.key === "amount") {
											return (
												<td
													key={col.key}
													className="px-6 py-4 font-semibold text-orange-500"
												>
													${payment.amount.toFixed(2)}
												</td>
											);
										}
										if (col.key === "status") {
											return (
												<td key={col.key} className="px-6 py-4">
													<span
														className={`px-3 py-1 rounded-full text-xs font-semibold border ${
															statusColors[payment.status] ||
															"bg-gray-100 text-gray-700 border-gray-300"
														}`}
													>
														{payment.status}
													</span>
												</td>
											);
										}
										if (col.key === "actions") {
											return (
												<td key={col.key} className="px-6 py-4 text-center">
													<Button
														variant="primary"
														size="sm"
														title="View Payment"
													>
														View
													</Button>
												</td>
											);
										}
										return (
											<td key={col.key} className="px-6 py-4">
												{col.key === "job"
													? payment.job
													: payment[col.key] || ""}
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
