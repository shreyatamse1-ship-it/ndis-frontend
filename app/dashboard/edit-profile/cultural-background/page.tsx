"use client"

import { useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

export default function CulturalBackgroundPage() {

    const cultures = [
        "Australian",
        "Other Oceanian",
        "North American",
        "Australian Aboriginal",
        "Western European",
        "South American",
        "Australian South East Islander",
        "Northern European",
        "Central American",
        "Torres Strait Islander",
        "Southern & Eastern European",
        "Carribbean Islander",
        "New Zealander",
        "Middle Eastern",
        "South African",
        "Maori",
        "Jewish",
        "Other African",
        "Polynesian",
        "Asian"
    ]

    const [selected, setSelected] = useState<string[]>([])

    const toggle = (culture: string) => {
        setSelected(prev =>
            prev.includes(culture)
                ? prev.filter(item => item !== culture)
                : [...prev, culture]
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                {/* Sidebar */}
                <div className="lg:w-1/4">
                    <ProfileSidebar />
                </div>


                {/* Main Content */}
                <div className="lg:w-3/4">

                    <div className="bg-white rounded-xl shadow-sm p-8">

                        <h1 className="text-3xl font-semibold mb-4">
                            Cultural background
                        </h1>

                        <p className="text-gray-600 mb-8">
                            Select your cultural background, this will help clients search for
                            Support Workers who share a similar cultural background.
                        </p>


                        {/* Culture Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">

                            {cultures.map(culture => (
                                <button
                                    key={culture}
                                    onClick={() => toggle(culture)}
                                    className={`
                    border rounded-full px-4 py-3 text-sm transition
                    ${selected.includes(culture)
                                            ? "bg-purple-100 border-purple-500 text-purple-700"
                                            : "border-gray-300 hover:border-purple-400"
                                        }
                  `}
                                >
                                    {culture}
                                </button>
                            ))}

                        </div>


                        {/* Save Button */}
                        <button className="bg-teal-200 hover:bg-teal-500 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg">
                            Save and continue
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}