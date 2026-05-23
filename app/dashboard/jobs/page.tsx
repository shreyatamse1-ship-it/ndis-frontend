"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StatCard from "../../../components/dashboard/StatCard";

type Job = {
    id: number;
    title: string;
    suburb: string;
    postcode: string;
    service: string;
    hours_range: number;
    day?: string;
    description?: string;
};

export default function JobsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [openDropdown, setOpenDropdown] = useState<null | "services" | "days" | "hours">(null);
    const [selectedService, setSelectedService] = useState<string[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedHours, setSelectedHours] = useState("");







    useEffect(() => {
        const searchParam = searchParams.get("search") || "";
        const servicesParam = searchParams.get("services") || "";
        const hoursParam = searchParams.get("hours") || "";
        const dayParam = searchParams.get("day") || "";

        setSearch(searchParam);
        setSelectedService(servicesParam ? servicesParam.split(",") : []);
        setSelectedHours(hoursParam);
        setSelectedDays(dayParam ? dayParam.split(",") : []);

        handleSearch(searchParam, servicesParam, hoursParam, dayParam);
    }, [searchParams]);

    const handleSearch = async (
        searchValue = search,
        servicesValue = selectedService.join(","),
        hoursValue = selectedHours,
        dayValue = selectedDays.join(",")
    ) => {
        setLoading(true);

        try {
            const query = new URLSearchParams({
                search: searchValue || "",
                services: servicesValue || "",
                hours: hoursValue || "",
                day: dayValue || "",
            });

            const res = await fetch(
                `http://localhost/ndis-backend/controllers/jobs.php?${query}`
            );

            const data = await res.json();

            if (Array.isArray(data)) {
                setJobs(data);
            } else {
                setJobs([]);
            }
        } catch (err) {
            console.error("FETCH ERROR:", err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    // Calculate job statistics
    const totalJobs = jobs.length;
    const activeJobs = Math.max(0, Math.floor(jobs.length * 0.7));
    const parseHours = (range: string | number) => {
        if (typeof range === "number") return range;

        if (range.includes("-")) {
            const [min, max] = range.split("-").map(Number);
            return (min + max) / 2; // average of range
        }

        if (range.includes("+")) {
            return Number(range.replace("+", "")) + 5; // rough estimate
        }

        return Number(range) || 0;
    };

    const totalHours = jobs.reduce((sum, job) => {
        return sum + parseHours(job.hours_range);
    }, 0);

    const avgHours = jobs.length
        ? (totalHours / jobs.length).toFixed(1)
        : "0.0";

    const serviceList = [
        "Companionship and social support",
        "Transportation",
        "Light housework",
        "Personal admin and home maintenance",
        "Manual transfer and mobility",
        "Assistance with eating",
        "Nursing service",
        "Occupational therapy",
        "Speech pathology",
        "Community participation, sports and activities",
        "Meal delivery, preparation and shopping",
        "Light gardening",
        "Showering, toileting and dressing",
        "Assistance with medication",
        "Light massage and exercise assistance",
        "Psychology",
        "Physiotherapy",
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="px-8 py-6 space-y-8">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Available Jobs
                    </h1>
                    <p className="text-gray-600">
                        Find and apply for jobs that match your availability
                    </p>
                </div>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Jobs" value={totalJobs.toString()} />
                    <StatCard title="Active Positions" value={activeJobs.toString()} />
                    <StatCard title="Total Hours" value={`${totalHours}h`} />
                    <StatCard title="Average Hours" value={`${avgHours}h`} />
                </div>

                {/* FILTER BAR */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Search & Filters
                    </h2>

                    <div className="space-y-4">
                        {/* SEARCH INPUT */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Suburb or Postcode
                            </label>
                            <div className="flex gap-3">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch(
                                                search,
                                                selectedService.join(","),
                                                selectedHours,
                                                selectedDays.join(",")
                                            );
                                        }
                                    }}
                                    placeholder="Where would you like to work?"
                                    className="flex-1 border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                <button
                                    onClick={() =>
                                        handleSearch(
                                            search,
                                            selectedService.join(","),
                                            selectedHours,
                                            selectedDays.join(",")
                                        )
                                    }
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* FILTER BUTTONS */}
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() =>
                                    setOpenDropdown(
                                        openDropdown === "services" ? null : "services"
                                    )
                                }
                                className="border border-gray-300 px-3.5 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                Service ({selectedService.length})
                            </button>

                            <button
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "days" ? null : "days")
                                }
                                className="border border-gray-300 px-3.5 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                Days ({selectedDays.length})
                            </button>

                            <button
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "hours" ? null : "hours")
                                }
                                className="border border-gray-300 px-3.5 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                Hours ({selectedHours ? 1 : 0})
                            </button>

                            <button
                                onClick={() => router.push("/dashboard/jobs/all-filters")}
                                className="border border-gray-300 px-3.5 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                All Filters
                            </button>
                        </div>
                    </div>

                    {openDropdown === "services" && (
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3 border-t border-gray-100 mt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                                {serviceList.map((service) => (
                                    <label
                                        key={service}
                                        className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:bg-white p-2 rounded transition"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedService.includes(service)}
                                            onChange={() => {
                                                const updated = selectedService.includes(service)
                                                    ? selectedService.filter((s) => s !== service)
                                                    : [...selectedService, service];
                                                setSelectedService(updated);
                                            }}
                                            className="rounded"
                                        />
                                        <span>{service}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="flex justify-end pt-3 border-t border-gray-200">
                                <button
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
                                    onClick={() => {
                                        setOpenDropdown(null);
                                        handleSearch();
                                    }}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {openDropdown === "days" && (
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3 border-t border-gray-100 mt-4">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                                    (day) => (
                                        <label
                                            key={day}
                                            className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:bg-white p-2 rounded transition"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedDays.includes(day)}
                                                onChange={() => {
                                                    const updated = selectedDays.includes(day)
                                                        ? selectedDays.filter((d) => d !== day)
                                                        : [...selectedDays, day];
                                                    setSelectedDays(updated);
                                                }}
                                                className="rounded"
                                            />
                                            <span>{day}</span>
                                        </label>
                                    )
                                )}
                            </div>

                            <div className="flex justify-end pt-3 border-t border-gray-200">
                                <button
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
                                    onClick={() => {
                                        setOpenDropdown(null);
                                        handleSearch();
                                    }}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {openDropdown === "hours" && (
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3 border-t border-gray-100 mt-4">
                            <div className="grid grid-cols-3 gap-3">
                                {["0-10", "10-20", "20+"].map((h) => (
                                    <label
                                        key={h}
                                        className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:bg-white p-2 rounded transition"
                                    >
                                        <input
                                            type="radio"
                                            name="hours"
                                            checked={selectedHours === h}
                                            onChange={() => {
                                                setSelectedHours(h);
                                            }}
                                            className="rounded"
                                        />
                                        <span className="font-medium">{h} hrs/week</span>
                                    </label>
                                ))}
                            </div>

                            <div className="flex justify-end pt-3 border-t border-gray-200">
                                <button
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
                                    onClick={() => {
                                        setOpenDropdown(null);
                                        handleSearch();
                                    }}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* JOB LIST HEADER */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Job Listings</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {jobs.length} position{jobs.length !== 1 ? "s" : ""} available
                    </p>
                </div>

                {/* JOB LIST */}
                <div className="space-y-3">
                    {loading ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <p className="text-gray-600 font-medium">
                                Loading opportunities...
                            </p>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <p className="text-gray-600 font-medium">
                                No jobs found matching your criteria
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Try adjusting your search filters
                            </p>
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <div
                                key={job.id}
                                onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-teal-200 transition cursor-pointer group"
                            >
                                {/* TOP ROW */}
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition">
                                            {job.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            📍 {job.suburb} {job.postcode}
                                        </p>
                                    </div>

                                    <span className="inline-flex items-center bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                                        {job.service || "General"}
                                    </span>
                                </div>

                                {/* DESCRIPTION */}
                                <p className="text-sm text-gray-600 mt-4 line-clamp-2">
                                    {job.description || "No description available"}
                                </p>

                                {/* FOOTER */}
                                <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <p className="text-sm font-medium text-gray-700">
                                            <span className="text-teal-600 font-bold">
                                                {job.hours_range}
                                            </span>{" "}
                                            hrs/week
                                        </p>
                                    </div>

                                    <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}