'use client';

import { FaUserTie, FaUsers, FaMoneyBillWave, FaClipboardList, FaRegFileAlt, FaFlag } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const getStatsByRole = (role) => {
	if (role === 'admin') {
		return [
			{
				label: 'Jobs',
				value: 42,
				icon: <FaClipboardList className="text-orange-500 text-4xl drop-shadow-lg" />,
				accent: 'bg-orange-100',
				shadow: 'shadow-[0_8px_32px_0_rgba(216,138,34,0.10)]',
				details: [
					{ label: 'Published', value: 30, color: 'bg-green-100 text-green-700' },
					{ label: 'Pending', value: 10, color: 'bg-yellow-100 text-yellow-700' },
					{ label: 'Closed', value: 2, color: 'bg-red-100 text-red-700' },
				],
			},
			{
				label: 'Users',
				value: 128,
				icon: <FaUsers className="text-black text-4xl drop-shadow-lg" />,
				accent: 'bg-black/10',
				shadow: 'shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]',
				details: [
					{ label: 'Instructors', value: 80, color: 'bg-orange-100 text-orange-700' },
					{ label: 'Employers', value: 40, color: 'bg-black/10 text-black' },
					{ label: 'Admins', value: 8, color: 'bg-gray-200 text-gray-700' },
				],
			},
			{
				label: 'Applications',
				value: 200,
				icon: <FaRegFileAlt className="text-orange-500 text-4xl drop-shadow-lg" />,
				accent: 'bg-orange-100',
				shadow: 'shadow-[0_8px_32px_0_rgba(216,138,34,0.10)]',
				details: [
					{ label: 'Pending', value: 50, color: 'bg-yellow-100 text-yellow-700' },
					{ label: 'Accepted', value: 120, color: 'bg-green-100 text-green-700' },
					{ label: 'Rejected', value: 30, color: 'bg-red-100 text-red-700' },
				],
			},
			{
				label: 'Payments',
				value: '$5,000',
				icon: <FaMoneyBillWave className="text-black text-4xl drop-shadow-lg" />,
				accent: 'bg-black/10',
				shadow: 'shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]',
				details: [
					{ label: 'Completed', value: 110, color: 'bg-green-100 text-green-700' },
					{ label: 'Pending', value: 8, color: 'bg-yellow-100 text-yellow-700' },
					{ label: 'Failed', value: 2, color: 'bg-red-100 text-red-700' },
				],
			},
			{
				label: 'Subscriptions',
				value: 25,
				icon: <FaUserTie className="text-orange-500 text-4xl drop-shadow-lg" />,
				accent: 'bg-orange-100',
				shadow: 'shadow-[0_8px_32px_0_rgba(216,138,34,0.10)]',
				details: [
					{ label: 'Active', value: 20, color: 'bg-green-100 text-green-700' },
					{ label: 'Expired', value: 5, color: 'bg-gray-200 text-gray-700' },
				],
			},
			{
				label: 'Reports',
				value: 3,
				icon: <FaFlag className="text-black text-4xl drop-shadow-lg" />,
				accent: 'bg-black/10',
				shadow: 'shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]',
				details: [
					{ label: 'Pending', value: 2, color: 'bg-yellow-100 text-yellow-700' },
					{ label: 'Resolved', value: 1, color: 'bg-green-100 text-green-700' },
				],
			},
		];
	}
	if (role === 'school') {
		return [
			{
				label: 'My Jobs',
				value: 8,
				icon: <FaClipboardList className="text-orange-500 text-4xl drop-shadow-lg" />,
				accent: 'bg-orange-100',
				shadow: 'shadow-[0_8px_32px_0_rgba(216,138,34,0.10)]',
				details: [
					{ label: 'Active', value: 5, color: 'bg-green-100 text-green-700' },
					{ label: 'Closed', value: 3, color: 'bg-red-100 text-red-700' },
				],
			},
			{
				label: 'Applications Received',
				value: 40,
				icon: <FaRegFileAlt className="text-orange-500 text-4xl drop-shadow-lg" />,
				accent: 'bg-orange-100',
				shadow: 'shadow-[0_8px_32px_0_rgba(216,138,34,0.10)]',
				details: [
					{ label: 'Pending', value: 10, color: 'bg-yellow-100 text-yellow-700' },
					{ label: 'Accepted', value: 25, color: 'bg-green-100 text-green-700' },
					{ label: 'Rejected', value: 5, color: 'bg-red-100 text-red-700' },
				],
			},
			{
				label: 'Payments',
				value: '$1,200',
				icon: <FaMoneyBillWave className="text-black text-4xl drop-shadow-lg" />,
				accent: 'bg-black/10',
				shadow: 'shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]',
				details: [
					{ label: 'Completed', value: 12, color: 'bg-green-100 text-green-700' },
					{ label: 'Pending', value: 2, color: 'bg-yellow-100 text-yellow-700' },
				],
			},
			{
				label: 'Active Subscriptions',
				value: 2,
				icon: <FaUserTie className="text-orange-500 text-4xl drop-shadow-lg" />,
				accent: 'bg-orange-100',
				shadow: 'shadow-[0_8px_32px_0_rgba(216,138,34,0.10)]',
				details: [
					{ label: 'Active', value: 2, color: 'bg-green-100 text-green-700' },
				],
			},
		];
	}
	if (role === 'instructor') {
		return [
			{
				label: 'My Applications',
				value: 12,
				icon: <FaRegFileAlt className="text-orange-500 text-4xl drop-shadow-lg" />,
				accent: 'bg-orange-100',
				shadow: 'shadow-[0_8px_32px_0_rgba(216,138,34,0.10)]',
				details: [
					{ label: 'Pending', value: 3, color: 'bg-yellow-100 text-yellow-700' },
					{ label: 'Accepted', value: 7, color: 'bg-green-100 text-green-700' },
					{ label: 'Rejected', value: 2, color: 'bg-red-100 text-red-700' },
				],
			},
			{
				label: 'Jobs Available',
				value: 25,
				icon: <FaClipboardList className="text-orange-500 text-4xl drop-shadow-lg" />,
				accent: 'bg-orange-100',
				shadow: 'shadow-[0_8px_32px_0_rgba(216,138,34,0.10)]',
				details: [
					{ label: 'Full-Time', value: 10, color: 'bg-green-100 text-green-700' },
					{ label: 'Part-Time', value: 15, color: 'bg-yellow-100 text-yellow-700' },
				],
			},
			{
				label: 'Payments',
				value: '$800',
				icon: <FaMoneyBillWave className="text-black text-4xl drop-shadow-lg" />,
				accent: 'bg-black/10',
				shadow: 'shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]',
				details: [
					{ label: 'Received', value: 8, color: 'bg-green-100 text-green-700' },
				],
			},
		];
	}
	return [];
};

