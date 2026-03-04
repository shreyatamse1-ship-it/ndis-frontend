"use client";

import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar open={sidebarOpen} />
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 lg:ml-64">

                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}