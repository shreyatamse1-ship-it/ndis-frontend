"use client";

import { useState } from "react";
import BillingTabs from "../../../../components/BillingTabs";

export default function SuperPage() {

    const [showModal, setShowModal] = useState(false);

    return (
        <div className="w-full px-6 py-8">

            <BillingTabs />

            {/* Calculator Card */}
            <div className="bg-white border rounded-xl shadow-sm p-8 max-w-5xl">

                <h2 className="text-xl font-semibold mb-3">
                    Indicative superannuation calculator
                </h2>

                <p className="text-gray-600 mb-4">
                    Choose a date range and we'll calculate the amount of super you could contribute.
                </p>

                {/* CLICKABLE LINK */}
                <button
                    onClick={() => setShowModal(true)}
                    className="text-purple-600 underline mb-6"
                >
                    How is super calculated?
                </button>

                {/* Super rate */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">
                        Super rate %
                    </label>

                    <input
                        type="text"
                        defaultValue="11"
                        className="border rounded-lg p-3 w-24"
                    />
                </div>

                {/* Date Inputs */}
                <div className="grid grid-cols-2 gap-10 mb-6">

                    <div>
                        <label className="block font-semibold mb-2">From</label>

                        <div className="flex gap-3">
                            <input className="border rounded-lg p-3 w-28" placeholder="Day" />
                            <input className="border rounded-lg p-3 w-32" placeholder="Month" />
                            <input className="border rounded-lg p-3 w-28" placeholder="Year" />
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">To</label>

                        <div className="flex gap-3">
                            <input className="border rounded-lg p-3 w-28" placeholder="Day" />
                            <input className="border rounded-lg p-3 w-32" placeholder="Month" />
                            <input className="border rounded-lg p-3 w-28" placeholder="Year" />
                        </div>
                    </div>

                </div>

                <button className="bg-teal-300 px-6 py-3 rounded-lg">
                    Calculate
                </button>

                <p className="text-gray-500 mt-4">
                    Calculation is indicative based on the information you provide.
                </p>

            </div>

            {/* MODAL POPUP */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl p-10 max-w-3xl shadow-xl">

                        <h2 className="text-3xl font-semibold mb-6">
                            How is super calculated?
                        </h2>

                        <p className="text-gray-700 mb-4">
                            We calculate indicative super for the current financial year onwards.
                            The range is based on the date you receive payment.
                        </p>

                        <p className="text-gray-700 mb-8">
                            This information should not be considered legal, accounting or tax advice.
                            We recommend you speak with an accountant, tax advisor or your financial advisor.
                        </p>

                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-teal-200 hover:bg-teal-500 text-gray-900 px-8 py-3 rounded-lg"
                        >
                            OK, got it
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}