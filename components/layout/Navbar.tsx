
type NavbarProps = {
    toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
    return (
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">

            {/* Mobile menu button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden text-2xl"
            >
                ☰
            </button>

            <h1 className="font-semibold text-lg">
                Dashboard
            </h1>

            <div className="flex items-center gap-4 text-sm">
                <span>Call 1300 73 65 73</span>

                <button className="text-purple-600">
                    Help centre
                </button>

                <button className="border px-3 py-1 rounded">
                    Logout
                </button>
            </div>

        </header>
    );
}