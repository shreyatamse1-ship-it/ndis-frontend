"use client";

import { useState } from "react";
import Link from "next/link";

export default function JobsPage() {
    const [activeDropdown, setActiveDropdown] = useState("");

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? "" : name);
    };

    return (
        <div className="p-6 space-y-6">

            {/* DASHBOARD CARDS */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500">Total Jobs</p>
                    <h2 className="text-2xl font-bold">119</h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500">Active Jobs</p>
                    <h2 className="text-2xl font-bold">42</h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500">Applications</p>
                    <h2 className="text-2xl font-bold">892</h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500">Candidates</p>
                    <h2 className="text-2xl font-bold">310</h2>
                </div>

            </div>


            {/* SEARCH CARD */}

            <div className="bg-white rounded-xl shadow p-6">

                <h3 className="font-semibold mb-4">Suburb or postcode</h3>

                <div className="flex gap-3 mb-3">
                    <input
                        className="border rounded-lg p-3 flex-1"
                        placeholder="Where would you like to work?"
                    />

                    <button className="bg-teal-500 text-white px-6 rounded-lg">
                        Search
                    </button>
                </div>

                <label className="flex gap-2 mb-4">
                    <input type="checkbox" defaultChecked />
                    Include nearby suburbs
                </label>


                {/* FILTER BUTTONS */}

                <div className="flex flex-wrap gap-3">

                    <button
                        onClick={() => toggleDropdown("services")}
                        className="border px-4 py-2 rounded-lg"
                    >
                        Services
                    </button>

                    <button
                        onClick={() => toggleDropdown("days")}
                        className="border px-4 py-2 rounded-lg"
                    >
                        Days
                    </button>

                    <button
                        onClick={() => toggleDropdown("hours")}
                        className="border px-4 py-2 rounded-lg"
                    >
                        Hours per week
                    </button>


                    {/* THIS IS THE IMPORTANT FIX */}

                    <Link href="/dashboard/jobs/all-filters">
                        <button className="border px-4 py-2 rounded-lg">
                            All filters
                        </button>
                    </Link>

                </div>

            </div>


            {/* SERVICES DROPDOWN */}

            {activeDropdown === "services" && (
                <div className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-3">

                    {[
                        "Companionship and social support",
                        "Transportation",
                        "Light housework",
                        "Personal admin and home maintenance",
                        "Manual transfer and mobility",
                        "Assistance with eating",
                        "Nursing services",
                        "Occupational therapy",
                        "Speech pathology",
                        "Community participation",
                        "Meal delivery and shopping",
                        "Light gardening",
                        "Showering and dressing",
                        "Assistance with medication",
                    ].map((service) => (
                        <label key={service} className="flex gap-2">
                            <input type="checkbox" />
                            {service}
                        </label>
                    ))}

                </div>
            )}


            {/* DAYS DROPDOWN */}

            {activeDropdown === "days" && (
                <div className="bg-white rounded-xl shadow p-6 grid grid-cols-2 md:grid-cols-4 gap-3">

                    {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                    ].map((day) => (
                        <label key={day} className="flex gap-2">
                            <input type="checkbox" />
                            {day}
                        </label>
                    ))}

                </div>
            )}


            {/* HOURS DROPDOWN */}

            {activeDropdown === "hours" && (
                <div className="bg-white rounded-xl shadow p-6 space-y-3">

                    {[
                        "Less than 5 hours",
                        "5 to 10 hours",
                        "10 to 20 hours",
                        "More than 20 hours",
                    ].map((h) => (
                        <label key={h} className="flex gap-2">
                            <input type="radio" name="hours" />
                            {h}
                        </label>
                    ))}

                </div>
            )}


            {/* JOB CARD */}

            <div className="bg-white rounded-xl shadow p-6 border">

                <h3 className="font-semibold mb-2">
                    Friendly and patient support worker needed
                </h3>

                <p className="text-gray-600">
                    Weekly • 20 hours • 4 sessions
                </p>

                <p className="text-gray-500">
                    Putney NSW 2112 • ~29 min drive
                </p>

                <p className="text-gray-400 text-sm">
                    Posted 3 days ago • 10+ applications
                </p>

            </div>

        </div>
    );
}