export default function OverviewCards() {
	const role = useSelector(state => state.role.value);
	const stats = getStatsByRole(role);
	return (
		<div className="relative py-4">
			<div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
				{stats.map((stat, i) => (
					<div
						key={stat.label}
						className={`relative overflow-hidden rounded-2xl border border-orange-200 backdrop-blur-xl bg-white/90 ${stat.shadow} p-8 flex flex-col items-center justify-center min-h-[200px] group animate-fade-in transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl`}
						style={{ animationDelay: `${i * 80}ms` }}
					>
						{/* Martial arts belt accent */}
						<div className={`absolute left-0 bottom-0 w-full h-4 ${stat.accent} opacity-80 z-10 rounded-b-2xl`} />
						{/* Floating icon */}
						<div className="relative z-20 mb-3 group-hover:-translate-y-1 transition-transform duration-300">
							{stat.icon}
						</div>
						<div className="text-4xl font-extrabold text-black mb-1 tracking-tight drop-shadow-lg relative z-20">
							{stat.value}
						</div>
						<div className="text-orange-500 font-semibold mb-1 text-lg tracking-wide uppercase relative z-20">
							{stat.label}
						</div>
						<div className="flex flex-wrap gap-2 justify-center mt-2 relative z-20">
							{stat.details.map((detail) => (
								<span key={detail.label} className={`px-2 py-1 rounded-full text-xs font-semibold ${detail.color} border border-black/10`}>
									{detail.label}: {detail.value}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
			<style jsx>{`
				.animate-fade-in {
					animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
				}
			`}</style>
		</div>
	);
}
