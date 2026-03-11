"use client"

import Link from "next/link"
import ProfileSidebar from "../../ProfileSidebar"

export default function GoodToKnowPage() {
    return (

        <div className="flex flex-col lg:flex-row gap-8 p-6 bg-gray-50 min-h-screen">

            {/* LEFT SIDEBAR */}

            <div className="lg:w-1/4">
                <ProfileSidebar />
            </div>


            {/* RIGHT CONTENT */}

            <div className="lg:w-3/4">

                <h1 className="text-3xl font-semibold mb-6">
                    Good to know
                </h1>


                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <h2 className="text-xl font-semibold mb-2">
                        LGBTQIA+ Inclusiveness
                    </h2>

                    <p className="text-gray-600 mb-4">
                        Melora is LGBTQIA+ inclusive and recognises the importance of
                        personalised and respectful support for everyone.
                    </p>

                    <Link
                        href="/help/lgbtqia-inclusiveness"
                        className="text-purple-600 font-medium hover:underline"
                    >
                        Read more →
                    </Link>

                </div>

            </div>

        </div>
    )
}