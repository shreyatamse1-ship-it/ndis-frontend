"use client"
import { useEffect, useState } from "react"

export default function ManageClientsPage() {
    const [appliedJobs, setAppliedJobs] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState("applied")
    const [sharedJobs, setSharedJobs] = useState([])
    const [jobsList, setJobsList] = useState([])
    useEffect(() => {
        fetch("http://localhost/ndis-backend/controllers/get_jobs.php")
            .then(res => res.json())
            .then(data => {
                setJobsList(data.jobs)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost/ndis-backend/controllers/get_shared_jobs.php?user_id=1")
            .then(res => res.json())
            .then(data => {
                console.log("SHARED:", data)
                setSharedJobs(data.jobs)
            })
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        fetch("http://localhost/ndis-backend/controllers/get_application.php?user_id=1")
            .then(res => res.json())
            .then(data => {
                console.log("APPLIED:", data)
                setAppliedJobs(data.applications)
            })
            .catch(err => console.error(err))
    }, [])
    const applyJob = (jobId: number) => {
        fetch("http://localhost/ndis-backend/controllers/apply_job.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                job_id: jobId,
                user_id: 1 // replace later with logged user
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success || data.message === "Already applied") {

                    // ✅ update UI instantly
                    setAppliedJobs(prev => {
                        if (prev.some((job: any) => job.job_id == jobId)) return prev
                        return [...prev, { job_id: jobId, status: "pending" }]
                    })


                } else {
                    console.log(data)
                }
            })
    }

    // 🔥 ADD THIS FUNCTION
    const handleAction = (id: number, status: string) => {
        fetch("http://localhost/ndis-backend/controllers/update_application_status.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                application_id: id,
                status: status
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSharedJobs(prev =>
                        prev.filter((job: any) => job.application_id !== id)
                    )
                } else {
                    alert("Update failed")
                }
            })
    }
    const isApplied = (jobId: number) => {
        return appliedJobs.some((job: any) => job.job_id == jobId)
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">

            <h1 className="text-2xl font-semibold">Manage Clients</h1>
            <p className="text-gray-500 text-sm mb-6">
                Manage applications and job assignments
            </p>
            {/* Tabs */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit mb-6">
                <button
                    onClick={() => setActiveTab("applied")}
                    className={`px-4 py-1.5 rounded-lg text-sm capitalize transition
${activeTab === "applied"
                            ? "bg-white shadow-sm font-medium"
                            : "text-gray-600 : bg-gray-100"}
`}
                >
                    Jobs Applied
                </button>

                <button
                    onClick={() => setActiveTab("shared")}
                    className={`px-4 py-2 rounded-lg ${activeTab === "shared" ? "bg-white shadow-sm font-medium text-gray-600" : "bg-gray-100"}`}
                >
                    Jobs Shared
                </button>

                <button
                    onClick={() => setActiveTab("list")}
                    className={`px-4 py-2 rounded-lg ${activeTab === "list" ? "bg-white shadow-sm font-medium text-gray-600" : "bg-gray-100"}`}
                >
                    Jobs List
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-sm p-6">

                {/* APPLIED */}
                {activeTab === "applied" && (
                    appliedJobs.length === 0 ? (
                        <p>No applied jobs yet</p>
                    ) : (
                        <div className="space-y-4">
                            {appliedJobs.map((job: any) => (
                                <div
                                    key={`${job.id}-${job.user_id || "applied"}`}   // 🔥 FIXED KEY
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5"
                                >
                                    <h3 className="font-semibold text-lg mb-1">
                                        {job.title || job.job_title}
                                    </h3>

                                    <span className={`px-3 py-1 text-xs rounded-full font-medium
  ${job.status === "accepted" && "bg-green-100 text-green-700"}
  ${job.status === "rejected" && "bg-red-100 text-red-700"}
  ${job.status === "pending" && "bg-yellow-100 text-yellow-700"}
`}>
                                        {job.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )
                )}

                {/* SHARED */}
                {activeTab === "shared" && (
                    sharedJobs.length === 0 ? (
                        <p>No jobs shared with you</p>
                    ) : (
                        <div className="space-y-6">
                            {sharedJobs.map((job: any, index: number) => (
                                <div key={`${job.id}-${index}`}   // 🔥 FIXED KEY
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5"
                                >
                                    <h3 className="font-semibold text-lg mb-1">
                                        {job.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm">
                                        {job.suburb} • {job.postcode}
                                    </p>

                                    <span className={`px-3 py-1 text-xs rounded-full font-medium mt-2 inline-block
  ${job.status === "accepted" && "bg-green-100 text-green-700"}
  ${job.status === "rejected" && "bg-red-100 text-red-700"}
  ${job.status === "pending" && "bg-yellow-100 text-yellow-700"}
`}>
                                        {job.status}
                                    </span>

                                    <div className="flex gap-3 mt-3">
                                        <button
                                            onClick={() => handleAction(job.application_id, "accepted")}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
                                        >
                                            Accept
                                        </button>

                                        <button
                                            onClick={() => handleAction(job.application_id, "rejected")}
                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm transition"
                                        >
                                            Reject
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>

                    )

                )}
                {/* JOBS LIST */}
                {activeTab === "list" && (
                    jobsList.length === 0 ? (
                        <p>No jobs available</p>
                    ) : (
                        <div className="space-y-6">
                            {jobsList.map((job: any) => (
                                <div
                                    key={job.id}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5"
                                >
                                    <h3 className="font-semibold text-lg mb-1">
                                        {job.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm">
                                        {job.suburb} • {job.postcode}
                                    </p>

                                    <button
                                        onClick={() => applyJob(job.id)}
                                        disabled={isApplied(job.id)}
                                        className={`mt-3 px-4 py-1.5 rounded-lg text-sm transition text-white
        ${isApplied(job.id)
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-purple-600 hover:bg-purple-700"}
    `}
                                    >
                                        {isApplied(job.id) ? "Applied" : "Apply"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>

    )
}
