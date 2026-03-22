"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AllFiltersPage() {
    const router = useRouter();

    // ✅ STATE
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedHours, setSelectedHours] = useState("");

    // ✅ DATA
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
        "Speech pathology",
    ];

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const hours = [
        { label: "Less than 10 hours", value: "0-10" },
        { label: "10 to 20 hours", value: "10-20" },
        { label: "More than 20 hours", value: "20+" },
    ];

    // ✅ TOGGLE SERVICE
    const toggleService = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    // ✅ APPLY FILTERS (FINAL)
    const applyFilters = () => {
        const params = new URLSearchParams();

        if (selectedServices.length > 0) {
            params.set("services", selectedServices.join(","));
        }

        if (selectedDay) {
            params.set("day", selectedDay);
        }

        if (selectedHours) {
            params.set("hours", selectedHours);
        }

        router.push(`/dashboard/jobs?${params.toString()}`);
    };



    // ✅ CLEAR
    const clearAll = () => {
        setSelectedServices([]);
        setSelectedDay("");
        setSelectedHours("");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* HEADER */}
            <div className="bg-white border-b p-6 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-semibold">All filters</h1>
                    <p className="text-gray-500 text-sm">
                        jobs match your filters
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={applyFilters}
                        className="bg-teal-600 text-white px-6 py-2 rounded-lg"
                    >
                        Apply filter
                    </button>

                    <button
                        onClick={clearAll}
                        className="border border-purple-700 text-purple-700 px-6 py-2 rounded-lg"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            <div className="p-8 space-y-12">

                {/* SERVICES */}
                <div>
                    <h2 className="text-lg font-semibold mb-6">Services</h2>

                    <div className="space-y-3">
                        {services.map((service) => (
                            <label key={service} className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedServices.includes(service)}
                                    onChange={() => toggleService(service)}
                                />
                                {service}
                            </label>
                        ))}
                    </div>
                </div>

                {/* DAYS */}
                <div>
                    <h2 className="text-lg font-semibold mb-6">Days</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {days.map((day) => (
                            <div
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`border rounded-lg p-4 text-center cursor-pointer ${selectedDay === day ? "bg-teal-100 border-teal-500" : ""
                                    }`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* HOURS */}
                <div>
                    <h2 className="text-lg font-semibold mb-6">
                        Hours per week
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {hours.map((hour) => (
                            <div
                                key={hour.label}
                                onClick={() => setSelectedHours(hour.value)}
                                className={`border rounded-lg p-4 text-center cursor-pointer ${selectedHours === hour.label ? "bg-teal-100 border-teal-500" : ""
                                    }`}
                            >
                                {hour.label}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}