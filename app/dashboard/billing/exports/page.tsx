"use client"

import BillingTabs from "../../../../components/BillingTabs"

export default function ExportsPage() {

    return (

        <div className="w-full px-6 py-8">

            <h1 className="text-3xl font-semibold mb-8">
                Billing
            </h1>

            <BillingTabs />

            <div className="bg-white border rounded-xl shadow-sm p-8 max-w-4xl">

                <p className="text-gray-700 mb-4">
                    Export your support hours in CSV format.
                </p>

                <p className="text-gray-600 mb-6">
                    The report will not include sessions that have not yet been paid to you.
                </p>

                <button className="bg-teal-200 text-gray-900  px-6 py-3 rounded-lg">
                    Support hours
                </button>

            </div>

        </div>

    )
}