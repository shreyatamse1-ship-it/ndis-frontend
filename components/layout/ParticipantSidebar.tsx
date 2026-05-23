"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Users, Settings, Inbox } from "lucide-react";
import router from "next/router";

type ParticipantSidebarProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

export default function ParticipantSidebar({ open, setOpen }: ParticipantSidebarProps) {
    const pathname = usePathname();

    const participantMenu = [
        { name: "Dashboard", href: "/dashboard/participant", icon: LayoutDashboard },
        { name: "Post Job", href: "/dashboard/participant/post-job", icon: Briefcase },
        { name: "Search Workers", href: "/dashboard/participant/search-workers", icon: Users },
        { name: "Applications", href: "/dashboard/participant/applications", icon: Users },
        { name: "Messages", href: "/dashboard/participant/messages", icon: Inbox },
        { name: "Account", href: "/dashboard/account", icon: Settings },
    ];

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={`
        fixed top-0 left-0 h-full w-64
        bg-[#405189] text-white
        transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
            >
                <div className="p-6 font-semibold text-lg border-b border-white/20">
                    Participant
                </div>

                <nav className="flex flex-col gap-2 p-4">
                    {participantMenu.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href || pathname.startsWith(item.href + "/");

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-md transition
                ${active ? "bg-white/20" : "hover:bg-white/10"}
                `}
                                onClick={() => setOpen(false)}
                            >
                                <Icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}

                    <div className="border-t border-white/20 p-4 flex flex-col gap-3 text-sm">
                        <a href="#" className="flex justify-between items-center hover:text-gray-200">
                            Help <span>›</span>
                        </a>

                        <a href="#" className="flex justify-between items-center hover:text-gray-200">
                            About us <span>›</span>
                        </a>


                    </div>
                </nav>
            </aside>
        </>
    );
}