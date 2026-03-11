export default function LGBTQGuide() {
    return (
        <div className="bg-gray-50 min-h-screen py-14 px-6">

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* LEFT ARTICLE */}
                <div className="lg:col-span-2">

                    {/* Breadcrumb */}
                    <p className="text-sm md:text-base text-purple-600 mb-4">
                        Help Centre &gt; LGBTQIA+ Inclusiveness
                    </p>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        LGBTQIA+ Inclusiveness
                    </h1>

                    {/* Meta Info */}
                    <div className="flex justify-between text-sm md:text-base text-gray-500 border-b pb-4 mb-8">

                        <div>
                            <p className="font-semibold text-gray-700">Last updated</p>
                            <p>17 April 2025</p>
                        </div>

                        <div>
                            <p className="font-semibold text-gray-700">Reading time</p>
                            <p>2 minutes</p>
                        </div>

                    </div>

                    {/* Article Content */}
                    <div className="space-y-6 text-gray-700 leading-relaxed text-[16px] md:text-[18px]">

                        <p>
                            Mable is LGBTQIA+ Inclusive. We recognise and celebrate people's
                            individuality and right to access support fitting them.
                        </p>

                        <p>
                            Mable is an inclusive service recognising and celebrating
                            people's individuality and their right to receive personalised
                            and sensitive support.
                        </p>

                        <p className="font-semibold">
                            Our service allows customers to search for and find the right
                            support workers.
                        </p>

                        <p>
                            To make sure we are responding to the needs of our LGBTQIA+
                            customers we:
                        </p>

                        <ul className="list-disc pl-6 space-y-3">

                            <li>
                                Understand and respect the need for privacy and confidentiality.
                            </li>

                            <li>
                                Understand members of the LGBTQIA+ community rarely want to be
                                solely defined by their sexual orientation.
                            </li>

                            <li>
                                Recognise there is no requirement to disclose information unless
                                you want to.
                            </li>

                            <li>
                                Allow support workers to self-identify as “LGBTQIA+ Friendly”.
                            </li>

                        </ul>

                    </div>

                </div>

                {/* RIGHT SIDEBAR */}
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 h-fit shadow-sm sticky top-24">

                    <h3 className="text-lg md:text-xl font-semibold mb-4">
                        Related articles
                    </h3>

                    <ul className="space-y-3 text-purple-600 text-sm md:text-base">

                        <li className="hover:underline cursor-pointer">
                            Aged care competency training
                        </li>

                        <li className="hover:underline cursor-pointer">
                            The new way to approve support hours
                        </li>

                        <li className="hover:underline cursor-pointer">
                            The new way to submit support hours
                        </li>

                        <li className="hover:underline cursor-pointer">
                            Badges: unlock more work opportunities
                        </li>

                        <li className="hover:underline cursor-pointer">
                            Badges: build confidence
                        </li>

                    </ul>

                </div>

            </div>

        </div>
    )
}