"use client";

import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen">

            <Sidebar open={open} />

            <div className="flex flex-col flex-1 lg:ml-64">

                <Navbar toggleSidebar={() => setOpen(!open)} />

                <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}