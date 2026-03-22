"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Job = {
    id: number;
    title: string;
    suburb: string;
    postcode: string;
    service: string;
    hours_per_week: number;
    // optional for future
    day?: string;
};

export default function JobsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    // ✅ READ FROM URL (single source of truth)
    const servicesParam = searchParams.get("services") || "";
    const hoursParam = searchParams.get("hours") || "";
    const dayParam = searchParams.get("day") || "";
    const searchParam = searchParams.get("search") || "";

    const selectedServices = servicesParam ? servicesParam.split(",") : [];
    const selectedDays = dayParam ? dayParam.split(",") : [];

    // sync input with URL
    useEffect(() => {
        setSearch(searchParam);
    }, [searchParam]);

    // ✅ FETCH DATA
    useEffect(() => {
        fetch("/api/jobs")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setJobs(data);
                    if (data.length > 0) setSelectedJob(data[0]);
                } else if (Array.isArray(data.jobs)) {
                    setJobs(data.jobs);
                    if (data.jobs.length > 0) setSelectedJob(data.jobs[0]);
                } else {
                    setJobs([]);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // ✅ FILTER LOGIC (CLEAN)
    const filteredJobs = jobs.filter((job) => {
        // SERVICE
        const matchService =
            selectedServices.length === 0 ||
            selectedServices.includes(job.service);

        // SEARCH (suburb/postcode)
        const matchSearch =
            !searchParam ||
            job.suburb.toLowerCase().includes(searchParam.toLowerCase()) ||
            job.postcode.toLowerCase().includes(searchParam.toLowerCase());

        // HOURS
        let matchHours = true;

        if (hoursParam === "0-10") {
            matchHours = job.hours_per_week <= 10;
        } else if (hoursParam === "10-20") {
            matchHours =
                job.hours_per_week > 10 && job.hours_per_week <= 20;
        } else if (hoursParam === "20+") {
            matchHours = job.hours_per_week > 20;
        }

        // DAYS (safe for now)
        const matchDay =
            selectedDays.length === 0 ||
            selectedDays.includes(job.day || "");

        return matchService && matchSearch && matchHours && matchDay;
    });

    // ✅ SEARCH BUTTON (updates URL)
    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }

        router.push(`/dashboard/jobs?${params.toString()}`);
    };

    // ✅ CLEAR FILTERS
    const clearFilters = () => {
        router.push("/dashboard/jobs");
    };

    return (
        <div className="p-6 space-y-6">

            {/* 🔹 STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <p>Total Jobs</p>
                    <h2 className="text-2xl font-bold">{jobs.length}</h2>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <p>Active Jobs</p>
                    <h2 className="text-2xl font-bold">{jobs.length}</h2>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <p>Applications</p>
                    <h2 className="text-2xl font-bold">892</h2>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <p>Candidates</p>
                    <h2 className="text-2xl font-bold">310</h2>
                </div>
            </div>

            {/* 🔹 SEARCH + FILTER BAR */}
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
                <h3 className="font-semibold">Suburb or postcode</h3>

                <div className="flex gap-3">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Where would you like to work?"
                        className="border p-2 rounded w-full"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-teal-600 text-white px-4 rounded"
                    >
                        Search
                    </button>
                </div>

                {/* FILTER BUTTONS (MABLE STYLE) */}
                <div className="flex gap-3 flex-wrap">
                    <button
                        onClick={() => router.push("/dashboard/jobs/all-filters")}
                        className="border px-4 py-2 rounded"
                    >
                        Services ({selectedServices.length})
                    </button>

                    <button
                        onClick={() => router.push("/dashboard/jobs/all-filters")}
                        className="border px-4 py-2 rounded"
                    >
                        Days ({selectedDays.length})
                    </button>

                    <button
                        onClick={() => router.push("/dashboard/jobs/all-filters")}
                        className="border px-4 py-2 rounded"
                    >
                        Hours ({hoursParam ? 1 : 0})
                    </button>

                    <button
                        onClick={clearFilters}
                        className="text-red-500"
                    >
                        Clear all filters
                    </button>
                </div>
            </div>

            {/* 🔹 MAIN CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT: JOB LIST */}
                <div className="space-y-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                onClick={() => setSelectedJob(job)}
                                className={`bg-white p-6 rounded-xl shadow border cursor-pointer ${selectedJob?.id === job.id
                                        ? "border-orange-400 bg-orange-50"
                                        : ""
                                    }`}
                            >
                                <h3 className="font-semibold text-lg">{job.title}</h3>
                                <p className="text-gray-600">
                                    {job.suburb} {job.postcode}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {job.hours_per_week} hours/week
                                </p>
                                <p className="text-sm text-gray-400">
                                    Service: {job.service}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No jobs found</p>
                    )}
                </div>

                {/* RIGHT: JOB DETAILS */}
                <div className="bg-white p-6 rounded-xl shadow">
                    {selectedJob ? (
                        <>
                            <h2 className="text-xl font-bold mb-2">
                                {selectedJob.title}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                {selectedJob.suburb} {selectedJob.postcode}
                            </p>
                            <p className="mb-2">
                                {selectedJob.hours_per_week} hours/week
                            </p>
                            <p className="mb-2">
                                Service: {selectedJob.service}
                            </p>
                        </>
                    ) : (
                        <p>Select a job to view details</p>
                    )}
                </div>
            </div>
        </div>
    );
}