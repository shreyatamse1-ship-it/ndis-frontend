"use client"
type NavbarProps = {
    toggleSidebar: () => void
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
    return (
        <div className="flex items-center justify-between bg-white px-6 py-4 shadow">

            {/* Mobile menu button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-700 text-xl"
            >
                ☰
            </button>

            <div className="text-sm text-gray-500">
                Call 1300 73 65 73
            </div>

            <div className="flex gap-4 text-sm">
                <button className="text-blue-600">Help centre</button>
                <button className="border px-3 py-1 rounded">
                    Logout
                </button>
            </div>

        </div>
    )
}