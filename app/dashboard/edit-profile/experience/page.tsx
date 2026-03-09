"use client"

import { useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

export default function ExperiencePage() {

    const [selectedAreas, setSelectedAreas] = useState<string[]>(["Aged care"])
    const [experienceType, setExperienceType] = useState({
        professional: true,
        personal: false
    })

    const [skills, setSkills] = useState<string[]>(["Dementia"])
    const [text, setText] = useState("")

    const toggleSkill = (skill: string) => {
        if (skills.includes(skill)) {
            setSkills(skills.filter(s => s !== skill))
        } else {
            setSkills([...skills, skill])
        }
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


                {/* Right Content */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">

                    <h2 className="text-2xl font-semibold mb-2">
                        Experience
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Select all areas that you’ve worked or have professional or personal experience in.
                    </p>


                    {/* Experience cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                        {["Aged care", "Chronic medical conditions", "Disability", "Mental health"].map((area) => (

                            <div
                                key={area}
                                onClick={() => {
                                    if (selectedAreas.includes(area)) {
                                        setSelectedAreas(selectedAreas.filter(a => a !== area))
                                    } else {
                                        setSelectedAreas([...selectedAreas, area])
                                    }
                                }}
                                className={`border rounded-lg p-4 text-center cursor-pointer
                  ${selectedAreas.includes(area)
                                        ? "bg-gray-100 border-gray-300"
                                        : "border-gray-200"}
                `}
                            >
                                {area}
                            </div>

                        ))}

                    </div>


                    {/* Details section */}
                    <p className="text-gray-600 mb-6">
                        Provide more details and describe your experience and knowledge under each area.
                    </p>


                    {/* Aged care section */}
                    <div className="mb-6">

                        <h3 className="text-lg font-semibold mb-2">
                            Aged care
                        </h3>

                        <p className="mb-4">
                            What type of experience do you have with aged care?
                        </p>


                        <div className="flex flex-col gap-2 mb-4">

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={experienceType.professional}
                                    onChange={() =>
                                        setExperienceType({
                                            ...experienceType,
                                            professional: !experienceType.professional
                                        })
                                    }
                                />
                                Professional
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={experienceType.personal}
                                    onChange={() =>
                                        setExperienceType({
                                            ...experienceType,
                                            personal: !experienceType.personal
                                        })
                                    }
                                />
                                Personal
                            </label>

                        </div>


                        <p className="mb-4">
                            Select up to three areas you have the most experience in.
                        </p>


                        <div className="flex flex-col gap-3 mb-6">

                            {["Dementia", "Parkinson's Disease"].map(skill => (

                                <div
                                    key={skill}
                                    onClick={() => toggleSkill(skill)}
                                    className={`border rounded-full px-4 py-2 text-center cursor-pointer
                    ${skills.includes(skill)
                                            ? "bg-gray-100 border-gray-300"
                                            : "border-gray-200"}
                  `}
                                >
                                    {skill}
                                </div>

                            ))}

                        </div>


                        <h4 className="font-semibold mb-2">
                            What are your key strengths, achievements and skills in aged care?
                        </h4>

                        <p className="text-gray-500 mb-3">
                            Don't include personal details or prohibited content as under our terms of use.
                        </p>


                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-3 h-32"
                            maxLength={600}
                        />


                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>Minimum 100 characters</span>
                            <span>{text.length}/600</span>
                        </div>

                    </div>


                    {/* Other areas */}
                    <div className="mb-6">

                        <h4 className="font-semibold mb-2">
                            What other areas do you know about?
                        </h4>

                        <p className="text-gray-600 mb-4">
                            This could be an area you've studied or have informal experience.
                        </p>


                        <div className="flex flex-col gap-3">

                            {["Dementia", "Parkinson's Disease"].map(skill => (

                                <label key={skill} className="flex items-center gap-2">

                                    <input
                                        type="checkbox"
                                        checked={skills.includes(skill)}
                                        onChange={() => toggleSkill(skill)}
                                    />

                                    {skill}

                                </label>

                            ))}

                        </div>

                    </div>


                    {/* Save button */}
                    <button className="bg-teal-200 hover:bg-teal-500 text-gray-900 px-8 py-3 rounded-md">
                        Save and continue
                    </button>

                </div>

            </div>

        </div>

    )
}