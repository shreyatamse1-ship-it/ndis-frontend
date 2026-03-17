"use client";

import { useRouter } from "next/navigation";

export default function Signup() {

    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-lg shadow-md w-[500px] text-center">

                <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
                <p className="text-gray-600 mb-8">
                    What brings you to Melore?
                </p>

                <div className="flex flex-col gap-4">

                    <button
                        onClick={() => router.push("/signup/find-support")}
                        className="border p-4 rounded-lg text-left hover:bg-gray-50"
                    >
                        Find support →
                    </button>

                    <button
                        onClick={() => router.push("/signup/provide-support")}
                        className="border p-4 rounded-lg text-left hover:bg-gray-50"
                    >
                        Provide support →
                    </button>

                </div>

            </div>

        </div>
    );
}