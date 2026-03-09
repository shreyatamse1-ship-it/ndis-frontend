"use client"

import { useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

export default function WorkHistoryPage() {

    const [jobs, setJobs] = useState([1])

    const addJob = () => {
        setJobs([...jobs, jobs.length + 1])
    }

    const deleteJob = (index: number) => {
        const updated = jobs.filter((_, i) => i !== index)
        setJobs(updated)
    }

    return (

        <div className="min-h-screen bg-gray-50 p-6">

            <h1 className="text-2xl font-semibold mb-6">
                My profile
            </h1>

            <div className="flex gap-6">

                {/* Sidebar */}

                <div className="w-72">
                    <ProfileSidebar />
                </div>


                {/* Right Content */}

                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">


                    <h2 className="text-2xl font-semibold mb-2">
                        Work history
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Enter your work history and experience in the the last five years.
                    </p>


                    {jobs.map((job, index) => (

                        <div key={index} className="mb-10">

                            {/* Job title */}

                            <label className="block mb-1 font-medium">
                                Job title/role
                            </label>

                            <input
                                className="w-full border border-gray-200 rounded-md p-3 mb-4"
                            />


                            {/* Company */}

                            <label className="block mb-1 font-medium">
                                Company
                            </label>

                            <input
                                className="w-full border border-gray-200 rounded-md p-3 mb-6"
                            />


                            {/* Start Date */}

                            <label className="block font-medium mb-2">
                                Start date
                            </label>

                            <div className="grid grid-cols-2 gap-4 mb-6">



                                <select className="border border-gray-200 rounded-md p-3 w-full">
                                    <option>month</option>
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
                                    min="1900"
                                    max="2100"
                                    className="border border-gray-200 rounded-md p-3 w-full"
                                />

                            </div>


                            {/* End Date */}

                            <label className="block font-medium mb-2">
                                End date
                            </label>

                            <div className="flex items-center gap-2 mb-4">
                                <input type="checkbox" />
                                <span>I am currently working in this role</span>
                            </div>


                            <div className="grid grid-cols-2 gap-4 mb-6">


                                <select className="border border-gray-200 rounded-md p-3 w-full">
                                    <option>month</option>
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
                                    min="1900"
                                    max="2100"
                                    className="border border-gray-200 rounded-md p-3 w-full"
                                />

                            </div>


                            {/* Delete Job */}

                            <div className="flex justify-end text-gray-500 mb-6">

                                <button
                                    onClick={() => deleteJob(index)}
                                    className="flex items-center gap-2"
                                >
                                    🗑 Delete job
                                </button>

                            </div>

                            <hr className="mb-6" />

                        </div>

                    ))}


                    {/* Save button */}

                    <button className="bg-teal-200 text-gray-900 px-8 py-3 rounded-md mb-6">
                        Save and continue
                    </button>


                    {/* Add Work History */}

                    <div>

                        <button
                            onClick={addJob}
                            className="border-8 border-purple-600 text-purple-600 bg-purple-50 hover:bg-purple-600 px-8 py-3 rounded-md"
                        >
                            Add work history
                        </button>

                    </div>


                </div>

            </div>

        </div>

    )
}