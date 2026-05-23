"use client"

import { useEffect, useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

type Course = {
    institution: string
    course: string
    start_month: string
    start_year: string
    end_month: string
    end_year: string
    currently_studying: boolean
}

export default function EducationPage() {

    const [courses, setCourses] = useState<Course[]>([])

    const user_id =
        typeof window !== "undefined"
            ? localStorage.getItem("user_id")
            : null

    useEffect(() => {
        if (!user_id) return

        fetch(`http://localhost/ndis-backend/controllers/get_education.php?user_id=${user_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "success" && data.courses.length > 0) {
                    setCourses(data.courses)
                } else {
                    addCourse()
                }
            })
    }, [user_id])

    const addCourse = () => {
        setCourses([
            ...courses,
            {
                institution: "",
                course: "",
                start_month: "",
                start_year: "",
                end_month: "",
                end_year: "",
                currently_studying: false
            }
        ])
    }

    const deleteCourse = (index: number) => {
        setCourses(courses.filter((_, i) => i !== index))
    }

    const handleChange = (index: number, field: keyof Course, value: string | boolean) => {
        const updated = [...courses]
        updated[index] = { ...updated[index], [field]: value }
        setCourses(updated)
    }

    const handleSave = async () => {

        if (!user_id) {
            alert("User not logged in")
            return
        }

        const res = await fetch("http://localhost/ndis-backend/controllers/save_education.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: Number(user_id),
                courses
            })
        })

        const data = await res.json()

        if (data.status === "success") {
            alert("Saved ✅")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="flex gap-6">

                <div className="w-72">
                    <ProfileSidebar />
                </div>

                <div className="flex-1 bg-white p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Education & Training
                    </h2>

                    {courses.map((c, i) => (

                        <div key={i} className="mb-8">

                            <input
                                placeholder="Institution"
                                value={c.institution}
                                onChange={(e) => handleChange(i, "institution", e.target.value)}
                                className="w-full border p-3 mb-3"
                            />

                            <input
                                placeholder="Course"
                                value={c.course}
                                onChange={(e) => handleChange(i, "course", e.target.value)}
                                className="w-full border p-3 mb-3"
                            />

                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <input
                                    placeholder="Start Month"
                                    value={c.start_month}
                                    onChange={(e) => handleChange(i, "start_month", e.target.value)}
                                    className="border p-3"
                                />
                                <input
                                    placeholder="Start Year"
                                    value={c.start_year}
                                    onChange={(e) => handleChange(i, "start_year", e.target.value)}
                                    className="border p-3"
                                />
                            </div>

                            <label className="flex gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={c.currently_studying}
                                    onChange={(e) =>
                                        handleChange(i, "currently_studying", e.target.checked)
                                    }
                                />
                                Currently studying
                            </label>

                            {!c.currently_studying && (
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <input
                                        placeholder="End Month"
                                        value={c.end_month}
                                        onChange={(e) => handleChange(i, "end_month", e.target.value)}
                                        className="border p-3"
                                    />
                                    <input
                                        placeholder="End Year"
                                        value={c.end_year}
                                        onChange={(e) => handleChange(i, "end_year", e.target.value)}
                                        className="border p-3"
                                    />
                                </div>
                            )}

                            <button onClick={() => deleteCourse(i)} className="text-red-500">
                                Delete
                            </button>

                            <hr className="mt-4" />
                        </div>
                    ))}

                    <button onClick={handleSave} className="bg-teal-300 px-6 py-2 mr-4">
                        Save and continue
                    </button>

                    <button onClick={addCourse} className="border px-6 py-2">
                        Add course
                    </button>

                </div>
            </div>
        </div>
    )
}