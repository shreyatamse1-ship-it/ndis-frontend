"use client"

import BillingTabs from "../../../components/BillingTabs"

export default function BillingPage() {

    return (

        <div className="w-full px-6 py-8">

            <h1 className="text-3xl font-semibold mb-8">
                Billing
            </h1>

            <BillingTabs />

            <div className="bg-white border rounded-xl shadow-sm p-8">

                <h2 className="text-xl font-semibold mb-3">
                    Keep track of your invoices
                </h2>

                <p className="text-gray-600 mb-4 max-w-3xl">
                    Using Mable means you have our Australia-based team taking care of your payments.
                    There's no need to invoice or chase client payments – we have it covered.
                </p>

                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">

                    <li>We generate your invoices</li>
                    <li>We invoice the organisation responsible for payment</li>
                    <li>We step in if rejected support hours are unresolved</li>

                </ul>

                <a className="text-purple-600 underline cursor-pointer">
                    Learn more
                </a>

                <div className="mt-6 overflow-x-auto">

                    <table className="w-full text-sm border rounded-lg overflow-hidden">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Invoice</th>
                                <th className="p-3 text-left">Net total</th>
                                <th className="p-3 text-left">Client</th>
                                <th className="p-3 text-left">Collection</th>
                                <th className="p-3 text-left">Payment</th>
                                <th className="p-3 text-left">Actions</th>

                            </tr>

                        </thead>

                    </table>

                </div>

            </div>

        </div>

    )
}