"use client";

import ProfileSidebar from "../../ProfileSidebar";
import { useState } from "react";

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

const slots = [
    "6am - 11am",
    "11am - 2pm",
    "2pm - 5pm",
    "5pm - 9pm"
];

export default function PreferredHoursPage() {

    const [selectedSlots, setSelectedSlots] = useState<Record<string, string[]>>({});
    const [activeDays, setActiveDays] = useState<Record<string, boolean>>({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
    })

    const toggleSlot = (day: string, slot: string) => {

        setSelectedSlots((prev) => {

            const daySlots = prev[day] || [];

            if (daySlots.includes(slot)) {
                return {
                    ...prev,
                    [day]: daySlots.filter((s) => s !== slot)
                };
            }

            return {
                ...prev,
                [day]: [...daySlots, slot]
            };

        });
    };

    const toggleDay = (day: string) => {
        setActiveDays((prev) => ({
            ...prev,
            [day]: !prev[day]
        }));
    };

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

                {/* Main Card */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm p-6">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">

                        <div>
                            <h2 className="text-2xl font-semibold mb-2">
                                Preferred hours
                            </h2>

                            <p className="text-gray-600 text-sm max-w-lg">
                                Help us find you the best matched jobs. Select one or more time slots for your preferred hours. Sessions can span across multiple time slots without needing to fill each slot entirely.
                            </p>

                            {/* Updated badge */}
                            <div className="mt-4 inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                Updated 3 March 2026
                            </div>
                        </div>

                        {/* Preview Button */}
                        <button className="bg-teal-300 text-gray-900 px-4 py-2 rounded-md hover:bg-teal-400 transition">
                            Preview profile
                        </button>

                    </div>

                    {/* Availability Section */}
                    <div className="space-y-8">

                        {days.map((day) => {

                            const dayActive = activeDays[day];
                            const daySlots = selectedSlots[day] || [];

                            return (
                                <div key={day} className="border-t pt-6">

                                    {/* Day Header */}
                                    <div className="flex items-center gap-3 mb-4">

                                        <input
                                            type="checkbox"
                                            checked={activeDays[day] || false}
                                            onChange={() => toggleDay(day)}
                                        />

                                        <span className="font-medium">
                                            {day}
                                        </span>

                                    </div>

                                    {/* Slot Buttons */}
                                    <div className="flex flex-wrap gap-3 ml-7">

                                        {slots.map((slot) => {

                                            const selected = daySlots.includes(slot);

                                            return (
                                                <button
                                                    key={slot}
                                                    onClick={() => toggleSlot(day, slot)}
                                                    className={`px-4 py-2 border rounded-full text-sm transition
                          ${selected
                                                            ? "bg-purple-100 border-purple-400 text-purple-700"
                                                            : "hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {slot}
                                                </button>
                                            );

                                        })}

                                    </div>

                                    {/* Save Button */}
                                    <div className="flex flex-col sm:flex-row sm:justify-end mt-6">
                                        <button className="bg-teal-300 text-gray-900 px-5 py-2 rounded-md hover:bg-teal-400 transition w-full sm:w-auto">
                                            Save availability
                                        </button>
                                    </div>

                                </div>
                            );

                        })}

                    </div>

                </div>

            </div>

        </div>
    );
}
