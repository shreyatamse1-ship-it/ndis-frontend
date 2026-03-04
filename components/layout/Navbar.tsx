"use client";

import { Menu } from "lucide-react";

export default function Navbar({
    toggleSidebar,
}: {
    toggleSidebar: () => void;
}) {
    return (
        <header className="h-14 border-b bg-white flex items-center justify-between px-6">

            <div className="flex items-center gap-3">

                {/* Mobile menu button */}
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden"
                >
                    <Menu size={22} />
                </button>

                <h1 className="font-semibold text-lg">
                    Dashboard
                </h1>

            </div>

            <div>
                Navbar
            </div>

        </header>
    );
}
