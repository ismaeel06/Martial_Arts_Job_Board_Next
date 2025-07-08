'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaClipboardList, FaUsers, FaMoneyBillWave, FaRegFileAlt, FaBell } from 'react-icons/fa';
import { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import store from '../../store';
import Image from 'next/image';
import { FaChartBar } from 'react-icons/fa';



export default function Sidebar() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const role = useSelector(state => state.role.value);

	const navItems = [
		{ name: 'Overview', href: '/dashboard', icon: <FaTachometerAlt className="text-xl" /> },

		...(role !== 'instructor' ? [
		{ name: role === 'school' ? 'Jobs Posted'  : 'Jobs', href: '/dashboard/jobs', icon: <FaClipboardList className="text-xl" /> }
		] : []),
		...(role === 'admin' ? [
			{ name: 'Subscriptions', href: '/dashboard/admin-subscriptions', icon: <FaMoneyBillWave className="text-xl" /> },
			{ name: 'Users', href: '/dashboard/users', icon: <FaMoneyBillWave className="text-xl" /> },
			//{ name: 'Reports', href: '/dashboard/admin-reports', icon: <FaChartBar className="text-xl" /> }
    
		] : []),
		
		{ name: role === 'instructor' ? 'My Applications' : role==='school' ? 'Applications Received' : 'Applications', href: role === 'instructor' ? '/dashboard/my-applications' : role==='school'? '/dashboard/admin-applications' : '/dashboard/admin-applications', icon: <FaRegFileAlt className="text-xl" /> },
		...(role === 'school' || role==='instructor' ? [
        { name: 'My Subscriptions', href: '/dashboard/school-subs', icon: <FaMoneyBillWave className="text-xl" /> }
    ] : []),
		...((role!=='school' && role!== 'instructor') ?[
			{ name: 'Payments', href: '/dashboard/payments', icon: <FaMoneyBillWave className="text-xl" /> },
	]: []),
];

	// Sidebar content as a separate component for reuse
	const SidebarContent = (
		<>
			{/* Modern top section with logo only */}
			<div className="flex flex-col items-center gap-2 px-8 py-10 border-b border-orange-300/40">
				<span className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-orange-400 overflow-hidden">
					<Image src="/Logo.png" alt="Logo" width={68} height={68}/>
				</span>
			</div>
			{/* Modern nav: single list, highlight active, no boxes */}
			<nav className="flex-1 flex flex-col gap-1 px-6 mt-6">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex items-center gap-3 py-2 px-2 rounded-lg font-semibold transition-colors duration-200 group 
                ${isActive ? 'bg-white/20 text-black shadow-sm' : 'text-white hover:bg-white/10 hover:text-black'}`}
							onClick={() => setOpen(false)} // close drawer on nav click
						>
							<span className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200 
                ${isActive ? 'bg-white/30 text-black' : 'bg-white/10 group-hover:bg-white/20 group-hover:text-black'}`}>{item.icon}</span>
							<span className="tracking-wide text-base">{item.name}</span>
						</Link>
					);
				})}
			</nav>
			{/* Modern bottom section */}
			<div className="mt-auto mb-8 px-8 flex flex-col items-center gap-2">
				<div className="w-12 h-1 rounded-full bg-white/20 mb-2" />
				<div className="text-xs text-white/80">Martial Arts Job Board</div>
				<button className="mt-4 p-2 rounded-lg text-[#D88A22] hover:bg-orange-100 transition-colors duration-200 md:block hidden" aria-label="Notifications">
					<FaBell className="text-xl text-[#D88A22]" />
				</button>
			</div>
		</>
	);

	// Hamburger for mobile (always visible on mobile, outside of Provider)
	const HamburgerButton = (
		<button
			className="fixed top-1 left-3 z-50 md:hidden flex items-center justify-center w-12 h-12 bg-transparent border-none p-0 focus:outline-none"
			onClick={() => setOpen(true)}
			aria-label="Open sidebar"
			style={{ boxShadow: 'none' }}
		>
			<span className="flex flex-col gap-1.5">
				<span className="block w-7 h-1 rounded bg-[#D88A22]" />
				<span className="block w-7 h-1 rounded bg-[#D88A22]" />
				<span className="block w-7 h-1 rounded bg-[#D88A22]" />
			</span>
		</button>
	);

	return (
		<Provider store={store}>
			<>
				{/* Hamburger for mobile */}
				{HamburgerButton}

				{/* Desktop sidebar */}
				<aside className="w-80 md:w-72 sm:w-60 md:min-w-72 sm:min-w-auto  min-h-screen hidden md:flex flex-col relative overflow-hidden bg-[#D88A22] shadow-2xl rounded-r-3xl border-r-4 border-orange-200 animate-fade-in">
					{SidebarContent}
				</aside>

				{/* Mobile drawer sidebar */}
				{open && (
					<div className="fixed inset-0 z-50 flex">
						{/* Overlay */}
						<div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setOpen(false)} />
						{/* Drawer */}
						<aside className="relative w-64 max-w-[80vw] min-h-screen bg-[#D88A22] shadow-2xl rounded-r-3xl border-r-4 border-orange-200 animate-slide-in flex flex-col">
							{/* Close button */}
							<button
								className="absolute top-4 right-4 text-white bg-black/20 rounded-full p-2 hover:bg-black/40 transition"
								onClick={() => setOpen(false)}
								aria-label="Close sidebar"
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
							{SidebarContent}
						</aside>
					</div>
				)}
			</>
		</Provider>
	);
}

// Add these animations to your global CSS (e.g., globals.css):
// .animate-slide-in { animation: slideInSidebar 0.3s cubic-bezier(0.4,0,0.2,1); }
// @keyframes slideInSidebar { from { transform: translateX(-100%); } to { transform: translateX(0); } }
// .animate-fade-in { animation: fadeInSidebar 0.4s cubic-bezier(0.4,0,0.2,1); }
// @keyframes fadeInSidebar { from { opacity: 0; } to { opacity: 1; } }
