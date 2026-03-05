"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
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
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ open, setOpen }: SidebarProps) {

    const pathname = usePathname()

    const menu = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Manage sessions", href: "/dashboard/manage-sessions", icon: Calendar },
        { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
        { name: "Manage clients", href: "/dashboard/manage-clients", icon: Users },
        { name: "Support hours", href: "/dashboard/support-hours", icon: Clock },
        { name: "Inbox", href: "/dashboard/inbox", icon: Inbox },
        { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
        { name: "My clients", href: "/dashboard/my-clients", icon: User },
        { name: "Account", href: "/dashboard/account", icon: Settings },
    ]

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
        fixed top-0 left-0
        h-screen w-64
        bg-[#405189] text-white
        z-40
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
            >

                <div className="p-6 font-semibold text-lg border-b border-white/20">
                    Edit profile
                </div>

                <nav className="flex flex-col gap-2 p-4">

                    {menu.map((item) => {

                        const Icon = item.icon
                        const active = pathname === item.href

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                flex items-center gap-3
                px-4 py-2 rounded-md
                transition-all duration-200

                ${active
                                        ? "bg-white/20 shadow-md"
                                        : "hover:bg-white/10 hover:shadow-md"
                                    }
                `}
                            >
                                <Icon size={18} />
                                {item.name}
                            </Link>
                        )
                    })}

                </nav>

            </aside>
        </>
    )
}