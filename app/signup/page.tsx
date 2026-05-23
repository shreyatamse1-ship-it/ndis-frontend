"use client";

import { useRouter } from "next/navigation";

export default function Signup() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl rounded-4xl overflow-hidden shadow-2xl bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-10 lg:p-14">
                        <div className="mb-8">
                            <p className="text-sm uppercase tracking-[0.3em] text-teal-600 font-semibold mb-3">
                                Create your account
                            </p>
                            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                                Get started with Melora
                            </h1>
                            <p className="text-gray-500 text-base sm:text-lg max-w-xl">
                                Choose whether you need support or want to provide support, then continue with the signup flow.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => router.push("/signup/find-support?role=participant")}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:border-teal-400 hover:bg-teal-50"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-semibold text-slate-900">Find support</p>
                                        <p className="text-sm text-slate-500">I need help finding a support worker.</p>
                                    </div>
                                    <span className="text-teal-600 text-xl">→</span>
                                </div>
                            </button>

                            <button
                                onClick={() => router.push("/signup/provide-support?role=support_worker")}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:border-teal-400 hover:bg-teal-50"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-semibold text-slate-900">Provide support</p>
                                        <p className="text-sm text-slate-500">I want to sign up as a support worker.</p>
                                    </div>
                                    <span className="text-teal-600 text-xl">→</span>
                                </div>
                            </button>
                        </div>

                        <div className="mt-10 text-sm text-slate-500">
                            <p className="mb-2">Already have an account?</p>
                            <button
                                onClick={() => router.push("/login")}
                                className="text-teal-700 font-semibold hover:underline"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>

                    <div className="relative bg-linear-to-br from-teal-300 to-cyan-200 p-10 lg:p-14 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.4),transparent_30%)]"></div>
                        <div className="relative z-10 text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-teal-700 bg-white/30">
                                <div className="relative w-12 h-12">
                                    <div className="absolute left-0 top-0 h-8 w-8 rounded-full border-4 border-teal-700"></div>
                                    <div className="absolute right-0 top-0 h-8 w-8 rounded-full border-4 border-teal-700"></div>
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold text-teal-900 mb-3">Melora</h2>
                            <p className="max-w-sm text-slate-800 leading-7">
                                A calm and simple starting point for the Melora signup experience. Choose the option that fits your role and continue with the next step.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}