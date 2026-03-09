"use client"

import { useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

export default function LocationsPage() {

    const [locationInput, setLocationInput] = useState("")

    const [locations, setLocations] = useState([
        "Parramatta NSW 2150",
        "Pemulwuy NSW 2145"
    ])

    const addLocation = () => {
        if (!locationInput.trim()) return

        setLocations([...locations, locationInput])
        setLocationInput("")
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <h1 className="text-2xl font-semibold mb-6">
                My profile
            </h1>

            <div className="flex flex-col md:flex-row gap-6">

                {/* Sidebar */}
                <div className="w-full md:w-72">
                    <ProfileSidebar />
                </div>

                {/* Right side content */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm p-6">

                    <h2 className="text-2xl font-semibold mb-4">
                        Locations
                    </h2>

                    <h3 className="font-semibold mb-2">
                        Suburb or postcode
                    </h3>

                    <p className="text-gray-600 mb-4">
                        Add as many suburbs or postcodes you are willing to travel to for work.
                        We recommend at least 3.
                    </p>

                    {/* Input */}
                    <div className="flex gap-3 mb-6">

                        <input
                            type="text"
                            placeholder="Enter suburb or postcode"
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            className="flex-1 border rounded-md px-4 py-2"
                        />

                        <button
                            onClick={addLocation}
                            className="bg-teal-300 text-gray-900 px-5 py-2 rounded-md"
                        >
                            Add
                        </button>

                    </div>

                    {/* Location Chips */}
                    <div className="flex gap-3 mb-6 flex-wrap">

                        {locations.map((loc, index) => (

                            <div
                                key={index}
                                className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2"
                            >

                                {loc}

                                <span
                                    onClick={() =>
                                        setLocations(locations.filter((_, i) => i !== index))
                                    }
                                    className="cursor-pointer"
                                >
                                    ✕
                                </span>

                            </div>

                        ))}

                    </div>

                    {/* Save Button */}
                    <button className="bg-teal-200 hover:bg-teal-400 text-gray-900 px-6 py-3 rounded-lg font-semibold">
                        Save and continue
                    </button>

                </div>

            </div>

        </div>
    )
}