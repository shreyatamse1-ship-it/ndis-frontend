"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Home,
    Calendar,
    Briefcase,
    Users,
    Clock,
    Mail,
    DollarSign,
    User,
    Settings,
} from "lucide-react";

export default function Sidebar({ open }: { open?: boolean }) {
    return (
        <aside
            className={`
  fixed top-0 left-0 z-50
  h-full w-64
  bg-[var(--sidebar-bg)]
  text-white
  transform transition-transform duration-300 ease-in-out
  ${open ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0
`}
        >

            {/* Badge Card */}
            <div className="p-4">

                <div className="bg-white/10 rounded-lg p-4">

                    <div className="flex justify-between items-center">
                        <p className="font-medium">Badge</p>
                        <span>-</span>
                    </div>

                    <p className="text-sm text-teal-300 mt-2">
                        Learn about badges
                    </p>

                </div>

                {/* Edit profile */}
                <div className="flex items-center gap-2 mt-4 text-white/80">
                    ✏️ Edit profile
                </div>

            </div>

            <div className="border-t border-white/10 my-3"></div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 px-4">

                <SidebarItem icon={<Home size={18} />} label="Dashboard" href="/dashboard" />

                <SidebarItem icon={<Calendar size={18} />} label="Manage sessions" href="/sessions" />

                <SidebarItem icon={<Briefcase size={18} />} label="Jobs" href="/jobs" />

                <SidebarItem icon={<Users size={18} />} label="Manage clients" href="/clients" />

                <SidebarItem icon={<Clock size={18} />} label="Support hours" href="/hours" />

                <SidebarItem icon={<Mail size={18} />} label="Inbox" href="/inbox" />

                <SidebarItem icon={<DollarSign size={18} />} label="Billing" href="/billing" />

                <SidebarItem icon={<User size={18} />} label="My clients" href="/my-clients" />

                <SidebarItem icon={<Settings size={18} />} label="Account" href="/account" />
                <div className="border-t border-blue-200 my-6"></div>
                <div className="flex flex-col gap-4 text-sm px-4">

                    <button className="flex items-center justify-between text-white/80 hover:bg-white/20 text-white font-medium">
                        Help
                        <span>›</span>
                    </button>

                    <button className="flex items-center justify-between text-white/80 hover:bg-white/20 text-white font-medium">
                        About us
                        <span>›</span>
                    </button>

                    <button className="flex items-center justify-between text-white/80 hover:bg-white/20 text-white font-medium">
                        Search workers
                        <span>›</span>
                    </button>

                </div>
            </nav>

        </aside>
    );
}

function SidebarItem({
    icon,
    label,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    href: string;
}) {

    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition cursor-pointer
        ${isActive
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/80 hover:bg-[var(--sidebar-hover)]"
                }`}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
}