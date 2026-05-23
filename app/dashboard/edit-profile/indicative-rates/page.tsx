"use client";

import { useEffect, useState } from "react";
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

    // 🔥 GET USER (NO HARDCODE)
    const getUser = () => {
        try {
            return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
            return null;
        }
    };

    // 🔥 LOAD EXISTING DATA
    useEffect(() => {
        const user = getUser();
        if (!user?.id) return;

        fetch(`http://localhost/ndis-backend/controllers/get_indicative_rates.php?user_id=${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data?.indicative_rates) {
                    const parsed = JSON.parse(data.indicative_rates);

                    setRates(parsed.rates || {});
                    setActive(parsed.active || {});
                }
            })
            .catch(err => console.error(err));
    }, []);

    // 🔥 SAVE FUNCTION
    const saveRates = async () => {

        const user = getUser();

        if (!user?.id) {
            alert("User not logged in");
            return;
        }

        try {
            const res = await fetch("http://localhost/ndis-backend/controllers/update_indicative_rates.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.id,
                    indicative_rates: {
                        rates,
                        active
                    }
                }),
            });

            const data = await res.json();
            console.log("SAVE:", data);

            if (data.status === "success") {
                alert("Saved successfully ✅");
            } else {
                alert("Error: " + data.message);
            }

        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">

            <h1 className="text-3xl font-bold mb-8 text-gray-900">My profile</h1>

            <div className="flex flex-col md:flex-row gap-8">

                <div className="w-full md:w-72">
                    <ProfileSidebar />
                </div>

                <div className="flex-1 bg-white rounded-xl shadow-md p-8">

                    <h2 className="text-3xl font-bold mb-3 text-gray-900 pb-4 border-b border-gray-100">
                        Indicative rates
                    </h2>

                    <p className="text-gray-500 mb-6 max-w-2xl leading-relaxed">
                        Indicative rates display on your profile...
                    </p>

                    <div className="bg-teal-50 rounded-lg p-6 mb-6 border border-teal-100">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                            Not sure how much to charge?
                        </h3>

                        <p className="text-gray-600 mb-4 max-w-xl">
                            Check out the rate calculator...
                        </p>

                        <button className="bg-teal-500 text-white px-5 py-2.5 rounded-lg hover:bg-teal-600 transition font-medium shadow-sm">
                            Rate calculator
                        </button>
                    </div>

                    <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        Your indicative rates
                    </h3>

                    <div className="space-y-6">

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

                        <p className="text-gray-500 text-sm max-w-xl italic">
                            Note: A flat rate for 24-hour support...
                        </p>

                    </div>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                        <input
                            type="checkbox"
                            checked={active.meet}
                            onChange={() =>
                                setActive({ ...active, meet: !active.meet })
                            }
                            className="w-5 h-5 rounded cursor-pointer accent-teal-500"
                        />
                        <span className="text-gray-700">
                            I offer a <strong>free meet and greet.</strong>
                        </span>
                    </div>

                    <button
                        onClick={saveRates}
                        className="mt-8 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-7 py-2.5 rounded-lg shadow-sm transition"
                    >
                        Save and continue
                    </button>

                </div>

            </div>
        </div>
    );
}