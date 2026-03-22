"use client";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

export default function SetupAccountPage() {

    const [user, setUser] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        dob: "",
        address: "",
        about: "",
    });
    // ✅ Load user from localStorage
    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            setFormData((prev) => ({
                ...prev,
                email: storedEmail,
            }));
        }
    }, []);
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const router = useRouter();
    const handleSave = async () => {
        console.log("SAVE CLICKED");
        console.log("EMAIL:", localStorage.getItem("email"));

        const res = await fetch("http://localhost/ndis-backend/index.php?route=updateProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                dob: formData.dob,
                address: formData.address,
                about: formData.about
            })
        });

        const data = await res.json();
        console.log(data);

        if (data.success) {
            localStorage.setItem("profileComplete", "true");
            router.push("/dashboard");
        } else {
            alert("Failed to save");
        }
    };
    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">

            {/* Page title */}
            <h1 className="text-2xl font-semibold mb-6">
                Set up your account
            </h1>

            {/* Form container */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-5xl shadow-sm">

                {/* Grid fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Name
                        </label>

                        <input

                            name="name"
                            value={formData.name}
                            onChange={handleChange}

                            placeholder="Enter name"

                            className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white
                        focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                        />
                    </div>


                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            name="email"
                            value={formData.email}
                            readOnly
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white
                        focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                        />
                    </div>


                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder="Enter password"
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white
              focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                        />
                    </div>


                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone
                        </label>

                        <input
                            name="phone"
                            value={formData.phone}
                            placeholder="Enter phone number"
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white
              focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                        />
                    </div>


                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white
              focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                        />
                    </div>


                    {/* Address */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Address
                        </label>

                        <input
                            name="address"
                            value={formData.address}
                            placeholder="Enter address"
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white
              focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                        />
                    </div>

                </div>


                {/* About Me */}
                <div className="mt-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        About Me
                    </label>

                    <textarea
                        name="about"
                        value={formData.about}
                        rows={4}
                        placeholder="Write about yourself"
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white
            focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                    />
                </div>


                {/* Buttons */}
                <div className="flex gap-4 mt-8">
                    <button onClick={handleSave}


                        className="bg-teal-200 hover:bg-teal-400 text-gray-900 px-6 py-3 rounded-lg"
                    >
                        Save
                    </button>

                    <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    )
}
