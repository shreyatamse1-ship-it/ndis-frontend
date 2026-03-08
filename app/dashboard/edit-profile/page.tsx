import ProfileSidebar from "../ProfileSidebar"

export default function PreferredHoursPage() {
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

                {/* Main content */}
                <div className="flex-1 bg-white border rounded-lg shadow-sm p-6">

                    <h2 className="text-xl font-semibold mb-3">
                        Preferred hours
                    </h2>

                    <p className="text-gray-600 mb-4">
                        Help us find you the best matched jobs.
                    </p>

                    <div className="h-64 w-full border rounded-lg flex items-center justify-center text-gray-400">
                        Availability section will go here
                    </div>

                </div>

            </div>

        </div>
    )
}