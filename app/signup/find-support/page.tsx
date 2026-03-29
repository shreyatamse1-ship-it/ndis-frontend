"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FindSupport() {
    const userRole = "participant";
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        suburb: "", // use this for location field
        is_adult: null as boolean | null,
        funding_type: "",
        start_time: "",

        // ✅ ONLY NEW FIELDS (client)
        address: "",
        phone: "",
        organisation: "",
        client_type: "",
        role: "",
        has_clients: ""
    });

    const [flow, setFlow] = useState<"assist" | "me" | "client" | null>(null);
    const [step, setStep] = useState(1);
    const router = useRouter();

    const card = "bg-white p-8 rounded-xl shadow-md w-full max-w-md";

    const Button = ({ text, onClick }: any) => (
        <button
            onClick={onClick}
            className="w-full border p-4 rounded-lg mb-3 text-left hover:bg-gray-50"
        >
            {text} →
        </button>
    );


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className={card}>

                {/* LOGO */}
                <h1 className="text-2xl font-bold mb-6 text-teal-800">
                    melora
                </h1>

                {/* STEP 1 - FLOW SELECT */}
                {!flow && (
                    <>
                        <h2 className="text-xl font-bold mb-6">
                            Who needs support?
                        </h2>

                        <Button text="A person I'm assisting" onClick={() => { setFlow("assist"); setStep(1); }} />
                        <Button text="Me" onClick={() => { setFlow("me"); setStep(1); }} />
                        <Button text="My client" onClick={() => { setFlow("client"); setStep(1); }} />
                    </>
                )}

                {/* ================= ASSIST FLOW ================= */}
                {flow === "assist" && (
                    <>
                        {step === 1 && (
                            <>
                                <h2 className="text-xl font-bold mb-6">Enter your email</h2>
                                <input
                                    className="w-full border p-3 mb-4"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                                <button className="bg-teal-400 px-6 py-2 rounded" onClick={() => setStep(2)}>Next</button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h2 className="text-xl font-bold mb-6">
                                    What's the name of the person who needs support?
                                </h2>
                                <input
                                    className="w-full border p-3 mb-3"
                                    placeholder="First name"
                                    value={formData.first_name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, first_name: e.target.value })
                                    }
                                />

                                <input
                                    className="w-full border p-3 mb-4"
                                    placeholder="Last name"
                                    value={formData.last_name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, last_name: e.target.value })
                                    }
                                />
                                <button className="bg-teal-400 px-6 py-2 rounded" onClick={() => setStep(3)}>Next</button>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <h2 className="text-xl font-bold mb-6">
                                    Are they 18 years old or over?
                                </h2>
                                <Button
                                    text="Yes, they are 18 or over"
                                    onClick={() => {
                                        setFormData({ ...formData, is_adult: true });
                                        setStep(4);
                                    }}
                                />

                                <Button
                                    text="No, they are not yet 18"
                                    onClick={() => {
                                        setFormData({ ...formData, is_adult: false });
                                        setStep(4);
                                    }}
                                />
                            </>
                        )}

                        {step === 4 && (
                            <>
                                <h2 className="text-xl font-bold mb-6">
                                    Do you have government funding?
                                </h2>
                                <Button
                                    text="I have NDIS funding"
                                    onClick={() => {
                                        setFormData({ ...formData, funding_type: "NDIS" });
                                        setStep(5);
                                    }}
                                />

                                <Button
                                    text="I have Support at Home funding"
                                    onClick={() => {
                                        setFormData({ ...formData, funding_type: "Support at Home" });
                                        setStep(5);
                                    }}
                                />

                                <Button
                                    text="I am waiting for funding"
                                    onClick={() => {
                                        setFormData({ ...formData, funding_type: "Waiting" });
                                        setStep(5);
                                    }}
                                />

                                <Button
                                    text="I am planning to pay privately"
                                    onClick={() => {
                                        setFormData({ ...formData, funding_type: "Private" });
                                        setStep(5);
                                    }}
                                />

                                <Button
                                    text="Other / Not sure"
                                    onClick={() => {
                                        setFormData({ ...formData, funding_type: "Other" });
                                        setStep(5);
                                    }}
                                />
                            </>
                        )}

                        {step === 5 && (
                            <>
                                <h2 className="text-xl font-bold mb-6">
                                    What suburb will support take place?
                                </h2>
                                <input
                                    className="w-full border p-3 mb-4"
                                    placeholder="Enter suburb"
                                    value={formData.suburb}
                                    onChange={(e) =>
                                        setFormData({ ...formData, suburb: e.target.value })
                                    }
                                />
                                <button className="bg-teal-400 px-6 py-2 rounded" onClick={() => setStep(6)}>Next</button>
                            </>
                        )}

                        {step === 6 && (
                            <>
                                <h2 className="text-xl font-bold mb-6">
                                    When would you like to start?
                                </h2>
                                <Button
                                    text="Within the next 4 weeks"
                                    onClick={() => {
                                        setFormData({ ...formData, start_time: "Within 4 weeks" });
                                        setStep(7);
                                    }}
                                />

                                <Button
                                    text="After 4 weeks"
                                    onClick={() => {
                                        setFormData({ ...formData, start_time: "After 4 weeks" });
                                        setStep(7);
                                    }}
                                />
                            </>
                        )}

                        {step === 7 && (
                            <>
                                <h2 className="text-xl font-bold mb-6">
                                    Create your account
                                </h2>
                                <input
                                    className="w-full border p-3 mb-3"
                                    placeholder="First name"
                                    value={formData.first_name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, first_name: e.target.value })
                                    }
                                />
                                <input
                                    className="w-full border p-3 mb-3"
                                    placeholder="Last name"
                                    value={formData.last_name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, last_name: e.target.value })
                                    }
                                />
                                <input
                                    className="w-full border p-3 mb-3"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                                <input
                                    type="password"
                                    className="w-full border p-3 mb-4"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                />
                                <button
                                    className="bg-teal-400 px-6 py-2 rounded"
                                    onClick={async () => {
                                        try {
                                            const res = await fetch("http://localhost/ndis-backend/controllers/participant_signup.php", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    ...formData,
                                                    role: userRole,
                                                }),
                                            });

                                            const data = await res.json();
                                            console.log(data);

                                            if (data.success) {
                                                alert("Account created");
                                                localStorage.setItem("userName", data.name);
                                                if (data.success) {
                                                    router.push("/dashboard");
                                                }
                                            } else {
                                                alert(data.message);
                                            }

                                        } catch (err) {
                                            console.error(err);
                                            alert("Network error");
                                        }
                                    }}
                                >
                                    Create Account
                                </button>
                            </>
                        )}
                    </>
                )}

                {/* ================= ME FLOW ================= */}
                {flow === "me" && (
                    <>
                        {step === 1 && (
                            <>
                                <h2 className="text-xl font-bold mb-6">
                                    Are you over 18?
                                </h2>
                                <Button text="Yes, I am 18+" onClick={() => {
                                    setFormData({ ...formData, is_adult: true });
                                    setStep(2);
                                }} />

                                <Button text="No" onClick={() => {
                                    setFormData({ ...formData, is_adult: false });
                                    setStep(2);
                                }} />
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h2 className="text-xl font-bold mb-6">
                                    Do you have funding?
                                </h2>
                                <Button text="NDIS" onClick={() => {
                                    setFormData({ ...formData, funding_type: "NDIS" });
                                    setStep(3);
                                }} />

                                <Button text="Private" onClick={() => {
                                    setFormData({ ...formData, funding_type: "Private" });
                                    setStep(3);
                                }} />

                                <Button text="Not sure" onClick={() => {
                                    setFormData({ ...formData, funding_type: "Not sure" });
                                    setStep(3);
                                }} />
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <h2 className="text-xl font-bold mb-6">
                                    Location
                                </h2>
                                <input
                                    className="w-full border p-3 mb-4"
                                    placeholder="Enter suburb"
                                    value={formData.suburb}
                                    onChange={(e) =>
                                        setFormData({ ...formData, suburb: e.target.value })
                                    }
                                />
                                <button className="bg-teal-400 px-6 py-2 rounded" onClick={() => setStep(4)}>Next</button>
                            </>
                        )}

                        {step === 4 && (

                            <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">

                                <h2 className="text-2xl font-bold mb-6 text-center">
                                    Create account
                                </h2>

                                {/* First + Last Name */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        value={formData.first_name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, first_name: e.target.value })
                                        }
                                        className="border p-3 rounded w-full"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        value={formData.last_name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, last_name: e.target.value })
                                        }
                                        className="border p-3 rounded w-full"
                                    />
                                </div>

                                {/* Email */}
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full border p-3 rounded mb-4"
                                />

                                {/* Password */}
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="w-full border p-3 rounded mb-6"
                                />

                                {/* Button */}
                                <button
                                    className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
                                    onClick={async () => {
                                        try {
                                            const res = await fetch(
                                                "http://localhost/ndis-backend/controllers/client_signup.php",
                                                {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        ...formData,
                                                        role: userRole,
                                                    }),
                                                }
                                            );

                                            const data = await res.json();

                                            if (data.success) {
                                                localStorage.setItem("userName", data.name);
                                                router.push("/dashboard");
                                            } else {
                                                alert(data.message);
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            alert("Network error");
                                        }
                                    }}
                                >
                                    Create Account
                                </button>
                            </div>
                        )}
                    </>
                )}
                {flow === "client" && (
                    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">

                            <h2 className="text-3xl md:text-4xl font-bold mb-10">
                                Create Coordinator Account
                            </h2>

                            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm">

                                <h3 className="text-lg font-semibold mb-6">
                                    Enter coordinator details below
                                </h3>

                                <div className="space-y-5">

                                    {/* EMAIL */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Business email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                    />

                                    {/* PASSWORD */}
                                    <input
                                        type="password"
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                    />

                                    <p className="text-sm text-gray-500">
                                        Use 8+ characters, uppercase, lowercase, number & symbol
                                    </p>

                                    {/* FIRST NAME */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="First name"
                                        value={formData.first_name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, first_name: e.target.value })
                                        }
                                    />

                                    {/* LAST NAME */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Last name"
                                        value={formData.last_name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, last_name: e.target.value })
                                        }
                                    />

                                    {/* ADDRESS */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Street Address"
                                        value={formData.address}
                                        onChange={(e) =>
                                            setFormData({ ...formData, address: e.target.value })
                                        }
                                    />

                                    {/* SUBURB */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Suburb / State / Postcode"
                                        value={formData.suburb}
                                        onChange={(e) =>
                                            setFormData({ ...formData, suburb: e.target.value })
                                        }
                                    />

                                    {/* PHONE */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Mobile number"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                    />

                                    {/* ORGANISATION */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Organisation name"
                                        value={formData.organisation}
                                        onChange={(e) =>
                                            setFormData({ ...formData, organisation: e.target.value })
                                        }
                                    />

                                    {/* CLIENT TYPE */}
                                    <select
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        value={formData.client_type}
                                        onChange={(e) =>
                                            setFormData({ ...formData, client_type: e.target.value })
                                        }
                                    >
                                        <option value="">Select type of clients</option>
                                        <option value="NDIS Participants">NDIS Participants</option>
                                        <option value="Aged Care">Aged Care</option>
                                        <option value="Both">Both</option>
                                    </select>

                                    {/* ROLE */}
                                    <select
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData({ ...formData, role: e.target.value })
                                        }
                                    >
                                        <option value="">Select what best describes you</option>
                                        <option value="Support Coordinator">Support Coordinator</option>
                                        <option value="Case Manager">Case Manager</option>
                                        <option value="Other">Other</option>
                                    </select>

                                    {/* RADIO */}
                                    <div>
                                        <p className="mb-2 font-medium">
                                            Do you have clients already?
                                        </p>

                                        <label className="mr-6">
                                            <input
                                                type="radio"
                                                checked={formData.has_clients === "Yes"}
                                                onChange={() =>
                                                    setFormData({ ...formData, has_clients: "Yes" })
                                                }
                                            />{" "}
                                            Yes
                                        </label>

                                        <label>
                                            <input
                                                type="radio"
                                                checked={formData.has_clients === "No"}
                                                onChange={() =>
                                                    setFormData({ ...formData, has_clients: "No" })
                                                }
                                            />{" "}
                                            No
                                        </label>
                                    </div>

                                    {/* CHECKBOX */}
                                    <label className="text-sm flex items-start gap-2">
                                        <input type="checkbox" className="mt-1" />
                                        I agree to Melora's Terms & Privacy Policy
                                    </label>

                                    {/* BUTTON */}
                                    <button
                                        className="bg-teal-400 text-black px-8 py-4 rounded-lg text-lg w-full"
                                        onClick={async () => {
                                            try {
                                                console.log(formData); // DEBUG

                                                const res = await fetch(
                                                    "http://localhost/ndis-backend/controllers/client_signup.php",
                                                    {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({
                                                            ...formData,
                                                            role: userRole,
                                                        }),
                                                    }
                                                );

                                                const data = await res.json();

                                                if (data.success) {
                                                    alert("Client created successfully");
                                                    router.push("/dashboard");
                                                } else {
                                                    alert(data.message);
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                alert("Network error");
                                            }
                                        }}
                                    >
                                        Create Account
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}