import Link from "next/link"

export default function ManageClientsPage() {
    return (
        <div className="p-8">

            <h1 className="text-3xl font-semibold mb-6">
                Manage Clients
            </h1>

            <div className="bg-white rounded-lg border p-10 text-center">

                <h2 className="text-xl font-semibold mb-3">
                    No jobs shared with you
                </h2>

                <p className="text-gray-600 mb-6">
                    Keep your profile and availability updated to help clients discover and connect with you.
                </p>
                <Link
                    href="/dashboard/edit-profile"
                    className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50"
                >
                    Edit Profile
                </Link>
            </div>

        </div>
    )
}