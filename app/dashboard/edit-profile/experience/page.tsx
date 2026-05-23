"use client"

import { useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

export default function ExperiencePage() {

    const [selectedAreas, setSelectedAreas] = useState<string[]>([])

    const [experienceType, setExperienceType] = useState<"professional" | "personal" | "">("professional")

    const [topSkills, setTopSkills] = useState<string[]>([])
    const [otherSkills, setOtherSkills] = useState<string[]>([])

    const [text, setText] = useState("")

    // Toggle for top 3 skills
    const toggleTopSkill = (skill: string) => {
        if (topSkills.includes(skill)) {
            setTopSkills(topSkills.filter(s => s !== skill))
        } else {
            if (topSkills.length >= 3) {
                alert("Max 3 allowed")
                return
            }
            setTopSkills([...topSkills, skill])
        }
    }

    // Toggle for other areas
    const toggleOtherSkill = (skill: string) => {
        if (otherSkills.includes(skill)) {
            setOtherSkills(otherSkills.filter(s => s !== skill))
        } else {
            setOtherSkills([...otherSkills, skill])
        }
    }
    const handleSave = async () => {

        const payload = {
            user_id: 1,

            experience_type: "professional",

            aged_care: 1,
            chronic_conditions: 0,
            disability: 0,
            mental_health: 0,

            top_areas: ["Dementia"],
            strengths: "I have over 2 years of experience working with elderly patients in dementia care, providing support and assistance.",
            other_areas: []
        };

        try {
            const res = await fetch("http://localhost/ndis-backend/controllers/save_experience.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const text = await res.text();
            console.log("RAW RESPONSE:", text);

            const data = JSON.parse(text);

            console.log("PARSED:", data);

            if (data.status === "success") {
                alert("Saved successfully ✅");
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.error("ERROR:", err);
            alert("Something broke");
        }
    };




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

                {/* Main */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">

                    <h2 className="text-2xl font-semibold mb-2">
                        Experience
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Select all areas you've worked in
                    </p>

                    {/* AREA SELECT */}
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
                                        : "border-gray-200"}`}
                            >
                                {area}
                            </div>

                        ))}
                    </div>

                    {/* EXPERIENCE TYPE */}
                    <div className="mb-6">

                        <h3 className="font-semibold mb-2">Experience Type</h3>

                        <div className="flex gap-4">

                            <button
                                onClick={() => setExperienceType("professional")}
                                className={`px-4 py-2 border rounded 
                                ${experienceType === "professional" ? "bg-gray-200" : ""}`}
                            >
                                Professional
                            </button>

                            <button
                                onClick={() => setExperienceType("personal")}
                                className={`px-4 py-2 border rounded 
                                ${experienceType === "personal" ? "bg-gray-200" : ""}`}
                            >
                                Personal
                            </button>

                        </div>

                    </div>

                    {/* TOP SKILLS */}
                    <div className="mb-6">

                        <h3 className="font-semibold mb-2">
                            Top 3 Experience Areas
                        </h3>

                        {["Dementia", "Parkinson's Disease"].map(skill => (

                            <div
                                key={skill}
                                onClick={() => toggleTopSkill(skill)}
                                className={`border rounded-full px-4 py-2 mb-2 cursor-pointer
                                ${topSkills.includes(skill)
                                        ? "bg-gray-200"
                                        : ""}`}
                            >
                                {skill}
                            </div>

                        ))}

                    </div>

                    {/* TEXT */}
                    <div className="mb-6">

                        <h4 className="font-semibold mb-2">
                            Strengths & Achievements
                        </h4>

                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full border p-3 rounded"
                            maxLength={600}
                        />

                        <div className="text-sm text-gray-500 mt-1">
                            {text.length}/600
                        </div>

                    </div>

                    {/* OTHER AREAS */}
                    <div className="mb-6">

                        <h4 className="font-semibold mb-2">
                            Other Areas
                        </h4>

                        {["Dementia", "Parkinson's Disease"].map(skill => (

                            <label key={skill} className="flex gap-2 mb-2">

                                <input
                                    type="checkbox"
                                    checked={otherSkills.includes(skill)}
                                    onChange={() => toggleOtherSkill(skill)}
                                />

                                {skill}

                            </label>

                        ))}

                    </div>

                    <button
                        onClick={handleSave}
                        className="bg-teal-300 hover:bg-teal-500 px-6 py-3 rounded"
                    >
                        Save and continue
                    </button>

                </div>
            </div>
        </div>
    )
}