export default function TestimonialSection() {

    return (
        <div>

            <h2 className="text-2xl font-semibold mb-6">
                Hear from other support workers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Card 1 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-gray-600">
                        "Biggest thing with this is that it provides flexibility.
                        You're able to tailor your hours whenever you need."
                    </p>

                    <div className="flex items-center gap-3 mt-6">

                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

                        <span className="font-medium">Jane</span>

                    </div>

                </div>

                {/* Card 2 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-gray-600">
                        "It has made life easier! I set my own rates and built
                        strong relationships with my clients."
                    </p>

                    <div className="flex items-center gap-3 mt-6">

                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

                        <span className="font-medium">Diego</span>

                    </div>

                </div>

                {/* Card 3 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-gray-600">
                        "I find the platform incredibly easy to use.
                        I can manage my own schedule."
                    </p>

                    <div className="flex items-center gap-3 mt-6">

                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

                        <span className="font-medium">Shane</span>

                    </div>

                </div>

            </div>

        </div>
    );
}