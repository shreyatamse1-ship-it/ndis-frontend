"use client";
import ProfileSidebar from "../../ProfileSidebar"
import {
    ChefHat,
    Film,
    PawPrint,
    Bike,
    Flower,
    Music,
    Camera,
    Umbrella,
    Puzzle,
    Globe,
    BookOpen
} from "lucide-react"

const hobbies = [
    { name: "Cooking", icon: ChefHat },
    { name: "Movies", icon: Film },
    { name: "Pets", icon: PawPrint },
    { name: "Sports", icon: Bike },
    { name: "Gardening", icon: Flower },
    { name: "Music", icon: Music },
    { name: "Photography / Art", icon: Camera },
    { name: "Travel", icon: Umbrella },
    { name: "Indoor Games / Puzzles", icon: Puzzle },
    { name: "Cultural Festivities", icon: Globe },
    { name: "Reading", icon: BookOpen },
    { name: "Other", icon: BookOpen },
]

export default function InterestsHobbiesPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* Page title */}
            <h1 className="text-2xl font-semibold mb-6">
                My profile
            </h1>

            <div className="flex flex-col md:flex-row gap-6">

                {/* LEFT SIDEBAR */}
                <div className="w-full md:w-72">
                    <ProfileSidebar />
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm p-6">

                    <h2 className="text-xl font-semibold mb-2">
                        Interests & hobbies
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Select the things that you enjoy doing. Clients are more likely to
                        find Support Workers who share similar interests.
                    </p>

                    {/* Hobby cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                        {hobbies.map((hobby, index) => {
                            const Icon = hobby.icon

                            return (
                                <button
                                    key={index}
                                    className="border border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:border-teal-400 hover:shadow-sm transition"
                                >
                                    <Icon className="mb-3 text-gray-600" size={28} />
                                    <span className="text-gray-700 text-sm">
                                        {hobby.name}
                                    </span>
                                </button>
                            )
                        })}

                    </div>

                    {/* Save button */}
                    <button className="mt-8 bg-teal-200 hover:bg-teal-500 text-gray-900 px-6 py-3 rounded-lg">
                        Save and continue
                    </button>

                </div>

            </div>
        </div>
    )
}