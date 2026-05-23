"use client"

import { useEffect, useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

type Job = {
    job_title: string
    company: string
    start_month: string
    start_year: string
    end_month: string
    end_year: string
    currently_working: boolean
}

export default function WorkHistoryPage() {

    const [jobs, setJobs] = useState<Job[]>([])

    // 🔥 GET USER ID (NO HARDCODING)
    const user_id =
        typeof window !== "undefined"
            ? localStorage.getItem("user_id")
            : null

    // 🔥 INITIAL LOAD
    useEffect(() => {
        if (!user_id) return

        fetch(`http://localhost/ndis-backend/controllers/get_work_history.php?user_id=${user_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "success" && data.jobs.length > 0) {
                    setJobs(data.jobs)
                } else {
                    addJob() // start with one empty form
                }
            })
    }, [user_id])

    const addJob = () => {
        setJobs([
            ...jobs,
            {
                job_title: "",
                company: "",
                start_month: "",
                start_year: "",
                end_month: "",
                end_year: "",
                currently_working: false
            }
        ])
    }

    const deleteJob = (index: number) => {
        setJobs(jobs.filter((_, i) => i !== index))
    }

    const handleChange = <K extends keyof Job>(index: number, field: K, value: Job[K]) => {
        const updated = jobs.map((job, i) =>
            i === index ? { ...job, [field]: value } : job
        )
        setJobs(updated)
    }

    const handleSave = async () => {

        if (!user_id) {
            alert("User not logged in")
            return
        }

        try {
            const res = await fetch("http://localhost/ndis-backend/controllers/save_work_history.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: Number(user_id),
                    jobs
                })
            })

            const data = await res.json()

            if (data.status === "success") {
                alert("Work history saved ✅")
            } else {
                alert(data.message)
            }

        } catch (err) {
            console.error(err)
            alert("Something went wrong")
        }
    }

    return (

        <div className="min-h-screen bg-gray-50 p-6">

            <h1 className="text-2xl font-semibold mb-6">
                My profile
            </h1>

            <div className="flex gap-6">

                <div className="w-72">
                    <ProfileSidebar />
                </div>

                <div className="flex-1 bg-white border rounded-lg p-6">

                    <h2 className="text-2xl font-semibold mb-4">
                        Work history
                    </h2>

                    {jobs.map((job, index) => (

                        <div key={index} className="mb-10">

                            {/* Job Title */}
                            <input
                                placeholder="Job title"
                                value={job.job_title}
                                onChange={(e) => handleChange(index, "job_title", e.target.value)}
                                className="w-full border p-3 mb-4"
                            />

                            {/* Company */}
                            <input
                                placeholder="Company"
                                value={job.company}
                                onChange={(e) => handleChange(index, "company", e.target.value)}
                                className="w-full border p-3 mb-4"
                            />

                            {/* Start Date */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <select
                                    value={job.start_month}
                                    onChange={(e) => handleChange(index, "start_month", e.target.value)}
                                    className="border p-3"
                                >
                                    <option value="">Month</option>
                                    {[
                                        "January", "February", "March", "April",
                                        "May", "June", "July", "August",
                                        "September", "October", "November", "December"
                                    ].map(m => <option key={m}>{m}</option>)}
                                </select>

                                <input
                                    type="number"
                                    placeholder="Year"
                                    value={job.start_year}
                                    onChange={(e) => handleChange(index, "start_year", e.target.value)}
                                    className="border p-3"
                                />
                            </div>

                            {/* Current Job */}
                            <label className="flex gap-2 mb-3">
                                <input
                                    type="checkbox"
                                    checked={job.currently_working}
                                    onChange={(e) =>
                                        handleChange(index, "currently_working", e.target.checked)
                                    }
                                />
                                Currently working
                            </label>

                            {/* End Date */}
                            {!job.currently_working && (
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <select
                                        value={job.end_month}
                                        onChange={(e) => handleChange(index, "end_month", e.target.value)}
                                        className="border p-3"
                                    >
                                        <option value="">Month</option>
                                        {[
                                            "January", "February", "March", "April",
                                            "May", "June", "July", "August",
                                            "September", "October", "November", "December"
                                        ].map(m => <option key={m}>{m}</option>)}
                                    </select>

                                    <input
                                        type="number"
                                        placeholder="Year"
                                        value={job.end_year}
                                        onChange={(e) => handleChange(index, "end_year", e.target.value)}
                                        className="border p-3"
                                    />
                                </div>
                            )}

                            {/* Delete */}
                            <button
                                onClick={() => deleteJob(index)}
                                className="text-red-500 mb-4"
                            >
                                Delete job
                            </button>

                            <hr />
                        </div>
                    ))}

                    <button
                        onClick={handleSave}
                        className="bg-teal-300 px-6 py-3 rounded mb-4"
                    >
                        Save and continue
                    </button>

                    <button
                        onClick={addJob}
                        className="border px-6 py-3 rounded"
                    >
                        Add work history
                    </button>

                </div>
            </div>
        </div>
    )
}