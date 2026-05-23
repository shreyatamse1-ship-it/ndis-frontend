"use client";

import ProfileSidebar from "../../ProfileSidebar";
import { useEffect, useState } from "react";

const days = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const slots = [
    "6am - 11am", "11am - 2pm", "2pm - 5pm", "5pm - 9pm"
];

export default function PreferredHoursPage() {

    const [selectedSlots, setSelectedSlots] = useState<Record<string, string[]>>({});
    const [activeDays, setActiveDays] = useState<Record<string, boolean>>({
        Monday: false, Tuesday: false, Wednesday: false, Thursday: false,
        Friday: false, Saturday: false, Sunday: false
    });

    // ✅ Get logged-in user (NO HARDCODING)
    const getUser = () => {
        try {
            return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
            return null;
        }
    };

    // 🔥 LOAD existing data (so it reflects for user/participant)
    useEffect(() => {
        const user = getUser();
        if (!user?.id) return;

        fetch(`http://localhost/ndis-backend/controllers/get_preferred_hours.php?user_id=${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data?.preferred_hours) {
                    const parsed = JSON.parse(data.preferred_hours);

                    setSelectedSlots(parsed.selectedSlots || {});
                    setActiveDays(parsed.activeDays || {});
                }
            })
            .catch(err => console.error("LOAD ERROR:", err));
    }, []);

    const toggleSlot = (day: string, slot: string) => {
        setSelectedSlots(prev => {
            const daySlots = prev[day] || [];

            if (daySlots.includes(slot)) {
                return { ...prev, [day]: daySlots.filter(s => s !== slot) };
            }
            return { ...prev, [day]: [...daySlots, slot] };
        });
    };

    const toggleDay = (day: string) => {
        setActiveDays(prev => ({
            ...prev,
            [day]: !prev[day]
        }));
    };

    // 🔥 SAVE (NO HARDCODE)
    const saveAvailability = async () => {
        const user = getUser();

        if (!user?.id) {
            alert("User not logged in");
            return;
        }

        try {
            const res = await fetch("http://localhost/ndis-backend/controllers/update_preferred_hours.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user.id,
                    preferred_hours: {
                        selectedSlots,
                        activeDays
                    }
                })
            });

            const data = await res.json();
            console.log("SAVE RESPONSE:", data);

            if (data.status === "success") {
                alert("Saved successfully ✅");
            } else {
                alert("Error: " + data.message);
            }

        } catch (err) {
            console.error("SAVE ERROR:", err);
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

                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8 pb-6 border-b border-gray-100">
                        <div>
                            <h2 className="text-3xl font-bold mb-2 text-gray-900">Preferred hours</h2>
                            <p className="text-gray-500 text-sm max-w-lg leading-relaxed">
                                Help us find you the best matched jobs...
                            </p>
                        </div>

                        <button className="bg-teal-500 text-white px-6 py-2.5 rounded-lg hover:bg-teal-600 transition font-medium shadow-sm">
                            Preview profile
                        </button>
                    </div>

                    <div className="space-y-6">
                        {days.map((day) => {
                            const daySlots = selectedSlots[day] || [];

                            return (
                                <div key={day} className="border-b border-gray-100 pb-6 last:border-b-0">

                                    <div className="flex items-center gap-3 mb-5">
                                        <input
                                            type="checkbox"
                                            checked={activeDays[day] || false}
                                            onChange={() => toggleDay(day)}
                                            className="w-5 h-5 rounded cursor-pointer accent-teal-500"
                                        />
                                        <span className="font-semibold text-gray-900 text-lg">{day}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-3 ml-8">
                                        {slots.map((slot) => {
                                            const selected = daySlots.includes(slot);

                                            return (
                                                <button
                                                    key={slot}
                                                    onClick={() => toggleSlot(day, slot)}
                                                    className={`px-5 py-2.5 border-2 rounded-lg text-sm font-medium transition ${selected
                                                            ? "bg-teal-50 border-teal-500 text-teal-700"
                                                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {slot}
                                                </button>
                                            );
                                        })}
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                    {/* ✅ SINGLE SAVE BUTTON (same style) */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
                        <button
                            onClick={saveAvailability}
                            className="bg-teal-500 text-white px-7 py-2.5 rounded-lg hover:bg-teal-600 transition font-medium shadow-sm"
                        >
                            Save availability
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}