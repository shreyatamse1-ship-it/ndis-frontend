"use client";

import Link from "next/link";
import BillingTabs from "../../../../components/BillingTabs";

export default function BusinessIncomePage() {
    return (
        <div className="w-full px-6 py-8">

            {/* Page Title */}
            <h1 className="text-3xl font-semibold mb-6">
                Billing
            </h1>

            {/* Tabs */}
            <BillingTabs />

            {/* Purple Section */}
            <div className="bg-teal-100 rounded-xl p-8 mt-6">
                <h2 className="text-xl font-semibold mb-3">
                    Be future savvy with Tax & super sync
                </h2>

                <p className="text-gray-700 mb-6 max-w-4xl">
                    Save for <strong>tax time or retirement</strong> without the stress.
                    Make business admin easy with regular automated tax and super
                    contributions into a bank account of your choosing.
                </p>

                <Link
                    href="/dashboard/billing/tax-super-sync"
                    className="bg-teal-300 text-gray-900 px-6 py-3 rounded-lg inline-block hover:bg-teal-600 transition"
                >
                    Get started now
                </Link>
            </div>

            {/* Business Net Income Summary Card */}
            <div className="bg-gray-100 rounded-xl p-8 mt-8">

                <h2 className="text-2xl font-semibold mb-6">
                    Business Net Income Summary
                </h2>

                <p className="text-gray-700 mb-4">
                    To assist you in preparing your tax return each financial year,
                    Mable provides a summary of the net business income paid to you by
                    your clients.
                </p>

                <p className="text-gray-700 mb-4">
                    The net income statement factors in the support worker platform fee
                    and will show the business income generated directly from your
                    clients, less the support worker platform fee.
                </p>

                <p className="text-gray-700 mb-4">
                    The summary is usually available for download by mid July.
                </p>

                <p className="text-gray-700">
                    Please consult with your Tax officer for support on completing your
                    tax return.
                </p>

            </div>

            {/* Bottom text */}
            <p className="text-gray-600 mt-6">
                Your transactions will be displayed here.
            </p>

        </div>
    );
}