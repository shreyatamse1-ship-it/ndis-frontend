"use client"

import BillingTabs from "../../../../components/BillingTabs"

export default function TaxPage() {

    return (

        <div className="w-full px-6 py-8">

            <h1 className="text-3xl font-semibold mb-8">
                Billing
            </h1>

            <BillingTabs />

            <div className="bg-white border rounded-xl shadow-sm p-8 max-w-5xl">

                <h2 className="text-xl font-semibold mb-3">
                    Indicative tax calculator
                </h2>

                <p className="text-gray-600 mb-4">
                    Choose a date range and percentage of your payments to set aside for tax.
                </p>

                <label className="block font-medium mb-2">
                    Tax rate %
                </label>

                <input
                    type="number"
                    defaultValue="20"
                    className="border p-3 rounded w-32 mb-6"
                />

                <div className="grid md:grid-cols-2 gap-8 mb-6">

                    <div>

                        <h3 className="font-semibold mb-2">From</h3>

                        <div className="grid grid-cols-3 gap-3">

                            <input className="border p-2 rounded" placeholder="Day" />
                            <input className="border p-2 rounded" placeholder="Month" />
                            <input className="border p-2 rounded" placeholder="Year" />

                        </div>

                    </div>

                    <div>

                        <h3 className="font-semibold mb-2">To</h3>

                        <div className="grid grid-cols-3 gap-3">

                            <input className="border p-2 rounded" placeholder="Day" />
                            <input className="border p-2 rounded" placeholder="Month" />
                            <input className="border p-2 rounded" placeholder="Year" />

                        </div>

                    </div>

                </div>

                <button className="bg-teal-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-teal-500">
                    Calculate
                </button>

            </div>

        </div>

    )
}