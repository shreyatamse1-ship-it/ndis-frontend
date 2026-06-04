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
    const [error, setError] = useState("");
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [suburbFilter, setSuburbFilter] = useState("");
    const router = useRouter();

    const card = "bg-white p-8 rounded-xl shadow-md w-full max-w-md";

    // Australian suburbs data
    const australianSuburbs = [
        // NSW
        "Putney",
        "Parramatta",
        "Ryde",
        "Chatswood",
        "North Sydney",
        "Bondi",
        "Bondi Junction",
        "Coogee",
        "Maroubra",
        "Newtown",
        "Marrickville",
        "Surry Hills",
        "Redfern",
        "Alexandria",
        "Zetland",
        "Waterloo",
        "Ashfield",
        "Burwood",
        "Strathfield",
        "Epping",
        "Blacktown",
        "Liverpool",
        "Penrith",
        "Campbelltown",
        "Cronulla",
        "Manly",
        "Mosman",
        "Lane Cove",
        "Hornsby",

        // VIC
        "Richmond",
        "St Kilda",
        "South Yarra",
        "Footscray",
        "Carlton",
        "Docklands",
        "Brunswick",
        "Fitzroy",
        "Preston",
        "Reservoir",
        "Coburg",
        "Essendon",
        "Glen Waverley",
        "Box Hill",
        "Clayton",
        "Dandenong",
        "Frankston",
        "Sunshine",
        "Werribee",
        "Point Cook",

        // QLD
        "South Brisbane",
        "West End",
        "Fortitude Valley",
        "New Farm",
        "Chermside",
        "Carindale",
        "Logan Central",
        "Springwood",
        "Ipswich",
        "Redcliffe",
        "Cleveland",
        "Southport",
        "Surfers Paradise",
        "Broadbeach",
        "Coolangatta",

        // WA
        "Fremantle",
        "Joondalup",
        "Subiaco",
        "Cannington",
        "Morley",
        "Midland",
        "Rockingham",
        "Mandurah",

        // SA
        "Norwood",
        "Glenelg",
        "Prospect",
        "Mawson Lakes",
        "Unley",

        // TAS
        "Sandy Bay",
        "Kingston",
        "Launceston",
        "Devonport",

        // ACT
        "Belconnen",
        "Gungahlin",
        "Tuggeranong",
        "Woden"
    ];

    // Remove duplicates and sort
    const uniqueSuburbs = Array.from(new Set(australianSuburbs)).sort();

    // Filtered suburbs based on search
    const filteredSuburbs = uniqueSuburbs.filter(suburb =>
        suburb.toLowerCase().includes(suburbFilter.toLowerCase())
    );

    // Validation functions
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password: string): boolean => {
        return password.length >= 6;
    };

    // Check if email already exists
    const checkEmailExists = async (email: string): Promise<boolean> => {
        try {
            setIsCheckingEmail(true);
            const res = await fetch("http://54.206.186.109/ndis-backend/controllers/check_email.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            return data.exists || false;
        } catch (err) {
            console.error("Error checking email:", err);
            return false;
        } finally {
            setIsCheckingEmail(false);
        }
    };

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
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        setError("");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                                <button
                                    className="bg-teal-400 px-6 py-2 rounded disabled:opacity-50"
                                    disabled={isCheckingEmail}
                                    onClick={async () => {
                                        if (!formData.email.trim()) {
                                            setError("Email is required");
                                            return;
                                        }
                                        if (!isValidEmail(formData.email)) {
                                            setError("Please enter a valid email address");
                                            return;
                                        }

                                        // Check if email already exists
                                        const emailExists = await checkEmailExists(formData.email);
                                        if (emailExists) {
                                            setError("This email is already signed in with an existing account");
                                            return;
                                        }

                                        setError("");
                                        setStep(2);
                                    }}
                                >
                                    {isCheckingEmail ? "Checking..." : "Next"}
                                </button>
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
                                    onChange={(e) => {
                                        setFormData({ ...formData, first_name: e.target.value });
                                        setError("");
                                    }}
                                />

                                <input
                                    className="w-full border p-3 mb-4"
                                    placeholder="Last name"
                                    value={formData.last_name}
                                    onChange={(e) => {
                                        setFormData({ ...formData, last_name: e.target.value });
                                        setError("");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                                <button
                                    className="bg-teal-400 px-6 py-2 rounded"
                                    onClick={() => {
                                        if (!formData.first_name.trim()) {
                                            setError("First name is required");
                                            return;
                                        }
                                        if (!formData.last_name.trim()) {
                                            setError("Last name is required");
                                            return;
                                        }
                                        setError("");
                                        setStep(3);
                                    }}
                                >
                                    Next
                                </button>
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
                                <div className="relative mb-4">
                                    <input
                                        className="w-full border p-3 mb-2"
                                        placeholder="Search suburb..."
                                        value={suburbFilter}
                                        onChange={(e) => setSuburbFilter(e.target.value)}
                                    />
                                    <div className="border rounded max-h-48 overflow-y-auto bg-white">
                                        {filteredSuburbs.length > 0 ? (
                                            filteredSuburbs.map((suburb) => (
                                                <button
                                                    key={suburb}
                                                    onClick={() => {
                                                        setFormData({ ...formData, suburb });
                                                        setSuburbFilter("");
                                                        setError("");
                                                    }}
                                                    className="w-full text-left p-3 hover:bg-teal-100 border-b"
                                                >
                                                    {suburb}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-3 text-gray-500">No suburbs found</div>
                                        )}
                                    </div>
                                </div>
                                {formData.suburb && (
                                    <p className="text-sm text-teal-600 mb-4">Selected: {formData.suburb}</p>
                                )}
                                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                                <button
                                    className="bg-teal-400 px-6 py-2 rounded"
                                    onClick={() => {
                                        if (!formData.suburb.trim()) {
                                            setError("Suburb is required");
                                            return;
                                        }
                                        setError("");
                                        setStep(6);
                                    }}
                                >
                                    Next
                                </button>
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
                                    onChange={(e) => {
                                        setFormData({ ...formData, first_name: e.target.value });
                                        setError("");
                                    }}
                                />
                                <input
                                    className="w-full border p-3 mb-3"
                                    placeholder="Last name"
                                    value={formData.last_name}
                                    onChange={(e) => {
                                        setFormData({ ...formData, last_name: e.target.value });
                                        setError("");
                                    }}
                                />
                                <input
                                    className="w-full border p-3 mb-3"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        setError("");
                                    }}
                                />
                                <input
                                    type="password"
                                    className="w-full border p-3 mb-4"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                        setError("");
                                    }}
                                />
                                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                                <button
                                    className="bg-teal-400 px-6 py-2 rounded disabled:opacity-50"
                                    disabled={isCheckingEmail}
                                    onClick={async () => {
                                        if (!formData.first_name.trim()) {
                                            setError("First name is required");
                                            return;
                                        }
                                        if (!formData.last_name.trim()) {
                                            setError("Last name is required");
                                            return;
                                        }
                                        if (!formData.email.trim()) {
                                            setError("Email is required");
                                            return;
                                        }
                                        if (!isValidEmail(formData.email)) {
                                            setError("Please enter a valid email address");
                                            return;
                                        }

                                        // Check if email already exists
                                        const emailExists = await checkEmailExists(formData.email);
                                        if (emailExists) {
                                            setError("This email is already signed in with an existing account");
                                            return;
                                        }

                                        if (!formData.password.trim()) {
                                            setError("Password is required");
                                            return;
                                        }
                                        if (!isValidPassword(formData.password)) {
                                            setError("Password must be at least 6 characters long");
                                            return;
                                        }

                                        try {
                                            const res = await fetch("http://54.206.186.109/ndis-backend/controllers/participant_signup.php", {
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
                                                setError(data.message || "Signup failed");
                                            }

                                        } catch (err) {
                                            console.error(err);
                                            setError("Network error");
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
                                <div className="relative mb-4">
                                    <input
                                        className="w-full border p-3 mb-2"
                                        placeholder="Search suburb..."
                                        value={suburbFilter}
                                        onChange={(e) => setSuburbFilter(e.target.value)}
                                    />
                                    <div className="border rounded max-h-48 overflow-y-auto bg-white">
                                        {filteredSuburbs.length > 0 ? (
                                            filteredSuburbs.map((suburb) => (
                                                <button
                                                    key={suburb}
                                                    onClick={() => {
                                                        setFormData({ ...formData, suburb });
                                                        setSuburbFilter("");
                                                        setError("");
                                                    }}
                                                    className="w-full text-left p-3 hover:bg-teal-100 border-b"
                                                >
                                                    {suburb}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-3 text-gray-500">No suburbs found</div>
                                        )}
                                    </div>
                                </div>
                                {formData.suburb && (
                                    <p className="text-sm text-teal-600 mb-4">Selected: {formData.suburb}</p>
                                )}
                                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                                <button
                                    className="bg-teal-400 px-6 py-2 rounded"
                                    onClick={() => {
                                        if (!formData.suburb.trim()) {
                                            setError("Suburb is required");
                                            return;
                                        }
                                        setError("");
                                        setStep(4);
                                    }}
                                >
                                    Next
                                </button>
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
                                        onChange={(e) => {
                                            setFormData({ ...formData, first_name: e.target.value });
                                            setError("");
                                        }}
                                        className="border p-3 rounded w-full"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        value={formData.last_name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, last_name: e.target.value });
                                            setError("");
                                        }}
                                        className="border p-3 rounded w-full"
                                    />
                                </div>

                                {/* Email */}
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        setError("");
                                    }}
                                    className="w-full border p-3 rounded mb-4"
                                />

                                {/* Password */}
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                        setError("");
                                    }}
                                    className="w-full border p-3 rounded mb-6"
                                />

                                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                                {/* Button */}
                                <button
                                    className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition disabled:opacity-50"
                                    disabled={isCheckingEmail}
                                    onClick={async () => {
                                        if (!formData.first_name.trim()) {
                                            setError("First name is required");
                                            return;
                                        }
                                        if (!formData.last_name.trim()) {
                                            setError("Last name is required");
                                            return;
                                        }
                                        if (!formData.email.trim()) {
                                            setError("Email is required");
                                            return;
                                        }
                                        if (!isValidEmail(formData.email)) {
                                            setError("Please enter a valid email address");
                                            return;
                                        }

                                        // Check if email already exists
                                        const emailExists = await checkEmailExists(formData.email);
                                        if (emailExists) {
                                            setError("This email is already signed in with an existing account");
                                            return;
                                        }

                                        if (!formData.password.trim()) {
                                            setError("Password is required");
                                            return;
                                        }
                                        if (!isValidPassword(formData.password)) {
                                            setError("Password must be at least 6 characters long");
                                            return;
                                        }

                                        try {
                                            const res = await fetch(
                                                "http://54.206.186.109/ndis-backend/controllers/client_signup.php",
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
                                                setError(data.message || "Signup failed");
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            setError("Network error");
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

                                {error && <p className="text-red-500 text-sm mb-6 bg-red-50 p-3 rounded">{error}</p>}

                                <div className="space-y-5">

                                    {/* EMAIL */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Business email"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            setError("");
                                        }}
                                    />

                                    {/* PASSWORD */}
                                    <input
                                        type="password"
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) => {
                                            setFormData({ ...formData, password: e.target.value });
                                            setError("");
                                        }}
                                    />

                                    <p className="text-sm text-gray-500">
                                        Use 8+ characters, uppercase, lowercase, number & symbol
                                    </p>

                                    {/* FIRST NAME */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="First name"
                                        value={formData.first_name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, first_name: e.target.value });
                                            setError("");
                                        }}
                                    />

                                    {/* LAST NAME */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Last name"
                                        value={formData.last_name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, last_name: e.target.value });
                                            setError("");
                                        }}
                                    />

                                    {/* ADDRESS */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Street Address"
                                        value={formData.address}
                                        onChange={(e) => {
                                            setFormData({ ...formData, address: e.target.value });
                                            setError("");
                                        }}
                                    />

                                    {/* SUBURB */}
                                    <div className="relative">
                                        <input
                                            className="w-full border border-gray-300 p-4 rounded-lg"
                                            placeholder="Search suburb..."
                                            value={suburbFilter}
                                            onChange={(e) => setSuburbFilter(e.target.value)}
                                        />
                                        {suburbFilter && (
                                            <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto bg-white absolute w-full z-10 mt-1">
                                                {filteredSuburbs.length > 0 ? (
                                                    filteredSuburbs.map((suburb) => (
                                                        <button
                                                            key={suburb}
                                                            onClick={() => {
                                                                setFormData({ ...formData, suburb });
                                                                setSuburbFilter("");
                                                            }}
                                                            className="w-full text-left p-3 hover:bg-teal-100 border-b"
                                                        >
                                                            {suburb}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="p-3 text-gray-500">No suburbs found</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {formData.suburb && (
                                        <p className="text-sm text-teal-600">Selected: {formData.suburb}</p>
                                    )}

                                    {/* PHONE */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Mobile number"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            setFormData({ ...formData, phone: e.target.value });
                                            setError("");
                                        }}
                                    />

                                    {/* ORGANISATION */}
                                    <input
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        placeholder="Organisation name"
                                        value={formData.organisation}
                                        onChange={(e) => {
                                            setFormData({ ...formData, organisation: e.target.value });
                                            setError("");
                                        }}
                                    />

                                    {/* CLIENT TYPE */}
                                    <select
                                        className="w-full border border-gray-300 p-4 rounded-lg"
                                        value={formData.client_type}
                                        onChange={(e) => {
                                            setFormData({ ...formData, client_type: e.target.value });
                                            setError("");
                                        }}
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
                                        onChange={(e) => {
                                            setFormData({ ...formData, role: e.target.value });
                                            setError("");
                                        }}
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
                                                onChange={() => {
                                                    setFormData({ ...formData, has_clients: "Yes" });
                                                    setError("");
                                                }}
                                            />{" "}
                                            Yes
                                        </label>

                                        <label>
                                            <input
                                                type="radio"
                                                checked={formData.has_clients === "No"}
                                                onChange={() => {
                                                    setFormData({ ...formData, has_clients: "No" });
                                                    setError("");
                                                }}
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
                                        className="bg-teal-400 text-black px-8 py-4 rounded-lg text-lg w-full disabled:opacity-50"
                                        disabled={isCheckingEmail}
                                        onClick={async () => {
                                            if (!formData.email.trim()) {
                                                setError("Email is required");
                                                return;
                                            }
                                            if (!isValidEmail(formData.email)) {
                                                setError("Please enter a valid email address");
                                                return;
                                            }

                                            // Check if email already exists
                                            const emailExists = await checkEmailExists(formData.email);
                                            if (emailExists) {
                                                setError("This email is already signed in with an existing account");
                                                return;
                                            }

                                            if (!formData.password.trim()) {
                                                setError("Password is required");
                                                return;
                                            }
                                            if (!formData.first_name.trim()) {
                                                setError("First name is required");
                                                return;
                                            }
                                            if (!formData.last_name.trim()) {
                                                setError("Last name is required");
                                                return;
                                            }
                                            if (!formData.address.trim()) {
                                                setError("Address is required");
                                                return;
                                            }
                                            if (!formData.suburb.trim()) {
                                                setError("Suburb is required");
                                                return;
                                            }
                                            if (!formData.phone.trim()) {
                                                setError("Phone number is required");
                                                return;
                                            }
                                            if (!formData.organisation.trim()) {
                                                setError("Organisation name is required");
                                                return;
                                            }
                                            if (!formData.client_type) {
                                                setError("Please select type of clients");
                                                return;
                                            }
                                            if (!formData.role) {
                                                setError("Please select your role");
                                                return;
                                            }
                                            if (!formData.has_clients) {
                                                setError("Please select if you have clients");
                                                return;
                                            }

                                            try {
                                                console.log(formData); // DEBUG

                                                const res = await fetch(
                                                    "http://54.206.186.109/ndis-backend/controllers/client_signup.php",
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
                                                    setError(data.message || "Signup failed");
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                setError("Network error");
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