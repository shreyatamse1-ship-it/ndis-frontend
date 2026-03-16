"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../../components/layout/Sidebar"
import Navbar from "../../components/layout/Navbar"
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const router = useRouter()

    const [open, setOpen] = useState(false)
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn")

        if (!isLoggedIn) {
            router.push("/login")
        }
    }, [])

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar open={open} setOpen={setOpen} />

            {/* Main Section */}
            <div className="flex flex-col flex-1 w-full lg:ml-64">

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