"use client"

import ProfileSidebar from "../../ProfileSidebar"

export default function ImmunisationPage() {
    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-6">

            {/* LEFT SIDEBAR */}
            <div className="lg:w-1/4">
                <ProfileSidebar />
            </div>


            {/* RIGHT CONTENT */}
            <div className="lg:w-3/4">

                <div className="bg-white rounded-xl shadow-sm p-8">

                    {/* TITLE */}
                    <h1 className="text-3xl font-semibold mb-6">
                        Immunisation
                    </h1>


                    {/* COVID SECTION */}
                    <h2 className="text-xl font-semibold mb-3">
                        COVID-19 vaccine status
                    </h2>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                        To provide services via Mable, you acknowledge that you’ve met and
                        will continue to meet any vaccination requirements in your state
                        and territory and for your services.
                    </p>


                    <h3 className="font-semibold mb-2">
                        Do you meet your state or territory COVID-19 vaccination requirements?
                    </h3>

                    <p className="text-gray-600 mb-3">
                        You must answer truthfully.
                    </p>


                    {/* SELECT */}
                    <select className="w-full max-w-md border border-gray-300 rounded-md p-3 mb-8">
                        <option>Select</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>


                    <hr className="mb-8" />


                    {/* FLU SECTION */}
                    <h2 className="text-xl font-semibold mb-4">
                        Flu vaccine
                    </h2>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                        A flu vaccine is a mandatory requirement for anyone who works in or
                        enters a residential aged care facility. For those who work in a
                        home care setting, the flu vaccination is highly recommended.
                    </p>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Clients or providers can ask if you’ve been vaccinated for flu this
                        year. Make sure you have prepared evidence to show them you have.
                    </p>


                    <p className="font-semibold mb-3">
                        It’s optional to answer. You can update your response at any time.
                    </p>


                    <p className="text-gray-700 mb-4">
                        If you answer yes, a flu vaccine badge will appear on your profile
                        this season that can be viewed by clients. Clients can filter for
                        workers with a flu vaccine badge.
                    </p>

                    <p className="text-gray-700 mb-8">
                        If you answer no, your profile will remain the same without a badge.
                    </p>


                    {/* QUESTION */}
                    <h3 className="font-semibold mb-2">
                        Have you had a flu vaccine this season?
                    </h3>

                    <p className="text-gray-600 mb-4">
                        It’s important to answer truthfully.
                    </p>


                    {/* RADIO BUTTONS */}
                    <div className="flex flex-col gap-4 mb-8">

                        <label className="flex items-center gap-3">
                            <input type="radio" name="flu" className="w-5 h-5" />
                            Yes
                        </label>

                        <label className="flex items-center gap-3">
                            <input type="radio" name="flu" className="w-5 h-5" />
                            No
                        </label>

                    </div>


                    {/* BUTTON */}
                    <button className="bg-teal-200 hover:bg-teal-400 text-gray-900 px-8 py-3 rounded-lg font-semibold">
                        Save and continue
                    </button>

                </div>
            </div>
        </div>
    )
}