"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BillingTabs() {

    const pathname = usePathname()

    const tabs = [
        { name: "My invoices", href: "/dashboard/billing" },
        { name: "Payments", href: "/dashboard/billing/payments" },
        { name: "Super", href: "/dashboard/billing/super" },
        { name: "Tax", href: "/dashboard/billing/tax" },
        { name: "Business income", href: "/dashboard/billing/business-income" },
        { name: "Exports", href: "/dashboard/billing/exports" },
    ]

    return (

        <div className="flex flex-wrap gap-6 border-b mb-8 text-sm font-medium">

            {tabs.map((tab) => {

                const active = pathname === tab.href

                return (
                    <Link
                        key={tab.name}
                        href={tab.href}
                        className={`pb-3 ${active
                                ? "text-purple-600 border-b-2 border-purple-600"
                                : "text-gray-600 hover:text-black"
                            }`}
                    >
                        {tab.name}
                    </Link>
                )

            })}

        </div>

    )
}