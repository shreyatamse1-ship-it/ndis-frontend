"use client"

import ProfileSidebar from "../../ProfileSidebar"

export default function BankAccountPage() {

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <h1 className="text-2xl font-semibold mb-6">
                My profile
            </h1>

            <div className="flex flex-col md:flex-row gap-6">

                {/* Sidebar */}
                <div className="w-full md:w-72">
                    <ProfileSidebar />
                </div>

                {/* Right Content */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">

                    <h2 className="text-2xl font-semibold mb-3">
                        Bank account
                    </h2>

                    <p className="text-gray-600 mb-6">
                        To get you paid as soon as possible, enter your bank details below so that
                        Mable can process payments to you on behalf of your clients.
                    </p>

                    {/* Info box */}
                    <div className="bg-purple-100 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <span>🔒</span>
                        <p>
                            Your bank details <strong>will not be displayed on your profile</strong>
                            and only used to process your payments by the Mable team.
                        </p>
                    </div>

                    <h3 className="text-lg font-semibold mb-4">
                        Add your bank account details
                    </h3>


                    {/* Account Name */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Account name
                        </label>

                        <input
                            type="text"
                            className="w-full border border-gray-200 rounded-md p-3"
                        />
                    </div>


                    {/* Bank Name */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Bank name
                        </label>

                        <input
                            type="text"
                            className="w-full border border-gray-200 rounded-md p-3"
                        />
                    </div>


                    {/* BSB + Account */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">

                        <div>
                            <label className="block mb-1 font-medium">
                                BSB
                            </label>

                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-md p-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Account number
                            </label>

                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-md p-3"
                            />
                        </div>

                    </div>


                    {/* Checkbox */}
                    <div className="flex items-start gap-3 mb-6">

                        <input type="checkbox" />

                        <p className="text-gray-600 text-sm">
                            I understand that Mable is not responsible for checking the accuracy
                            of my BSB and Account Number. Any errors in this information may
                            result in me not being paid for services I have provided to clients.
                        </p>

                    </div>


                    {/* Save button */}
                    <button className="bg-teal-200 hover:bg-teal-400 text-gray-900 px-8 py-3 rounded-md">
                        Save and continue
                    </button>

                </div>

            </div>

        </div>
    )
}