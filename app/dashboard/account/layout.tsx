"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AccountLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname()

    const tabClass = (path: string) =>
        `pb-2 ${pathname === path
            ? "text-purple-600 border-b-2 border-purple-600"
            : "text-gray-600 hover:text-black"
        }`

    return (
        <div className="w-full px-6 py-8">

            <h1 className="text-3xl font-semibold mb-8">
                Account Settings
            </h1>

            {/* Tabs */}
            <div className="flex flex-wrap gap-6 border-b pb-3 mb-8 text-sm font-medium">

                <Link href="/dashboard/account" className={tabClass("/dashboard/account")}>
                    Username & password
                </Link>

                <Link href="/dashboard/account/address" className={tabClass("/dashboard/account/address")}>
                    Address
                </Link>

                <Link
                    href="/dashboard/account/phone-sms-notifications"
                    className={tabClass("/dashboard/account/phone-sms-notifications")}
                >
                    Phone & SMS notifications
                </Link>

                <Link
                    href="/dashboard/account/emergency-contacts"
                    className={tabClass("/dashboard/account/emergency-contacts")}
                >
                    Emergency contacts
                </Link>

                <Link
                    href="/dashboard/account/email-alerts"
                    className={tabClass("/dashboard/account/email-alerts")}
                >
                    Email alerts
                </Link>

            </div>

            {children}

        </div>
    )
}