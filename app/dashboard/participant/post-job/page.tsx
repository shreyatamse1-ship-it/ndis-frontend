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
        fetch("http://localhost/ndis-backend/controllers/getServices.php")
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

        try {
            const res = await fetch(
                "http://localhost/ndis-backend/controllers/postJob.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...form,
                        participant_id: 1, // 🔥 TEMP (replace with logged-in user later)
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
        <div className="p-6 max-w-2xl space-y-5">
            <h2 className="text-2xl font-bold">Post a Job</h2>

            {/* Title */}
            <input
                name="title"
                placeholder="Job Title (e.g. Support Worker Needed)"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            {/* Suburb */}
            <input
                name="suburb"
                placeholder="Suburb (e.g. Sydney)"
                value={form.suburb}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            {/* Postcode */}
            <input
                name="postcode"
                placeholder="Postcode (e.g. 2000)"
                value={form.postcode}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            {/* Hours */}
            <input
                name="hours_range"
                placeholder="Hours (e.g. 10-20 hrs/week)"
                value={form.hours_range}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            {/* Service ID */}
            <select
                name="service_id"
                value={form.service_id}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            >
                <option value="">Select Service</option>

                {services.map((service) => (
                    <option key={service.id} value={service.id}>
                        {service.name}
                    </option>
                ))}
            </select>

            {/* Description */}
            <textarea
                name="description"
                placeholder="Describe the job..."
                value={form.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows={4}
            />

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
                {loading ? "Posting..." : "Post Job"}
            </button>
        </div>
    );
}