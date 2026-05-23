"use client"

import { useState, useEffect } from "react"

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "http://127.0.0.1/ndis-backend"

export default function AccountPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const userId = localStorage.getItem("user_id")

                if (!userId) {
                    throw new Error("User not logged in")
                }

                const response = await fetch(
                    `${apiBaseUrl}/controllers/get_account.php?user_id=${userId}`
                )

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                setEmail(data.email || "")

                // ❌ Removed unsafe password autofill

            } catch (error) {
                console.error("Error fetching account data:", error)
                setError("Failed to load account data. Please try again.")
            } finally {
                setLoading(false)
            }
        }
        fetchAccount()
    }, [])

    const handleSave = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match!")
            return
        }
        setSaving(true)
        setError("")
        try {
            const response = await fetch(`${apiBaseUrl}/controllers/update_account.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    user_id: Number(localStorage.getItem("user_id")) // ✅ FIXED
                })
            })

            const text = await response.text()
            console.log("SERVER RESPONSE:", text)

            if (!response.ok) {
                throw new Error(text)
            }

            const data = JSON.parse(text)
            alert("Account updated successfully!")
            setPassword("")
            setConfirmPassword("")
        } catch (error) {
            console.error("Error updating account:", error)
            setError("Failed to update account. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-10 flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                        <p className="text-slate-600 font-medium text-sm">Loading account data...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Account Settings</h1>
                    <p className="text-slate-600 text-lg font-normal">Manage your email and password securely</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-10">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg">
                            <p className="font-medium text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form Container */}
                    <div className="space-y-7">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                Email Address
                            </label>
                            <input
                                className="w-full border border-slate-300 bg-white rounded-lg p-3.5 text-slate-900 text-sm placeholder-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 focus:border-transparent transition-all duration-150"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                New Password
                            </label>
                            <div className="flex border border-slate-300 rounded-lg overflow-hidden hover:border-slate-400 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all duration-150">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="flex-1 p-3.5 outline-none text-slate-900 text-sm placeholder-slate-400 bg-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Leave blank to keep current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="px-4 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors duration-150"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="w-full border border-slate-300 bg-white rounded-lg p-3.5 text-slate-900 text-sm placeholder-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 focus:border-transparent transition-all duration-150"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter your password"
                            />
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full mt-8 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-150 shadow-sm hover:shadow-md disabled:shadow-none"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}