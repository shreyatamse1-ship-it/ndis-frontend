"use client"

type NavbarProps = {
    toggleSidebar: () => void
}

export default function Navbar({ toggleSidebar }: NavbarProps) {

    return (
        <div className="flex items-center justify-between bg-white px-4 md:px-6 py-3 border-b">

            {/* Mobile hamburger */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden text-2xl"
            >
                ☰
            </button>

            {/* Phone */}
            <div className="text-sm text-gray-500">
                Call 1300 73 65 73
            </div>

            {/* Right buttons */}
            <div className="flex gap-4 text-sm">

                <button className="text-blue-600">
                    Help centre
                </button>

                <button className="border px-3 py-1 rounded">
                    Logout
                </button>

            </div>

        </div>
    )
}