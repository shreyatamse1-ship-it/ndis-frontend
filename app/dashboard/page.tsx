import TestimonialSection from "../../components/common/TestimonialSection";
import Link from "next/link";
import { userData, testimonials } from "../data/dashboardData";

export default function DashboardPage() {
    return (
        <div className="space-y-10 w-full max-w-7xl mx-auto pb-10">

            {/* Top Section */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">

                {/* Left */}
                <div>
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <h2 className="text-2xl mt-2">
                        Welcome, {userData.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Let's get you started to find jobs and build a network of clients.
                    </p>

                    <Link href="/dashboard/setup-account">
                        <button className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition">
                            Set up your account
                        </button>
                    </Link>
                </div>

                {/* Setup Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md">
                    <h3 className="font-semibold text-lg mb-4">
                        What you'll need to set up your account
                    </h3>

                    <ul className="space-y-3 text-gray-600">
                        <li>✓ Your mobile number</li>
                        <li>✓ NDIS Worker Screening Check</li>
                        <li>✓ ABN</li>
                        <li>✓ Two professional references</li>
                    </ul>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Clients</p>
                    <h2 className="text-2xl font-bold">
                        {userData.stats.clients}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Sessions</p>
                    <h2 className="text-2xl font-bold">
                        {userData.stats.sessions}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Earnings</p>
                    <h2 className="text-2xl font-bold">
                        ₹{userData.stats.earnings}
                    </h2>
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Recent Activity
                </h2>

                <div className="bg-white p-5 rounded-xl shadow">
                    <ul className="space-y-2 text-gray-600">
                        {userData.recentActivity.map((item, index) => (
                            <li key={index}>✔ {item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Upcoming Sessions */}
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Upcoming Sessions
                </h2>

                <div className="grid grid-cols-2 gap-6">
                    {userData.upcomingSessions.map((session, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-xl shadow"
                        >
                            <p><strong>Client:</strong> {session.client}</p>
                            <p><strong>Date:</strong> {session.date}</p>
                            <p><strong>Time:</strong> {session.time}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <TestimonialSection data={testimonials} />

        </div>
    );
}