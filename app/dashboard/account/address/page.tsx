"use client"

import { useEffect, useState } from "react"

const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost/ndis-backend/controllers"

export default function AddressPage() {
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [postalStreet, setPostalStreet] = useState("")
    const [postalCity, setPostalCity] = useState("")

    const userId = localStorage.getItem("user_id") // IMPORTANT

    // 🔹 FETCH DATA
    useEffect(() => {
        if (!userId) return

        fetch(`${apiBaseUrl}/get_address.php?user_id=${userId}`)
            .then(res => res.json())
            .then(data => {
                setStreet(data.street || "")
                setCity(data.city || "")
                setPostalStreet(data.postal_street || "")
                setPostalCity(data.postal_city || "")
            })
            .catch(err => console.error(err))
    }, [userId])

    // 🔹 SAVE DATA
    const handleSave = async () => {
        if (!userId) {
            alert("User not logged in")
            return
        }

        const res = await fetch(`${apiBaseUrl}/update_address.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: userId,
                street,
                city,
                postal_street: postalStreet,
                postal_city: postalCity
            })
        })

        const data = await res.json()

        if (data.status === "success") {
            alert("Address updated ✅")
        } else {
            alert("Update failed ❌")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Address Settings</h1>
                    <p className="text-slate-600 text-lg font-normal">Update your residential and postal address</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-10">
                    <div className="space-y-9">
                        {/* Residential Address Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">Residential Address</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                        Street Address
                                    </label>
                                    <input
                                        className="w-full border border-slate-300 bg-white rounded-lg p-3.5 text-slate-900 text-sm placeholder-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 focus:border-transparent transition-all duration-150"
                                        placeholder="Enter street address"
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                        City / State / Postcode
                                    </label>
                                    <input
                                        className="w-full border border-slate-300 bg-white rounded-lg p-3.5 text-slate-900 text-sm placeholder-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 focus:border-transparent transition-all duration-150"
                                        placeholder="Enter city, state and postcode"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Postal Address Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-3 border-b border-slate-200">Postal Address</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                        Postal Street
                                    </label>
                                    <input
                                        className="w-full border border-slate-300 bg-white rounded-lg p-3.5 text-slate-900 text-sm placeholder-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 focus:border-transparent transition-all duration-150"
                                        placeholder="Enter postal street"
                                        value={postalStreet}
                                        onChange={(e) => setPostalStreet(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                        Postal City
                                    </label>
                                    <input
                                        className="w-full border border-slate-300 bg-white rounded-lg p-3.5 text-slate-900 text-sm placeholder-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 focus:border-transparent transition-all duration-150"
                                        placeholder="Enter postal city"
                                        value={postalCity}
                                        onChange={(e) => setPostalCity(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-150 shadow-sm hover:shadow-md"
                        >
                            Save Address
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}