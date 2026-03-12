"use client"

import BillingTabs from "../../../../components/BillingTabs"

export default function PaymentsPage() {

    return (

        <div className="w-full px-6 py-8">

            <h1 className="text-3xl font-semibold mb-8">
                Billing
            </h1>

            <BillingTabs />

            <div className="bg-white border rounded-xl shadow-sm p-8">

                <p className="text-gray-600">
                    Keep track of your incoming payments below.
                </p>

            </div>

        </div>

    )
}