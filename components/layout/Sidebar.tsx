"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Pencil,
    LayoutDashboard,
    Calendar,
    Briefcase,
    Users,
    Clock,
    Inbox,
    CreditCard,
    User,
    Settings
} from "lucide-react"

type SidebarProps = {
    open: boolean
    setOpen: (value: boolean) => void
}

export default function Sidebar({ open, setOpen }: SidebarProps) {

    const pathname = usePathname()

    const menu = [
        { name: "Edit profile", href: "/dashboard/edit-profile", icon: Pencil },
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Manage sessions", href: "/dashboard/sessions", icon: Calendar },
        { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
        { name: "Manage clients", href: "/dashboard/clients", icon: Users },
        { name: "Support hours", href: "/dashboard/support", icon: Clock },
        { name: "Inbox", href: "/dashboard/inbox", icon: Inbox },
        { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
        { name: "My clients", href: "/dashboard/myclients", icon: User },
        { name: "Account", href: "/dashboard/account", icon: Settings },
    ]


    return (
        <>
            {/* Mobile overlay */}
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

                {/* Header */}
                <div className="p-6 font-semibold text-lg border-b border-white/20">
                    Edit profile
                </div>

                {/* Menu */}
                <nav className="flex flex-col gap-2 p-4">

                    {menu.map((item) => {

                        const Icon = item.icon
                        const active = pathname === item.href

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-md transition
                ${active
                                        ? "bg-white/20"
                                        : "hover:bg-white/10"}
                `}
                            >

                                <Icon size={18} />
                                {item.name}

                            </Link>
                        )
                    })}

                    <div className="border-t border-white/20 p-4 flex flex-col gap-3 text-sm">

                        <a
                            href="#"
                            className="flex justify-between items-center hover:text-gray-200"
                        >
                            Help
                            <span>›</span>
                        </a>

                        <a
                            href="#"
                            className="flex justify-between items-center hover:text-gray-200"
                        >
                            About us
                            <span>›</span>
                        </a>

                        <a
                            href="#"
                            className="flex justify-between items-center hover:text-gray-200"
                        >
                            Search workers
                            <span>›</span>
                        </a>

                    </div>

                </nav>

            </aside>
        </>
    )
}