import StatCard from "../../../components/dashboard/StatCard"
import Card from "../../../components/ui/Card"

export default function DashboardPage() {
    return (
        <div className="w-full space-y-8">

            {/* Page Title */}
            <h1 className="text-2xl font-semibold text-gray-800">
                Dashboard
            </h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Jobs" value="119" />
                <StatCard title="Active Jobs" value="42" />
                <StatCard title="Applications" value="892" />
                <StatCard title="Candidates" value="310" />
            </div>

            {/* Search Section */}
            <Card title="Suburb or postcode">

                {/* Search Input */}
                <div className="flex flex-col md:flex-row gap-4">

                    <input
                        type="text"
                        placeholder="Where would you like to work?"
                        className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-3"
                    />

                    <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition">
                        Search
                    </button>

                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2 mt-4">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm text-gray-700">
                        Include nearby suburbs
                    </span>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mt-4">

                    <button className="border border-gray-300 px-4 py-2 rounded-lg">
                        Services
                    </button>

                    <button className="border border-gray-300 px-4 py-2 rounded-lg">
                        Days
                    </button>

                    <button className="border border-gray-300 px-4 py-2 rounded-lg">
                        Hours per week
                    </button>

                    <button className="border border-gray-300 px-4 py-2 rounded-lg">
                        All filters
                    </button>

                </div>

            </Card>

            {/* Job Results */}
            <Card>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">

                    <p className="text-gray-700 font-medium">
                        119 jobs match all your filters
                    </p>

                    <p className="text-gray-500 text-sm">
                        Sort by: Most recent
                    </p>

                </div>

                {/* Job Card */}
                <div className="border rounded-xl p-6 flex flex-col md:flex-row md:justify-between gap-6">

                    {/* Left Content */}
                    <div>

                        <p className="font-semibold text-gray-800">
                            Friendly and patient support worker needed
                        </p>

                        <p className="text-gray-500 mt-2">
                            Weekly • 20 hours • 4 sessions
                        </p>

                        <p className="text-gray-500 mt-2">
                            Putney NSW 2112 • ~29 min drive
                        </p>

                        <p className="text-sm text-gray-400 mt-2">
                            Posted 3 days ago • 10+ applications
                        </p>

                    </div>

                    {/* Right Content */}
                    <div className="text-gray-600 md:text-right">

                        <p className="font-medium mb-2">
                            Currently available:
                        </p>

                        <p>Mon: 6-9am</p>
                        <p>Wed: 6-9am</p>
                        <p>Thu: 6-9am</p>

                    </div>

                </div>

            </Card>

        </div>
    )
}