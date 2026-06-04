"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
    const router = useRouter();
    const [services, setServices] = useState<any[]>([]);

    const [form, setForm] = useState({
        title: "",
        suburb: "",
        postcode: "",
        hours_range: "",
        service_id: "",
        description: "",
    });
    useEffect(() => {
        fetch("http://54.206.186.109/ndis-backend/controllers/getServices.php")
            .then(res => res.json())
            .then(data => {
                console.log("SERVICES:", data);
                setServices(data.services || []);
            })
            .catch(err => console.error("Error:", err));
    }, []);

    const [loading, setLoading] = useState(false);

    // 🔥 Handle input change
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔥 Handle submit
    const handleSubmit = async () => {
        // Basic validation
        if (
            !form.title ||
            !form.suburb ||
            !form.postcode ||
            !form.hours_range ||
            !form.service_id ||
            !form.description
        ) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user") || "null");

        if (!user || !user.id) {
            alert("User not logged in");
            return;
        }

        try {
            const res = await fetch(
                "http://54.206.186.109/ndis-backend/controllers/postJob.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...form,
                        user_id: user.id,
                    }),
                }
            );

            const text = await res.text();
            console.log("RAW:", text);

            let data;
            try {
                data = JSON.parse(text);
            } catch {
                alert("Backend not returning JSON");
                return;
            }

            if (data.success) {
                alert("Job posted successfully!");
                router.push("/dashboard/participant");
            } else {
                alert(data.message || "Failed to post job");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("An error occurred while posting the job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-8 py-6 space-y-8">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Post a Job
                    </h1>
                    <p className="text-gray-600">
                        Create a new job posting to find support workers
                    </p>
                </div>

                {/* FORM CARD */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="title"
                            placeholder="e.g. Support Worker Needed"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Suburb */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Suburb <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="suburb"
                            placeholder="e.g. Sydney"
                            value={form.suburb}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Postcode */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postcode <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="postcode"
                            placeholder="e.g. 2000"
                            value={form.postcode}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Hours */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hours Range <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="hours_range"
                            placeholder="e.g. 10-20 hrs/week"
                            value={form.hours_range}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Service ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="service_id"
                            value={form.service_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition bg-white"
                        >
                            <option value="">Select a Service</option>

                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            placeholder="Describe the job details, responsibilities, and requirements..."
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
                            rows={5}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
                    >
                        {loading ? "Posting..." : "Post Job"}
                    </button>
                </div>
            </div>
        </div>
    );
}