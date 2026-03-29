"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function JobDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [applied, setApplied] = useState(false);

    const [job, setJob] = useState<any>(null);


    useEffect(() => {
        fetch(`http://localhost/ndis-backend/controllers/jobs.php?id=${id}`)
            .then(res => res.json())
            .then(data => setJob(data));
    }, [id]);



    const handleApply = async () => {
        console.log("JOB ID:", id);
        try {
            const userString = localStorage.getItem("user");

            if (!userString) {
                alert("User not logged in");
                return;
            }

            const user = JSON.parse(userString);

            const res = await fetch(
                "http://localhost/ndis-backend/controllers/apply.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        job_id: Number(id),
                        user_id: user.id, // ✅ CORRECT FIX
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                setApplied(true);
                alert("Applied successfully");
            } else {
                alert(data.message || "Failed to apply");
            }
        } catch (err) {
            console.error(err);
        }
    };


    if (!job) return <p className="p-6">Loading...</p>;
    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">

                {/* BACK */}
                <button
                    onClick={() => router.back()}
                    className="text-teal-600 font-medium hover:underline"
                >
                    ← Back to jobs
                </button>

                {/* TITLE */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {job.title}
                </h1>

                {/* INFO CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="bg-teal-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold">{job.suburb} {job.postcode}</p>
                    </div>

                    <div className="bg-teal-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Hours</p>
                        <p className="font-semibold">{job.hours_range} hrs/week</p>
                    </div>

                    <div className="bg-teal-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Service</p>
                        <p className="font-semibold">{job.service}</p>
                    </div>

                </div>

                {/* DESCRIPTION */}
                <div className="bg-gray-50 p-5 rounded-lg">
                    <h2 className="font-semibold text-lg mb-2">Job Description</h2>
                    <p className="text-gray-700 leading-relaxed">
                        {job.description}
                    </p>
                </div>

                {/* APPLY BUTTON */}
                <button onClick={handleApply}
                    disabled={applied}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02]"
                >
                    {applied ? "Applied " : "Apply"}
                </button>
            </div>
        </div>
    );
}