"use client"

import { useEffect, useState } from "react"

const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost/ndis-backend/controllers"

export default function PhoneSMSPage() {
    const [phone, setPhone] = useState("")
    const [smsNotify, setSmsNotify] = useState(false)

    const userId = typeof window !== "undefined"
        ? localStorage.getItem("user_id")
        : null

    // 🔹 Fetch existing data
    useEffect(() => {
        if (!userId) return

        fetch(`${apiBaseUrl}/get_phone.php?user_id=${userId}`)
            .then(res => res.json())
            .then(data => {
                setPhone(data.phone || "")
                setSmsNotify(data.sms_notify == 1)
            })
            .catch(err => console.error(err))
    }, [userId])

    // 🔹 Save function
    const handleSave = async () => {
        console.log("clicked")

        if (!userId) {
            alert("User not logged in")
            return
        }

        try {
            const res = await fetch(`${apiBaseUrl}/update_phone.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId,
                    phone,
                    sms_notify: smsNotify ? 1 : 0
                })
            })

            const data = await res.json()

            if (data.status === "success") {
                alert("Saved ✅")
            } else {
                alert("Failed ❌")
            }

        } catch (err) {
            console.error(err)
            alert("Error occurred")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Phone & SMS Notifications</h1>
                    <p className="text-slate-600 text-lg font-normal">Manage your phone number and SMS preferences</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-10">
                    <div className="space-y-8">
                        {/* Phone Number Field */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                Phone Number
                            </label>
                            <input
                                className="w-full border border-slate-300 bg-white rounded-lg p-3.5 text-slate-900 text-sm placeholder-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 focus:border-transparent transition-all duration-150"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <p className="text-slate-600 text-sm mt-3 p-3.5 bg-blue-50 border border-blue-200 rounded-lg">
                                💡 The free Melora app is preferred for notifications.
                            </p>
                        </div>

                        {/* SMS Notification Checkbox */}
                        <div className="pt-2">
                            <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-150 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={smsNotify}
                                    onChange={(e) => setSmsNotify(e.target.checked)}
                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                                />
                                <span className="text-slate-800 text-sm font-medium">Receive SMS when <span className="text-indigo-600 font-semibold">notifications are sent</span></span>
                            </label>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-150 shadow-sm hover:shadow-md"
                        >
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}