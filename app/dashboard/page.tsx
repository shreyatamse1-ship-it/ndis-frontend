import TestimonialSection from "../../components/common/TestimonialSection";

export default function DashboardPage() {
    return (
        <div className="space-y-10 w-full max-w-7xl mx-auto">

            {/* Top section */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">

                {/* Left side */}
                <div>
                    <h1 className="text-4xl font-bold">Dashboard</h1>

                    <h2 className="text-2xl mt-2">Welcome</h2>

                    <p className="text-gray-500 mt-2">
                        Let's get you started to find jobs and build a network of clients.
                    </p>

                    <button className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg">
                        Set up your account
                    </button>
                </div>

                {/* Setup card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md">

                    <h3 className="font-semibold text-lg mb-4">
                        What you'll need to set up your account
                    </h3>

                    <ul className="space-y-3 text-gray-600">

                        <li>✔ Your mobile number</li>
                        <li>✔ NDIS Worker Screening Check</li>
                        <li>✔ ABN</li>
                        <li>✔ Two professional references</li>

                    </ul>

                </div>

            </div>

            {/* Testimonials */}
            <TestimonialSection />

        </div>
    );
}