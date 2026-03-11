"use client"

import Link from "next/link"

export default function NDISGuidePage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

                {/* LEFT CONTENT */}
                <div className="lg:col-span-3 space-y-10">

                    {/* PAGE TITLE */}
                    <div>
                        <h1 className="text-4xl font-bold mb-6">
                            How to apply for and link an NDIS Worker Screening Check
                        </h1>

                        <h2 className="text-2xl font-semibold mb-4">
                            A Guide to NDIS Worker Screening Checks
                        </h2>

                        <ul className="list-disc pl-6 space-y-2 text-purple-600 text-lg">
                            <li>What is an NDIS Worker Screening Check?</li>
                            <li>Do I need an NDIS Worker Screening Check?</li>
                            <li>How much will it cost?</li>
                            <li>What documents do you need?</li>
                            <li>How to apply for an NDIS Worker Screening Check</li>
                            <li>How to provide your NDIS Worker Screening Check to Melora</li>
                        </ul>
                    </div>

                    {/* SECTION */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            What is an NDIS Worker Screening Check?
                        </h2>

                        <p className="text-gray-700 text-lg leading-relaxed">
                            The NDIS Worker Screening Check is valid for 5 years and is a national
                            assessment for workers supporting people with disability or older
                            Australians.
                        </p>
                    </div>

                    {/* SECTION */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            Do I need an NDIS Worker Screening Check?
                        </h2>

                        <p className="text-gray-700 text-lg leading-relaxed">
                            New support workers signing up to Melora require an NDIS Worker
                            Screening Check. Existing workers may continue until their current
                            check expires.
                        </p>
                    </div>

                    {/* COST */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            How much will it cost?
                        </h2>

                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                            The price differs depending on the state or territory. Typical cost
                            ranges from $100 - $150.
                        </p>

                        <ul className="list-disc pl-6 space-y-2 text-purple-600 text-lg">
                            <li>New South Wales</li>
                            <li>Victoria</li>
                            <li>Queensland</li>
                            <li>Western Australia</li>
                            <li>South Australia</li>
                            <li>Tasmania</li>
                            <li>ACT</li>
                            <li>Northern Territory</li>
                        </ul>
                    </div>

                    {/* DOCUMENTS */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            What documents do I need?
                        </h2>

                        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
                            <li>Australian driver's licence</li>
                            <li>Australian passport</li>
                            <li>Birth certificate</li>
                            <li>Medicare card</li>
                            <li>Utility bill</li>
                        </ul>
                    </div>

                    {/* APPLY */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            How to apply for an NDIS Worker Screening Check
                        </h2>

                        <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-lg">
                            <li>Visit the NDIS Commission website</li>
                            <li>Apply through your state screening unit</li>
                            <li>Provide identity documents</li>
                            <li>Submit payment</li>
                        </ol>
                    </div>

                    {/* ADD TO PROFILE */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            How to add your NDIS Worker Screening Check to Melora
                        </h2>

                        <p className="text-gray-700 text-lg leading-relaxed">
                            After receiving your screening check number, add it inside your
                            profile under NDIS Worker Screening.
                        </p>
                    </div>

                    {/* RENEW */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            How to renew your NDIS Worker Screening Check
                        </h2>

                        <p className="text-gray-700 text-lg leading-relaxed">
                            Support workers can apply for a renewal of the NDIS Worker Screening
                            Check up to 90 days prior to the expiry of their WSC.
                        </p>
                    </div>

                    {/* NEXT STEPS */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            Your next steps
                        </h2>

                        <h3 className="text-xl font-semibold text-purple-600 mb-3">
                            Step 1: Renew your NDIS WSC
                        </h3>

                        <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-lg">
                            <li>
                                Click on the “Renew NDIS WSC” button below to access the NDIS
                                Commission website.
                            </li>
                            <li>Select your state or territory and follow the instructions.</li>
                            <li>
                                Make sure you select <strong>Melora Technologies Pty Ltd</strong>
                                as your employer during the renewal process.
                            </li>
                        </ol>

                        <h3 className="text-xl font-semibold text-purple-600 mt-6 mb-3">
                            Step 2: Update your profile
                        </h3>

                        <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-lg">
                            <li>
                                Once your NDIS WSC has been renewed, provide the details of your
                                renewed check to Melora again.
                            </li>
                            <li>
                                Update your profile by going to “Edit profile” and resubmitting
                                your NDIS WSC information.
                            </li>
                        </ol>
                    </div>

                </div>


                {/* RIGHT SIDEBAR */}
                <div className="lg:col-span-2">

                    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm sticky top-24">

                        <h3 className="text-xl font-semibold mb-6">
                            Related articles
                        </h3>

                        <ul className="space-y-4 text-purple-600 text-lg">

                            <li>
                                <Link href="/help/aged-care-training">
                                    Aged care competency training
                                </Link>
                            </li>

                            <li>
                                <Link href="/help/support-hours-approve">
                                    The new way to approve support hours
                                </Link>
                            </li>

                            <li>
                                <Link href="/help/support-hours-submit">
                                    The new way to submit support hours
                                </Link>
                            </li>

                            <li>
                                <Link href="/help/badges-unlock-work">
                                    Badges: unlock more work opportunities
                                </Link>
                            </li>

                            <li>
                                <Link href="/help/badges-confidence">
                                    Badges: build confidence
                                </Link>
                            </li>

                        </ul>

                    </div>

                </div>

            </div>
        </div>
    )
}