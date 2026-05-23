"use client"

import { useEffect, useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

// 🔥 Australian locations (you can expand later)
const australianLocations = [
    "Sydney NSW 2000",
    "Parramatta NSW 2150",
    "Pemulwuy NSW 2145",
    "Melbourne VIC 3000",
    "Brisbane QLD 4000",
    "Perth WA 6000",
    "Adelaide SA 5000",
    "Canberra ACT 2600",
    "Hobart TAS 7000",
    "Penrith NSW 2750",
    "Blacktown NSW 2148",
    "Liverpool NSW 2170",
    "Bondi NSW 2026",
    "Manly NSW 2095"
]

export default function LocationsPage() {

    const [locationInput, setLocationInput] = useState("")
    const [locations, setLocations] = useState<string[]>([])
    const [suggestions, setSuggestions] = useState<string[]>([])

    // ✅ Get user
    const getUser = () => {
        try {
            return JSON.parse(localStorage.getItem("user") || "null")
        } catch {
            return null
        }
    }

    // 🔥 Load from backend
    useEffect(() => {
        const user = getUser()
        if (!user?.id) return

        fetch(`http://localhost/ndis-backend/controllers/get_locations.php?user_id=${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data?.locations) {
                    setLocations(JSON.parse(data.locations))
                }
            })
            .catch(err => console.error(err))
    }, [])

    // 🔍 Handle input + suggestions
    const handleInputChange = (value: string) => {
        setLocationInput(value)

        if (value.length > 1) {
            const filtered = australianLocations.filter(loc =>
                loc.toLowerCase().includes(value.toLowerCase())
            )
            setSuggestions(filtered)
        } else {
            setSuggestions([])
        }
    }

    // ➕ Add location
    const addLocation = (value?: string) => {
        const finalValue = (value || locationInput).trim()
        if (!finalValue) return

        // ❌ prevent duplicates
        if (locations.includes(finalValue)) {
            setLocationInput("")
            setSuggestions([])
            return
        }

        setLocations(prev => [...prev, finalValue])
        setLocationInput("")
        setSuggestions([])
    }

    // ❌ Remove
    const removeLocation = (index: number) => {
        setLocations(prev => prev.filter((_, i) => i !== index))
    }

    // 💾 Save
    const saveLocations = async () => {

        const user = getUser()

        if (!user?.id) {
            alert("User not logged in")
            return
        }

        try {
            const res = await fetch("http://localhost/ndis-backend/controllers/update_locations.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user.id,
                    locations: locations
                })
            })

            const data = await res.json()
            console.log(data)

            if (data.status === "success") {
                alert("Saved successfully ✅")
            }

        } catch (err) {
            console.error(err)
            alert("Server error")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">

            <h1 className="text-3xl font-bold mb-8 text-gray-900">
                My profile
            </h1>

            <div className="flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <div className="w-full md:w-72">
                    <ProfileSidebar />
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl shadow-md p-8">

                    <h2 className="text-3xl font-bold mb-4 text-gray-900 pb-4 border-b border-gray-100">
                        Locations
                    </h2>

                    <h3 className="font-semibold mb-2 text-gray-900 mt-6">
                        Suburb or postcode
                    </h3>

                    <p className="text-gray-500 mb-6 leading-relaxed">
                        Add as many suburbs or postcodes you are willing to travel to for work.
                        We recommend at least 3.
                    </p>

                    {/* Input + dropdown */}
                    <div className="flex gap-3 mb-4 relative">

                        <input
                            type="text"
                            placeholder="Enter suburb or postcode"
                            value={locationInput}
                            onChange={(e) => handleInputChange(e.target.value)}
                            className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-teal-500 focus:outline-none transition"
                        />

                        <button
                            onClick={() => addLocation()}
                            className="bg-teal-500 text-white px-6 py-2.5 rounded-lg hover:bg-teal-600 transition font-medium shadow-sm"
                        >
                            Add
                        </button>

                        {/* 🔽 Suggestions dropdown */}
                        {suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border-2 border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto z-10 shadow-md">
                                {suggestions.map((s, i) => (
                                    <div
                                        key={i}
                                        onClick={() => addLocation(s)}
                                        className="px-4 py-2.5 hover:bg-teal-50 cursor-pointer text-gray-700 transition"
                                    >
                                        {s}
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                    {/* Chips */}
                    <div className="flex gap-3 mb-8 flex-wrap">

                        {locations.map((loc, index) => (
                            <div
                                key={index}
                                className="bg-teal-50 border-2 border-teal-200 px-4 py-2.5 rounded-lg flex items-center gap-2 text-teal-700 font-medium"
                            >
                                {loc}

                                <span
                                    onClick={() => removeLocation(index)}
                                    className="cursor-pointer hover:text-teal-900 transition ml-1"
                                >
                                    ✕
                                </span>
                            </div>
                        ))}

                    </div>

                    {/* Save */}
                    <button
                        onClick={saveLocations}
                        className="bg-teal-500 hover:bg-teal-600 text-white px-7 py-2.5 rounded-lg font-semibold shadow-sm transition"
                    >
                        Save and continue
                    </button>

                </div>

            </div>

        </div>
    )
}