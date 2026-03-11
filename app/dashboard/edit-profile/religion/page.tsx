"use client"

import { useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

export default function ReligionPage() {

    const religions = [
        "Anglican",
        "Hindu",
        "Russian Orthodox",
        "Buddhist",
        "Islamic",
        "Sikh",
        "Catholic",
        "Jewish",
        "Spiritual",
        "Christian – other",
        "None",
        "Uniting Church",
        "Greek Orthodox",
        "Presbyterian",
        "Other"
    ]

    const [selected, setSelected] = useState<string[]>([])

    const toggleReligion = (religion: string) => {
        setSelected(prev =>
            prev.includes(religion)
                ? prev.filter(r => r !== religion)
                : [...prev, religion]
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
                            Religion
                        </h1>

                        <p className="text-gray-600 mb-8">
                            Select your religion, this will help clients search for
                            Support Workers who share their religion.
                        </p>


                        {/* Religion Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">

                            {religions.map(religion => (
                                <button
                                    key={religion}
                                    onClick={() => toggleReligion(religion)}
                                    className={`
                    border rounded-full px-4 py-3 text-sm transition
                    ${selected.includes(religion)
                                            ? "bg-purple-100 border-purple-500 text-purple-700"
                                            : "border-gray-300 hover:border-purple-400"
                                        }
                  `}
                                >
                                    {religion}
                                </button>
                            ))}

                        </div>


                        {/* Save Button */}
                        <button className="bg-teal-200 hover:bg-teal-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg">
                            Save and continue
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}