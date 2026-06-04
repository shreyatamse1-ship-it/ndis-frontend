"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "";

export default function DashboardPage() {
    const [isReady, setIsReady] = useState(false);
    const [name, setName] = useState("");
    const [stats, setStats] = useState({
        totalJobs: 0,
        totalApplications: 0
    });

    const router = useRouter();

    useEffect(() => {
        const rawUser = localStorage.getItem("user");
        const role = localStorage.getItem("role");
        const userId = localStorage.getItem("user_id");
        const status = localStorage.getItem("profileComplete");

        if (!rawUser || !role) {
            window.location.href = "/login";
            return;
        }

        const user = JSON.parse(rawUser || "{}");

        setName(
            user.name ||
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            "User"
        );

        if (role === "participant") {
            router.replace("/dashboard/participant");
            return;
        }

        if (role !== "support_worker") {
            router.replace("/login");
            return;
        }

        if (status !== "true") {
            router.replace("/dashboard/setup-account");
            return;
        }

        setIsReady(true);

        fetch(`${apiBaseUrl}/ndis-backend/controllers/getWorkerStats.php?user_id=${userId}`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));
    }, [router]);

    if (!isReady) return null;


    return (
        <div className="space-y-10 w-full max-w-7xl mx-auto pb-10">

            {/* HEADER */}
            <div>
                <h1 className="text-4xl font-bold">Dashboard</h1>

                <h2 className="text-2xl mt-2">
                    Welcome, {name}
                </h2>

                <p className="text-gray-500 mt-2">
                    Manage your jobs and applications efficiently.
                </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold">Total Jobs</h3>
                    <p className="text-3xl mt-2">{stats.totalJobs}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold">Applications</h3>
                    <p className="text-3xl mt-2">{stats.totalApplications}</p>
                </div>

            </div>

        </div>
    );
}