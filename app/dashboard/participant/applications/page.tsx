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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Applications</h1>

            {applications.length === 0 ? (
                <p>No applications found</p>
            ) : (
                applications.map((app) => (
                    <div
                        key={app.id}
                        className="bg-white p-5 rounded-xl shadow mb-4 border"
                    >
                        <p className="text-sm text-gray-500">Worker</p>
                        <p className="font-semibold text-gray-800">
                            {app.worker_email}
                        </p>

                        <p className="text-sm text-gray-500 mt-3">Job</p>
                        <p className="font-semibold text-gray-800">
                            {app.job_title}
                        </p>

                        <p className="mt-3">
                            <span className="font-medium">Status: </span>
                            <span
                                className={
                                    app.status === "accepted"
                                        ? "text-green-600 font-semibold"
                                        : app.status === "rejected"
                                            ? "text-red-600 font-semibold"
                                            : "text-yellow-600 font-semibold"
                                }
                            >
                                {app.status}
                            </span>
                        </p>

                        {app.status === "pending" && (
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() =>
                                        updateStatus(app.id, "accepted")
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Accept
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(app.id, "rejected")
                                    }
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}