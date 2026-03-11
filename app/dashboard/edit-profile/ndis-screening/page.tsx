"use client"

import Link from "next/link"
import ProfileSidebar from "../../ProfileSidebar"

export default function NDISWorkerScreeningPage() {

    return (

        <div className="flex flex-col lg:flex-row gap-8 p-6 bg-gray-50 min-h-screen">

            {/* SIDEBAR */}

            <div className="lg:w-1/4">
                <ProfileSidebar />
            </div>


            {/* MAIN CONTENT */}

            <div className="lg:w-3/4 space-y-6">

                <h1 className="text-3xl font-semibold">
                    NDIS Worker Screening Check
                </h1>

                <p className="text-gray-600 max-w-3xl">
                    The NDIS Worker Screening Check (NDIS WSC) is a national assessment
                    recognised in the NDIS and Aged Care sectors. This check is mandatory
                    on Mable.
                </p>


                {/* INFO BOX */}

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 max-w-3xl">

                    <h3 className="font-semibold text-lg mb-4">
                        Action required: submit your NDIS Worker Screening Check
                    </h3>

                    <p className="text-gray-700 mb-4">
                        As part of our improved safety monitoring, we require you to
                        provide your check details again.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 space-y-2">

                        <li>Your NDIS Worker Screening Check number</li>

                        <li>
                            Your full name and date of birth exactly as they appear on the check
                        </li>

                    </ul>

                    <p className="mt-4 text-gray-700">
                        If you don’t have an NDIS Worker Screening Check, you'll need to apply for one.
                    </p>


                    {/* NAVIGATION LINK */}

                    <Link
                        href="/help/ndis-guide"
                        className="text-purple-600 underline font-medium mt-3 inline-block"
                    >
                        Learn how to apply
                    </Link>

                </div>


                {/* BUTTON */}

                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                    Provide NDIS WSC
                </button>

            </div>

        </div>
    )
}