import StatCard from "../components/dashboard/StatCard";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function DashboardPage() {
    return (
        <div className="p-6 space-y-6">

            {/* Dashboard Title */}
            <h1 className="text-2xl font-semibold">Dashboard</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Jobs" value="119" />
                <StatCard title="Active Jobs" value="42" />
                <StatCard title="Applications" value="892" />
                <StatCard title="Candidates" value="310" />
            </div>

            {/* Search Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">

                <h2 className="text-lg font-medium">Suburb or postcode</h2>

                {/* Search Input + Button */}
                <div className="flex flex-col md:flex-row gap-4">
                    <Input placeholder="Where would you like to work?" />
                    <Button className="bg-teal-500 text-white hover:bg-teal-600 transition">
                        Search
                    </Button>
                </div>

                {/* Checkbox */}
                <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" defaultChecked />
                    Include nearby suburbs
                </label>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                        Services
                    </button>

                    <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                        Days
                    </button>

                    <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                        Hours per week
                    </button>

                    <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                        All filters
                    </button>
                </div>
            </div>

            {/* Jobs Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">

                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        119 jobs match all your filters
                    </p>

                    <p className="text-sm text-gray-500">
                        Sort by: <span className="font-medium">Most recent</span>
                    </p>
                </div>

                {/* Job Card */}
                <div className="border rounded-lg p-6 flex flex-col md:flex-row justify-between gap-4">

                    <div className="space-y-2">
                        <h3 className="font-medium text-lg">
                            Friendly and patient support worker needed
                        </h3>

                        <p className="text-sm text-gray-500">
                            Weekly • 20 hours • 4 sessions
                        </p>

                        <p className="text-sm text-gray-500">
                            Putney NSW 2112 • ~29 min drive
                        </p>

                        <p className="text-sm text-gray-400">
                            Posted 3 days ago • 10+ applications
                        </p>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                        <p className="font-medium">Currently available:</p>
                        <p>Mon: 6-9am</p>
                        <p>Wed: 6-9am</p>
                        <p>Thu: 6-9am</p>
                    </div>

                </div>

            </div>

        </div>
    );
}