import Image from "next/image"
import Link from "next/link"

export default function InboxPage() {
    return (
        <div className="w-full p-6">

            <h1 className="text-2xl font-semibold mb-6">
                Inbox
            </h1>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 flex flex-col items-center text-center min-h-[420px] justify-center">

                <h2 className="text-xl font-semibold mb-3">
                    Complete your account verification
                </h2>

                <p className="text-gray-600 max-w-lg mb-6">
                    Complete your account verification and once it's approved,
                    search for jobs in your area and message them about the
                    support you provide.
                </p>

                <Link
                    href="/dashboard/setup-account"
                    className="bg-teal-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-teal-500 transition mb-8"
                >
                    Complete now
                </Link>



            </div>
        </div>
    )
}