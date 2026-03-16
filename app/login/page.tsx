"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: any) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Email and password required");
            return;
        }

        // TEMP LOGIN
        if (email === "rose@test.com" && password === "123456") {
            localStorage.setItem("isLoggedIn", "true");
            router.push("/dashboard");
        } else {
            alert("Invalid login");
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* Top Navbar */}
            <div className="flex justify-between items-center px-8 py-4 bg-white border-b">
                <div className="text-teal-600 font-bold text-xl">
                    Melora
                </div>

                <div className="flex gap-6 items-center">
                    <button className="text-purple-600">Help center</button>
                    <button className="bg-teal-200 text-gray-900 px-4 py-2 rounded">
                        Get started
                    </button>
                </div>
            </div>

            {/* Page Heading */}
            <div className="flex flex-col items-center mt-16 mb-10">
                <h1 className="text-4xl font-bold text-gray-700">
                    Welcome to Melora
                </h1>

                <p className="text-gray-600 mt-3">
                    Log in to continue
                </p>
            </div>

            {/* Login Card */}
            <div className="flex justify-center">
                <form
                    onSubmit={handleLogin}
                    className="bg-white p-8 rounded-lg shadow-md w-[420px]"
                >
                    <h2 className="text-xl font-semibold text-center mb-6">
                        Login
                    </h2>

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 mb-4 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 mb-6 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-teal-200 text-gray-900 p-3 rounded"
                    >
                        Login
                    </button>

                </form>
            </div>

        </div>
    )
}