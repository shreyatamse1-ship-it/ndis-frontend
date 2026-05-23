"use client";

import { useEffect, useState } from "react";
import ParticipantSidebar from "../../../components/layout/ParticipantSidebar";

export default function ParticipantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [ready, setReady] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user) {
            window.location.href = "/login";
            return;
        }

        try {
            const parsed = JSON.parse(user);

            if (!parsed?.role) {
                localStorage.clear();
                window.location.href = "/login";
                return;
            }

            // ✅ ONLY allow participants
            if (parsed.role !== "participant") {
                window.location.href = "/dashboard";
                return;
            }

            setReady(true);

        } catch {
            localStorage.clear();
            window.location.href = "/login";
        }
    }, []);

    // ⛔ stop rendering until check is done
    if (!ready) return null;

    return (
        <div className="flex">
            <ParticipantSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className="flex-1 lg:ml-64 bg-gray-50 min-h-screen">
                {children}
            </div>
        </div>
    );
}