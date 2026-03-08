"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ProfileSidebar() {
    const pathname = usePathname()

    const linkClass = (path: string) =>
        `flex items-center gap-2 px-3 py-2 rounded-md ${pathname === path
            ? "bg-teal-200 text-gray-700 font-medium"
            : "hover:bg-gray-100"
        }`

    return (
        <div className="bg-white border rounded-lg p-5 w-72 space-y-6">

            {/* Job Details */}
            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Job Details
                </h3>

                <ul className="space-y-2 text-sm">

                    <li>
                        <Link
                            href="/dashboard/edit-profile/preferred-hours"
                            className={linkClass("/dashboard/edit-profile/preferred-hours")}
                        >
                            ✔ Preferred Hours
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/indicative-rates"
                            className={linkClass("/dashboard/edit-profile/indicative-rates")}
                        >
                            ✔ Indicative Rates
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/locations"
                            className={linkClass("/dashboard/edit-profile/locations")}
                        >
                            ✔ Locations
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/experience"
                            className={linkClass("/dashboard/edit-profile/experience")}
                        >
                            ✔ Experience
                        </Link>
                    </li>

                </ul>
            </div>

            {/* Additional Details */}
            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Additional Details
                </h3>

                <ul className="space-y-2 text-sm">

                    <li>
                        <Link
                            href="/dashboard/edit-profile/bank-account"
                            className={linkClass("/dashboard/edit-profile/bank-account")}
                        >
                            Bank Account
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/work-history"
                            className={linkClass("/dashboard/edit-profile/work-history")}
                        >
                            Work History
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/education-training"
                            className={linkClass("/dashboard/edit-profile/education-training")}
                        >
                            Education & Training
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/ndis-screening"
                            className={linkClass("/dashboard/edit-profile/ndis-screening")}
                        >
                            NDIS Worker Screening
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/good-to-know"
                            className={linkClass("/dashboard/edit-profile/good-to-know")}
                        >
                            Good To Know
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/immunisation"
                            className={linkClass("/dashboard/edit-profile/immunisation")}
                        >
                            Immunisation
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/languages"
                            className={linkClass("/dashboard/edit-profile/languages")}
                        >
                            Languages
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/cultural-background"
                            className={linkClass("/dashboard/edit-profile/cultural-background")}
                        >
                            Cultural Background
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/religion"
                            className={linkClass("/dashboard/edit-profile/religion")}
                        >
                            Religion
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/edit-profile/interests-hobbies"
                            className={linkClass("/dashboard/edit-profile/interests-hobbies")}
                        >
                            Interests & Hobbies
                        </Link>
                    </li>

                </ul>
            </div>

        </div>
    )
}