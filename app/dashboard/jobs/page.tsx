"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [openDropdown, setOpenDropdown] = useState<null | "services" | "days" | "hours">(null);

    const [selectedService, setSelectedService] = useState<string[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedHours, setSelectedHours] = useState("");

    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem("role");

        if (role === "support_worker") {
            setAuthorized(true);
        } else {
            router.push("/login");
        }
    }, []);



    useEffect(() => {
        const searchParam = searchParams.get("search") || "";
        const servicesParam = searchParams.get("services") || "";
        const hoursParam = searchParams.get("hours") || "";
        const dayParam = searchParams.get("day") || "";

        setSearch(searchParam);
        setSelectedService(
            servicesParam ? servicesParam.split(",") : []
        );
        setSelectedHours(hoursParam);
        setSelectedDays(
            dayParam ? dayParam.split(",") : []
        );

        handleSearch(searchParam, servicesParam, hoursParam, dayParam);

    }, [searchParams]);



    // SEARCH BUTTON
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
                day: dayValue || "", // ✅ IMPORTANT
            });

            console.log("FINAL QUERY:", query.toString());

            const res = await fetch(
                `http://localhost/ndis-backend/controllers/jobs.php?${query}`
            );

            const data = await res.json();

            if (Array.isArray(data)) {
                setJobs(data);
                setSelectedJob(data.length > 0 ? data[0] : null);
            } else {
                setJobs([]);
                setSelectedJob(null);
            }

        } catch (err) {
            console.error("FETCH ERROR:", err);
            setJobs([]);
            setSelectedJob(null);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-6 space-y-6">

            {/* FILTER BAR */}
            <div className="bg-white p-6 rounded-xl shadow space-y-4">

                <p className="text-sm font-medium">Suburb or postcode</p>

                <div className="flex gap-3">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Where would you like to work?"
                        className="border p-3 w-full rounded-lg"
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
                        className="bg-teal-600 text-white px-6 rounded-lg"
                    >
                        Search
                    </button>
                </div>

                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Include nearby suburbs
                </label>

                {/* FILTER BUTTONS */}
                <div className="flex gap-3 flex-wrap">

                    <button
                        onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
                        className="border px-4 py-2 rounded-lg"
                    >
                        service({selectedService.length})
                    </button>

                    <button
                        onClick={() => setOpenDropdown(openDropdown === "days" ? null : "days")}
                        className="border px-4 py-2 rounded-lg"
                    >
                        Days ({selectedDays.length})
                    </button>

                    <button
                        onClick={() => setOpenDropdown(openDropdown === "hours" ? null : "hours")}
                        className="border px-4 py-2 rounded-lg"
                    >
                        Hours ({selectedHours ? 1 : 0})
                    </button>

                    <button
                        onClick={() => router.push("/dashboard/jobs/all-filters")}
                        className="border px-4 py-2 rounded-lg"
                    >
                        All filters
                    </button>

                </div>
            </div>
            {openDropdown === "services" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {[
                        "Companionship and social support",
                        "Transportation",
                        "Light housework",
                        "Personal admin and home maintenance",
                        "Manual transfer and mobility",
                        "Assistance with eating",
                        "Nursingservice",
                        "Occupational therapy",
                        "Speech pathology",
                        "Community participation, sports and activities",
                        "Meal delivery, preparation and shopping",
                        "Light gardening",
                        "Showering, toileting and dressing",
                        "Assistance with medication",
                        "Light massage and exercise assistance",
                        "Psychology",
                        "Physiotherapy"
                    ].map((service) => (
                        <label key={service} className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={selectedService.includes(service)}
                                onChange={() => {
                                    const updated = selectedService.includes(service)
                                        ? selectedService.filter((s) => s !== service)
                                        : [...selectedService, service];

                                    setSelectedService(updated);

                                }}
                            />
                            {service}
                        </label>
                    ))}

                    <div className="mt-4 flex justify-end">
                        <button
                            className="bg-teal-200 text-gray-900 px-4 py-2 rounded-lg"
                            onClick={() => {
                                setOpenDropdown(null);
                                handleSearch();
                            }}
                        >
                            Apply
                        </button>
                    </div>

                </div>
            )}
            {openDropdown === "days" && (
                <div className="bg-white p-4 rounded-xl shadow mt-4">

                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                        <label key={day} className="block">
                            <input
                                type="checkbox"
                                checked={selectedDays.includes(day)}
                                onChange={() => {
                                    const updated = selectedDays.includes(day)
                                        ? selectedDays.filter((d) => d !== day)
                                        : [...selectedDays, day];
                                    setSelectedDays(updated);
                                }}
                            />
                            {day}
                        </label>
                    ))}

                    <div className="mt-4 flex justify-end">
                        <button
                            className="bg-teal-200 text-gray-900 px-4 py-2 rounded-lg"
                            onClick={() => {
                                setOpenDropdown(null);
                                handleSearch();
                            }}
                        >
                            Apply
                        </button>
                    </div>

                </div>
            )}

            {openDropdown === "hours" && (
                <div className="bg-white p-4 rounded-xl shadow mt-4">

                    {["0-10", "10-20", "20+"].map((h) => (
                        <label key={h} className="block">
                            <input
                                type="radio"
                                name="hours"
                                checked={selectedHours === h}
                                onChange={() => {
                                    setSelectedHours(h);
                                }}
                            />
                            {h}
                        </label>
                    ))}

                    {/* ✅ APPLY BUTTON OUTSIDE MAP */}
                    <div className="mt-4 flex justify-end">
                        <button
                            className="bg-teal-200 text-gray-900 px-4 py-2 rounded-lg"
                            onClick={() => {
                                setOpenDropdown(null);
                                handleSearch();
                            }}
                        >
                            Apply
                        </button>
                    </div>

                </div>
            )}

            {/* JOB LIST */}
            <div className="flex flex-col gap-4">

                <div>


                    {
                        loading ? (
                            <p> Loading...</p>
                        ) : jobs.length === 0 ? (
                            <p>No jobs found</p>
                        ) : (
                            jobs.map((job) => (
                                <div

                                    key={job.id}
                                    onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                                    className="p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-teal-300"
                                >
                                    <h3 className="font-semibold">{job.title}</h3>
                                    <p>{job.suburb} {job.postcode}</p>
                                    <p>{job.hours_range} hrs/week</p>
                                    <p>{job.service || "Service not specified"}</p>
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {job.description}
                                    </p>
                                </div>
                            ))
                        )}
                </div>

                {/* DETAILS */}
                <div className="border p-4 rounded">
                    {selectedJob ? (
                        <>
                            <h2 className="font-bold">{selectedJob.title}</h2>
                            <p>{selectedJob.suburb}</p>
                            <p>{selectedJob.hours_range} hrs/week</p>
                            <p>{selectedJob.service || "Service not specified"}</p>
                            <p>{selectedJob.service}</p>
                        </>
                    ) : (
                        <p>Select a job</p>
                    )}
                </div>

            </div>
        </div >
    );
}