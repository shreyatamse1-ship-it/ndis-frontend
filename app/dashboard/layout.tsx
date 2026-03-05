"use client"

import { useState } from "react"
import Sidebar from "../../components/layout/Sidebar"
import Navbar from "../../components/layout/Navbar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [open, setOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar open={open} setOpen={setOpen} />

            {/* Main Content */}
            <div className="lg:ml-64 flex flex-col min-h-screen">

                {/* Navbar */}
                <Navbar toggleSidebar={() => setOpen(!open)} />

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>

            </div>
        </div>
    )
}