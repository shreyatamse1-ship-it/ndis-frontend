"use client"

import { useEffect, useState } from "react"

type Worker = {
    id: number
    name: string
    rates: {
        weekday?: string
        saturday?: string
        sunday?: string
    }
    locations: string[]
    availability: Record<string, string[]>
}

export default function SearchWorkers() {
    const [workers, setWorkers] = useState<Worker[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost/ndis-backend/controllers/get_workers.php")
            .then(res => res.json())
            .then(data => {
                setWorkers(data)
                setLoading(false)
            })
    }, [])

    return (
        <div className="p-8 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Search Workers</h1>
                <p className="text-gray-500 text-sm">Browse and connect with support workers</p>
            </div>

            {/* LOADING */}
            {loading && <p className="text-gray-500">Loading...</p>}

            {/* EMPTY */}
            {!loading && workers.length === 0 && (
                <p className="text-gray-500">No workers found.</p>
            )}

            {/* GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {workers.map((worker) => (
                    <div
                        key={worker.id}
                        className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    >

                        {/* TOP PROFILE */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-semibold">
                                {worker.name?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <p className="font-semibold text-gray-800">{worker.name}</p>
                                <p className="text-xs text-gray-500">Support Worker</p>
                            </div>
                        </div>

                        {/* RATES */}
                        <div className="mb-3">
                            <p className="text-xs text-gray-500 mb-1">Rates</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="bg-gray-100 px-2 py-1 rounded">
                                    Weekday: ₹{worker.rates.weekday || "-"}
                                </span>
                                <span className="bg-gray-100 px-2 py-1 rounded">
                                    Sat: ₹{worker.rates.saturday || "-"}
                                </span>
                                <span className="bg-gray-100 px-2 py-1 rounded">
                                    Sun: ₹{worker.rates.sunday || "-"}
                                </span>
                            </div>
                        </div>

                        {/* LOCATION */}
                        <div className="mb-3">
                            <p className="text-xs text-gray-500 mb-1">Location</p>
                            <p className="text-sm text-gray-700">
                                {worker.locations?.join(", ") || "Not specified"}
                            </p>
                        </div>

                        {/* AVAILABILITY */}
                        <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-1">Availability</p>

                            {Object.keys(worker.availability || {}).length === 0 ? (
                                <p className="text-sm text-gray-400">Not specified</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(worker.availability).map(([day, slots]) =>
                                        slots.map((slot, i) => (
                                            <span
                                                key={day + i}
                                                className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                                            >
                                                {day}: {slot}
                                            </span>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-2">
                            <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700">
                                View Profile
                            </button>
                            <button className="flex-1 border text-sm py-2 rounded-lg hover:bg-gray-100">
                                Contact
                            </button>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}