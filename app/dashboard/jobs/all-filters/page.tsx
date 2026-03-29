"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function AllFiltersPage() {
    const router = useRouter();

    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedHours, setSelectedHours] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";

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

    const hours = [
        { label: "Less than 10 hours", value: "0-10" },
        { label: "10 to 20 hours", value: "10-20" },
        { label: "More than 20 hours", value: "20+" },
    ];

    const toggleService = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };
    const applyFilters = () => {
        const params = new URLSearchParams(window.location.search);

        // ✅ KEEP existing suburb
        const searchValue = params.get("search") || "";

        if (searchValue) {
            params.set("search", searchValue);
        }

        if (selectedServices.length > 0) {
            params.set("services", selectedServices.join(","));
        } else {
            params.delete("services");
        }

        if (selectedHours) {
            params.set("hours", selectedHours);
        } else {
            params.delete("hours");
        }

        router.push(`/dashboard/jobs?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="flex justify-between mb-6">
                <h1 className="text-xl font-semibold">All Filters</h1>

                <button
                    onClick={applyFilters}
                    className="bg-teal-600 text-white px-5 py-2 rounded-lg"
                >
                    Apply Filters
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow space-y-8">

                {/* SERVICES */}
                <div>
                    <h2 className="font-semibold mb-4">Services</h2>

                    <div className="grid md:grid-cols-2 gap-3">
                        {services.map((service) => (
                            <div
                                key={service}
                                onClick={() => toggleService(service)}
                                className={`border p-3 rounded-lg cursor-pointer ${selectedServices.includes(service)
                                    ? "bg-teal-50 border-teal-500"
                                    : ""
                                    }`}
                            >
                                {service}
                            </div>
                        ))}
                    </div>
                </div>

                {/* HOURS */}
                <div>
                    <h2 className="font-semibold mb-4">Hours</h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        {hours.map((h) => (
                            <div
                                key={h.value}
                                onClick={() => setSelectedHours(h.value)}
                                className={`border p-4 text-center rounded-lg cursor-pointer ${selectedHours === h.value
                                    ? "bg-teal-100 border-teal-500"
                                    : ""
                                    }`}
                            >
                                {h.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}