"use client"

export default function TaxSuperSyncPage() {
    return (

        <div className="w-full px-6 py-8">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">Tax & super sync</h1>
                <span className="text-purple-600 cursor-pointer">Help</span>
            </div>

            <hr className="mb-8" />

            {/* Plan Summary */}
            <h2 className="text-xl font-semibold mb-4">Plan summary</h2>
            <p className="text-gray-600 mb-6">Earnings</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">

                {/* Super Contributions */}
                <div className="bg-white border rounded-xl p-6 shadow-sm">

                    <h3 className="text-gray-700 mb-2">
                        Super contributions
                    </h3>

                    <p className="text-lg font-semibold mb-4">
                        $0.00
                    </p>

                    <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
                        ⚠ Not contributing
                    </span>

                </div>

                {/* Tax Contributions */}
                <div className="bg-white border rounded-xl p-6 shadow-sm">

                    <h3 className="text-gray-700 mb-2">
                        Tax contributions
                    </h3>

                    <p className="text-lg font-semibold mb-4">
                        $0.00
                    </p>

                    <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
                        ⚠ Not contributing
                    </span>

                </div>

            </div>

            {/* Financial Year */}
            <div className="flex justify-between items-center mb-6">

                <div>
                    <h3 className="font-semibold">
                        See current financial year
                    </h3>

                    <p className="text-gray-600 text-sm">
                        Turn on this setting to view current end of financial year history.
                    </p>
                </div>

                <input type="checkbox" className="w-6 h-6" />

            </div>

            <hr className="mb-8" />

            {/* Get Started */}
            <h2 className="text-xl font-semibold mb-6">
                Get started
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                {/* My Super */}
                <div className="bg-white border rounded-xl p-6 shadow-sm">

                    <h3 className="text-lg font-semibold mb-3">
                        My super
                    </h3>

                    <p className="text-gray-600 mb-4">
                        Set up your super contribution rate from payments for automatic payouts to a bank account.
                    </p>

                    <button className="bg-teal-200 text-gray-900  px-6 py-3 rounded-lg hover:bg-teal-500">
                        Set up super
                    </button>

                </div>

                {/* My Tax */}
                <div className="bg-white border rounded-xl p-6 shadow-sm">

                    <h3 className="text-lg font-semibold mb-3">
                        My tax
                    </h3>

                    <p className="text-gray-600 mb-4">
                        Set up your tax contribution rate from payments for automatic payouts to a bank account.
                    </p>

                    <button className="bg-teal-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-teal-500">
                        Set up tax
                    </button>

                </div>

            </div>

        </div>

    )
}