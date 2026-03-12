"use client";

import { useState } from "react";

export default function AllFiltersPage() {

    const services = [
        "Companionship and social support",
        "Community participation, sports and activities",
        "Transportation",
        "Meal delivery, preparation and shopping",
        "Light housework",
        "Light gardening",
        "Personal admin and home maintenance",
        "Showering, toileting and dressing",
        "Manual transfer and mobility",
        "Assistance with medication",
        "Assistance with eating",
        "Light massage and exercise assistance",
        "Nursing services",
        "Psychology",
        "Occupational therapy",
        "Physiotherapy",
        "Speech pathology"
    ];

    const days = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];

    const hours = [
        "Less than 5 hours",
        "5 to 10 hours",
        "10 to 20 hours",
        "More than 20 hours"
    ];

    const ages = [
        "0–5", "5–12", "13–18", "19–25", "26–45", "46–65", "65+"
    ];

    const genders = [
        "Female", "Male", "No preference"
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}

            <div className="bg-white border-b p-6 flex justify-between items-center">

                <div>
                    <h1 className="text-xl font-semibold">All filters</h1>
                    <p className="text-gray-500 text-sm">jobs match your filters</p>
                </div>

                <div className="flex gap-3">

                    <button className="bg-teal-600 text-white px-6 py-2 rounded-lg">
                        Apply filter
                    </button>

                    <button className="border border-purple-700 text-purple-700 px-6 py-2 rounded-lg">
                        Clear All
                    </button>

                </div>

            </div>

            <div className="p-8 space-y-12">

                {/* SERVICES */}

                <div>

                    <h2 className="text-lg font-semibold mb-6">Services</h2>

                    <div className="space-y-4">

                        {services.map((service) => (
                            <label key={service} className="flex items-center gap-3 border-b pb-4">
                                <input type="checkbox" />
                                {service}
                            </label>
                        ))}

                    </div>

                </div>

                {/* DAYS */}

                <div>

                    <h2 className="text-lg font-semibold mb-6">Days</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

                        {days.map((day) => (

                            <div
                                key={day}
                                className="border rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100"
                            >
                                ✓ {day}
                            </div>

                        ))}

                    </div>

                </div>

                {/* HOURS */}

                <div>

                    <h2 className="text-lg font-semibold mb-6">Hours per week</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        {hours.map((hour) => (

                            <div
                                key={hour}
                                className="border rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100"
                            >
                                ✓ {hour}
                            </div>

                        ))}

                    </div>

                </div>

                {/* CLIENT AGE */}

                <div>

                    <h2 className="text-lg font-semibold mb-6">Client Age</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

                        {ages.map((age) => (

                            <div
                                key={age}
                                className="border rounded-lg p-4 text-center hover:bg-gray-100"
                            >
                                ✓ {age}
                            </div>

                        ))}

                    </div>

                </div>

                {/* CLIENT GENDER */}

                <div>

                    <h2 className="text-lg font-semibold mb-6">Client Gender</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {genders.map((gender) => (

                            <div
                                key={gender}
                                className="border rounded-lg p-4 text-center hover:bg-gray-100"
                            >
                                ✓ {gender}
                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}