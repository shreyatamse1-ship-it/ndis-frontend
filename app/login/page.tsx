"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("LOGIN CLICKED", email, password);

        const res = await fetch(
            "http://localhost/ndis-backend/index.php?route=login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const text = await res.text();
        console.log("RAW RESPONSE:", text);

        const data = text ? JSON.parse(text) : {};
        console.log("RESPONSE:", data);

        if (!data.success) {
            alert(data.message);
            return;
        }

        const user = data.user;
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", data.role);

        if (data.role === "support_worker") {
            router.push("/dashboard/jobs");
        } else {
            router.push("/dashboard/participant");
        }
    };
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl rounded-[32px] bg-white shadow-2xl overflow-hidden sm:min-h-[560px]">
                <div className="flex flex-col sm:flex-row">
                    {/* Left Section - Login Form */}
                    <div className="sm:w-1/2 bg-white flex flex-col justify-center px-10 py-10 sm:py-12">
                        <div className="max-w-md mx-auto">
                            {/* Heading */}
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                                Welcome back
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Login to your Melora account
                            </p>

                            {/* Form */}
                            <form onSubmit={handleLogin} className="space-y-4">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-medium text-gray-900">
                                            Password
                                        </label>
                                        <a href="#" className="text-sm text-gray-900 hover:underline">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Sign In Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition"
                                >
                                    Sign in
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <p className="px-3 text-sm text-gray-500">Or continue with</p>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <button className="w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition flex justify-center items-center">
                                    <span className="text-lg font-semibold text-gray-700">G</span>
                                </button>
                                <button className="w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition flex justify-center items-center">
                                    <span className="text-lg font-semibold text-gray-700">in</span>
                                </button>
                            </div>

                            {/* Sign Up Link */}
                            <p className="text-center text-sm text-gray-700">
                                Don't have an account?{" "}
                                <a href="/signup" className="font-semibold text-gray-900 hover:underline">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Right Section - Branding */}
                    <div className="sm:w-1/2 bg-gradient-to-br from-teal-300 to-cyan-200 flex flex-col items-center justify-center relative px-8 py-10 sm:py-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.5),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.45),_transparent_35%)]"></div>
                        <div className="relative z-10 text-center">
                            <div className="flex justify-center mb-5">
                                <div className="relative w-16 h-16">
                                    <div className="absolute w-10 h-10 border-4 border-teal-700 rounded-full left-0 top-0"></div>
                                    <div className="absolute w-10 h-10 border-4 border-teal-700 rounded-full right-0 top-0"></div>
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold text-teal-800">
                                Melora
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}