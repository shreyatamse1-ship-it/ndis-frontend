"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Sidebar from "../../components/layout/Sidebar"
import Navbar from "../../components/layout/Navbar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const router = useRouter()
    const pathname = usePathname()
    const isParticipantRoute = pathname?.startsWith("/dashboard/participant")

    const [open, setOpen] = useState(false)
    const [ready, setReady] = useState(false) // 🔥 IMPORTANT

    useEffect(() => {
        const user = localStorage.getItem("user")

        if (!user) {
            window.location.href = "/login" // 🔥 HARD REDIRECT
            return
        }

        try {
            const parsed = JSON.parse(user)

            if (!parsed?.role) {
                localStorage.clear()
                window.location.href = "/login"
                return
            }

            setReady(true) // ✅ ONLY NOW render UI

        } catch {
            localStorage.clear()
            window.location.href = "/login"
        }
    }, [])

    if (isParticipantRoute) {
        return <>{children}</>
    }

    // 🚫 BLOCK UI UNTIL AUTH IS READY
    if (!ready) return null

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar open={open} setOpen={setOpen} />

            <div className="flex flex-col flex-1 w-full lg:ml-64">

                <Navbar toggleSidebar={() => setOpen(!open)} />

                <main className="flex-1 p-6">
                    {children}
                </main>

            </div>

        </div>
    )
}