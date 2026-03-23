"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TestimonialSection from "../../components/common/TestimonialSection";
import { userData, testimonials } from "../data/dashboardData";

export default function DashboardPage() {
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const router = useRouter();

    const [name, setName] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const status = localStorage.getItem("profileComplete");

        setName(
            user.name ||
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            "User"
        );

        if (status !== "true") {
            router.push("/dashboard/setup-account");
        } else {
            setIsProfileComplete(true);
        }
    }, [router]);

    return (
        <div className="space-y-10 w-full max-w-7xl mx-auto pb-10">

            {/* TOP SECTION */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
                <div>
                    <h1 className="text-4xl font-bold">Dashboard</h1>

                    <h2 className="text-2xl mt-2">
                        Welcome, {name || "User"}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Let's get you started to find jobs and build a network of clients.
                    </p>

                    {/* ✅ ONLY SHOW WHEN NOT COMPLETE */}
                    {!isProfileComplete && (
                        <Link href="/dashboard/setup-account">
                            <button className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg">
                                Set up your account
                            </button>
                        </Link>
                    )}

                    {/* ✅ SHOW WHEN COMPLETE */}
                    {isProfileComplete && (
                        <p className="mt-4 text-green-600 font-medium">
                            Profile setup complete
                        </p>
                    )}
                </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

                <ul className="space-y-2 text-gray-600">
                    {userData.recentActivity.map((item, index) => (
                        <li key={index}>✔ {item}</li>
                    ))}
                </ul>
            </div>

            {/* UPCOMING SESSIONS */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>

                <div className="grid grid-cols-2 gap-6">
                    {userData.upcomingSessions.map((session, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-xl shadow"
                        >
                            <p><strong>Client:</strong> {session.client}</p>
                            <p><strong>Date:</strong> {session.date}</p>
                            <p><strong>Time:</strong> {session.time}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* TESTIMONIALS */}
            <TestimonialSection data={testimonials} />

        </div>
    );
}