"use client"

import { useState } from "react"

export default function AccountPage() {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="bg-white border rounded-xl shadow-sm p-6 md:p-8">

            <label className="block font-medium mb-2">Email</label>

            <input
                className="w-full border rounded-md p-3 mb-6"
                defaultValue="avicole3@gmail.com"
            />

            <label className="block font-medium mb-2">Password</label>

            <div className="flex border rounded-md overflow-hidden mb-6">
                <input
                    type={showPassword ? "text" : "password"}
                    className="flex-1 p-3 outline-none"
                />

                <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 text-purple-600"
                >
                    Show
                </button>
            </div>

            <label className="block font-medium mb-2">Confirm password</label>

            <input
                type="password"
                className="w-full border rounded-md p-3 mb-6"
            />

            <button className="bg-teal-200 hover:bg-teal-500 text-gray-900 px-6 py-3 rounded-lg">
                Save
            </button>

        </div>
    )
}