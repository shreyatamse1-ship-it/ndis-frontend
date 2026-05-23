"use client";

import { useEffect, useState } from "react";

type Booking = {
    id: number;
    title: string;
    suburb: string;
    postcode: string;
    hours_range: number;
    status: string;
    applied_at: string;
};

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) return;

        const parsed = JSON.parse(user);

        fetch(`http://localhost/ndis-backend/controllers/getBookings.php?user_id=${parsed.id}`)
            .then((res) => res.json())
            .then((data) => setBookings(data))
            .catch((err) => console.error(err));
    }, []);

    const getStatusStyle = (status: string) => {
        if (status === "accepted") return "bg-green-100 text-green-700";
        if (status === "rejected") return "bg-red-100 text-red-700";
        return "bg-yellow-100 text-yellow-700";
    };

    const total = bookings.length;
    const accepted = bookings.filter(b => b.status === "accepted").length;
    const pending = bookings.filter(b => b.status === "pending").length;
    const rejected = bookings.filter(b => b.status === "rejected").length;

    return (
        <div className="p-6 space-y-6">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold">My Bookings</h1>
                <p className="text-gray-500 text-sm">Track your job applications and status</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard label="Total" value={total} />
                <StatCard label="Accepted" value={accepted} color="green" />
                <StatCard label="Pending" value={pending} color="yellow" />
                <StatCard label="Rejected" value={rejected} color="red" />
            </div>

            {/* BOOKINGS LIST */}
            <div className="space-y-4">
                {bookings.map((b) => (
                    <div
                        key={b.id}
                        className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
                    >
                        <div className="flex justify-between items-start">

                            {/* LEFT */}
                            <div>
                                <h2 className="text-lg font-semibold">{b.title}</h2>
                                <p className="text-gray-500 text-sm">
                                    {b.suburb} {b.postcode}
                                </p>
                                <p className="text-sm mt-1">{b.hours_range}+ hrs/week</p>
                            </div>

                            {/* RIGHT */}
                            <span
                                className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                                    b.status
                                )}`}
                            >
                                {b.status}
                            </span>
                        </div>

                        {/* FOOTER */}
                        <div className="mt-4 text-xs text-gray-400">
                            Applied on {new Date(b.applied_at).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
    color = "gray",
}: {
    label: string;
    value: number;
    color?: string;
}) {
    const colorMap: any = {
        green: "bg-green-100 text-green-700",
        yellow: "bg-yellow-100 text-yellow-700",
        red: "bg-red-100 text-red-700",
        gray: "bg-gray-100 text-gray-700",
    };

    return (
        <div className="border rounded-xl p-4 bg-white shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-xl font-semibold mt-1">{value}</p>
            <span className={`text-xs px-2 py-1 rounded ${colorMap[color]} mt-2 inline-block`}>
                {label}
            </span>
        </div>
    );
}