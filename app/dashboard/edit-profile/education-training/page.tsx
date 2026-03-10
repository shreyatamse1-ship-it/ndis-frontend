"use client"

import { useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

export default function EducationTrainingPage() {

    const [courses, setCourses] = useState([{}])

    const addCourse = () => {
        setCourses([...courses, {}])
    }

    const deleteCourse = (index: number) => {
        const updated = courses.filter((_, i) => i !== index)
        setCourses(updated)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* Page Title */}
            <h1 className="text-2xl font-semibold mb-6">My profile</h1>

            {/* Layout */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Sidebar */}
                <div className="w-full lg:w-72">
                    <ProfileSidebar />
                </div>

                {/* Right Content */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">

                    <h2 className="text-xl font-semibold mb-6">
                        Education & Training
                    </h2>

                    {courses.map((_, index) => (

                        <div
                            key={index}
                            className="space-y-5 mb-10 border-b pb-6"
                        >

                            {/* Institution */}
                            <div>
                                <label className="font-medium">Institution</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-md p-3 mt-2"
                                />
                            </div>

                            {/* Degree */}
                            <div>
                                <label className="font-medium">Degree/Course</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-md p-3 mt-2"
                                />
                            </div>

                            {/* Start Date */}
                            <div>
                                <h3 className="font-semibold mb-2">Start date</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <select className="w-full border border-gray-200 rounded-md p-3">
                                        <option>Month</option>
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        <option>April</option>
                                        <option>May</option>
                                        <option>June</option>
                                        <option>July</option>
                                        <option>August</option>
                                        <option>September</option>
                                        <option>October</option>
                                        <option>November</option>
                                        <option>December</option>
                                    </select>

                                    <input
                                        type="number"
                                        placeholder="Year"
                                        className="w-full border border-gray-200 rounded-md p-3"
                                    />

                                </div>
                            </div>

                            {/* End Date */}
                            <div>
                                <h3 className="font-semibold mb-2">End date</h3>

                                <label className="flex items-center gap-2 mb-4">
                                    <input type="checkbox" />
                                    I am currently working in this course
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <select className="w-full border border-gray-200 rounded-md p-3">
                                        <option>Month</option>
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        <option>April</option>
                                        <option>May</option>
                                        <option>June</option>
                                        <option>July</option>
                                        <option>August</option>
                                        <option>September</option>
                                        <option>October</option>
                                        <option>November</option>
                                        <option>December</option>
                                    </select>

                                    <input
                                        type="number"
                                        placeholder="Year"
                                        className="w-full border border-gray-200 rounded-md p-3"
                                    />

                                </div>
                            </div>

                            {/* Delete Course */}
                            <div className="flex justify-end">

                                <button
                                    onClick={() => deleteCourse(index)}
                                    className="text-gray-600 flex items-center gap-2"
                                >
                                    🗑 Delete course
                                </button>

                            </div>

                        </div>

                    ))}

                    {/* Save Button */}
                    <button className="bg-teal-200 hover:bg-teal-500 text-gray-900 px-10 py-4 rounded-lg font-semibold transition mb-6">
                        Save and continue
                    </button>

                    {/* Add Course */}
                    <div>

                        <button
                            onClick={addCourse}
                            className="border-2 border-purple-600 text-purple-600 px-10 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
                        >
                            Add course
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}