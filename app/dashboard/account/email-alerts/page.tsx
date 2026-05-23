"use client"

import { useState, useEffect } from "react"

// ✅ API BASE
const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost/ndis-backend/controllers"

// ✅ TYPE DEFINITIONS
type PrefKey =
    | "agreements"
    | "jobs"
    | "messages"
    | "reminders"
    | "supportHours"

type Preferences = Record<PrefKey, boolean>

export default function EmailAlerts() {

    // ✅ STATE
    const [prefs, setPrefs] = useState<Preferences>({
        agreements: true,
        jobs: true,
        messages: true,
        reminders: true,
        supportHours: true
    })

    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const userId =
        typeof window !== "undefined"
            ? localStorage.getItem("user_id")
            : null

    const labels: { key: PrefKey; text: string }[] = [
        { key: "agreements", text: "agreements" },
        { key: "jobs", text: "posted jobs" },
        { key: "messages", text: "messages" },
        { key: "reminders", text: "planned session reminder emails" },
        { key: "supportHours", text: "support hours" }
    ]

    // ✅ FETCH PREFERENCES
    const fetchPrefs = async () => {
        if (!userId) return

        try {
            const res = await fetch(
                `${apiBaseUrl}/get_email_preferences.php?user_id=${userId}`
            )

            const data = await res.json()

            if (data.status === "success") {
                setPrefs(data.preferences)
            }
        } catch (err) {
            console.error("Fetch error:", err)
        }
    }

    useEffect(() => {
        fetchPrefs()
    }, [userId])

    // ✅ HANDLE CHECKBOX CHANGE
    const handleChange = (key: PrefKey) => {
        setPrefs(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    // ✅ SAVE PREFERENCES
    const handleSave = async () => {
        if (!userId) {
            alert("User not logged in")
            return
        }

        setLoading(true)
        setSuccess("")

        try {
            const res = await fetch(
                `${apiBaseUrl}/update_email_preferences.php`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        ...prefs
                    })
                }
            )

            const data = await res.json()

            if (data.status === "success") {
                setSuccess("Preferences saved successfully ✅")

                // optional: auto clear message
                setTimeout(() => setSuccess(""), 3000)
            } else {
                setSuccess("Failed to save ❌")
            }

        } catch (err) {
            console.error(err)
            setSuccess("Server error ❌")
        }

        setLoading(false)
    }

    // ✅ UI
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Email Alerts</h1>
                    <p className="text-slate-600 text-lg font-normal">Choose which emails you'd like to receive</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-10">
                    {/* Success Message */}
                    {success && (
                        <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-400 text-green-700 rounded-lg">
                            <p className="font-medium text-sm">{success}</p>
                        </div>
                    )}

                    {/* Preferences Container */}
                    <div className="space-y-4 mb-10">
                        {labels.map((item) => (
                            <label key={item.key} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={prefs[item.key]}
                                    onChange={() => handleChange(item.key)}
                                    className="w-5 h-5 mt-0.5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                                />
                                <span className="text-slate-800 text-sm font-medium leading-relaxed">I would like to receive emails about <span className="text-indigo-600 font-semibold">{item.text}</span>.</span>
                            </label>
                        ))}
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-150 shadow-sm hover:shadow-md disabled:shadow-none"
                    >
                        {loading ? "Saving..." : "Save Preferences"}
                    </button>
                </div>
            </div>
        </div>
    )
}