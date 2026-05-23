"use client";

import { useEffect, useState } from "react";

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([]);

    useEffect(() => {
        const userString = localStorage.getItem("user");

        if (!userString) return;

        const user = JSON.parse(userString);
        console.log("USER FROM STORAGE:", user);
        console.log("USER ID BEING USED:", user.id, user.user_id);

        const userId = user.id || user.user_id;

        console.log("FINAL USER ID:", userId);

        fetch(`http://localhost/ndis-backend/controllers/get_application.php?user_id=${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("APPLICATION DATA:", data);
                setApplications(data.applications || []);
            });
    }, []);

    const updateStatus = async (id: number, status: string) => {
        const res = await fetch(
            "http://localhost/ndis-backend/controllers/update_application_status.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, status }),
            }
        );

        const data = await res.json();

        if (data.success) {
            alert("Updated!");
            // refresh list
            setApplications((prev) =>
                prev.map((app) =>
                    app.id == id ? { ...app, status } : app
                )
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-8 py-6 space-y-8">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Your Applications
                    </h1>
                    <p className="text-gray-600">
                        View and manage all your job applications
                    </p>
                </div>

                {/* APPLICATIONS LIST */}
                {applications.length === 0 ? (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <p className="text-gray-600 text-base">
                            No applications yet. Start applying to jobs!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div
                                key={app.id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
                            >
                                <div className="space-y-4">
                                    {/* Worker Info */}
                                    <div className="pb-4 border-b border-gray-100">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                            Worker
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {app.worker_email}
                                        </p>
                                    </div>

                                    {/* Job Info */}
                                    <div className="pb-4 border-b border-gray-100">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                            Job Title
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {app.job_title}
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-700">
                                            Status:
                                        </span>
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${app.status === "accepted"
                                                    ? "bg-green-100 text-green-800"
                                                    : app.status === "rejected"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {app.status.charAt(0).toUpperCase() +
                                                app.status.slice(1)}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    {app.status === "pending" && (
                                        <div className="mt-6 flex gap-3 pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() =>
                                                    updateStatus(app.id, "accepted")
                                                }
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition"
                                            >
                                                Accept
                                            </button>

                                            <button
                                                onClick={() =>
                                                    updateStatus(app.id, "rejected")
                                                }
                                                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}