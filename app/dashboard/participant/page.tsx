"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ParticipantDashboard() {

    const router = useRouter();
    useEffect(() => {
        const role = localStorage.getItem("role");
        console.log("ROLE IN DASHBOARD:", role);

        if (!role) return; // 👈 prevents instant glitch

        if (role !== "participant") {
            router.replace("/login");
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">


            {/* MAIN CONTENT */}
            <div className="flex-1 p-8">

                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Dashboard
                </h1>

                {/* CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div
                        onClick={() => router.push("/dashboard/participant/post-job")}
                        className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
                    >
                        <h2 className="text-lg font-semibold mb-2">Post a Job</h2>
                        <p className="text-gray-500">
                            Create and publish a new job
                        </p>
                    </div>

                    <div
                        onClick={() => router.push("/dashboard/participant/applications")}
                        className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
                    >
                        <h2 className="text-lg font-semibold mb-2">View Applications</h2>
                        <p className="text-gray-500">
                            See who applied to your jobs
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}