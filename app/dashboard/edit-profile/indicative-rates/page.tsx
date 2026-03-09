"use client";

import { useState } from "react";
import RateInput from "../../../../components/dashboard/RateInput";
import ProfileSidebar from "../../ProfileSidebar";

export default function IndicativeRatesPage() {

    const [rates, setRates] = useState({
        weekday: "",
        saturday: "",
        sunday: "",
        overnight: "",
    });

    const [active, setActive] = useState({
        weekday: false,
        saturday: false,
        sunday: false,
        overnight: false,
        meet: false,
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* Page Title */}
            <h1 className="text-2xl font-semibold mb-6">
                My profile
            </h1>

            {/* Layout */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* Sidebar */}
                <div className="w-full md:w-72">
                    <ProfileSidebar />
                </div>

                {/* Right Content */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">

                    {/* Section title */}
                    <h2 className="text-2xl font-semibold mb-3">
                        Indicative rates
                    </h2>

                    <p className="text-gray-600 mb-6 max-w-2xl">
                        Indicative rates display on your profile as a guide for potential
                        clients. The actual rates you agree on and include in a service
                        agreement may differ slightly, based on a client's individual
                        service requirements.
                    </p>

                    {/* Info Card */}
                    <div className="bg-gray-100 rounded-lg p-6 mb-6">

                        <h3 className="text-lg font-semibold mb-2">
                            Not sure how much to charge?
                        </h3>

                        <p className="text-gray-600 mb-4 max-w-xl">
                            Check out the rate calculator for insights into the range of
                            rates charged by the majority of support workers via Mable in the
                            last 6 months.
                        </p>

                        <button className="bg-teal-200 text-gray-900 px-5 py-2 rounded-md">
                            Rate calculator
                        </button>

                    </div>

                    {/* Rates section */}
                    <h3 className="text-lg font-semibold mb-2">
                        Your indicative rates
                    </h3>

                    <p className="text-gray-600 text-sm mb-6 max-w-2xl">
                        Take into consideration your experience, qualifications, skills and
                        service types. For NDIS-funded clients, hourly rates (including
                        their Mable platform fee of 7.95%) must not exceed NDIS price
                        limits.
                    </p>

                    {/* Rate Inputs */}
                    <div className="space-y-8">

                        <RateInput
                            label="Weekday"
                            value={rates.weekday}
                            checked={active.weekday}
                            onCheck={() =>
                                setActive({ ...active, weekday: !active.weekday })
                            }
                            onChange={(v) =>
                                setRates({ ...rates, weekday: v })
                            }
                        />

                        <RateInput
                            label="Saturday"
                            value={rates.saturday}
                            checked={active.saturday}
                            onCheck={() =>
                                setActive({ ...active, saturday: !active.saturday })
                            }
                            onChange={(v) =>
                                setRates({ ...rates, saturday: v })
                            }
                        />

                        <RateInput
                            label="Sunday"
                            value={rates.sunday}
                            checked={active.sunday}
                            onCheck={() =>
                                setActive({ ...active, sunday: !active.sunday })
                            }
                            onChange={(v) =>
                                setRates({ ...rates, sunday: v })
                            }
                        />

                        <RateInput
                            label="Overnight rates"
                            value={rates.overnight}
                            checked={active.overnight}
                            onCheck={() =>
                                setActive({ ...active, overnight: !active.overnight })
                            }
                            onChange={(v) =>
                                setRates({ ...rates, overnight: v })
                            }
                            flat
                        />

                        {/* Overnight Note */}
                        <p className="text-teal-200 text-sm max-w-xl">
                            Note: A flat rate for 24-hour support can be a combination of
                            active support, passive support and sleep, outlined in an
                            agreement with a client.
                        </p>

                    </div>

                    {/* Meet and greet */}
                    <div className="flex items-center gap-3 mt-6">
                        <input
                            type="checkbox"
                            checked={active.meet}
                            onChange={() =>
                                setActive({ ...active, meet: !active.meet })
                            }
                        />

                        <span>
                            I offer a <strong>free meet and greet.</strong>
                        </span>
                    </div>

                    {/* Save Button */}
                    <button className="mt-8 bg-teal-200 hover:bg-teal-400 text-gray-900 font-semibold px-6 py-3 rounded-lg">
                        Save and continue
                    </button>

                </div>

            </div>
        </div>
    );
}