"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProvideSupport() {

    const router = useRouter()

    const [step, setStep] = useState(1)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })

    }
    const handleSubmit = async () => {
        try {
            const res = await fetch(
                "http://localhost/ndis-backend/index.php?route=provider_signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.email,
                        password: formData.password,
                        phone: formData.mobile,
                    }),
                }
            );

            const text = await res.text();
            console.log("RAW RESPONSE:", text);

            const data = text ? JSON.parse(text) : {};

            if (data.success) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        id: data.user_id,
                        name: data.name,
                    })
                );
                alert("Account created successfully 🚀");
                router.push("/dashboard");
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    };


    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white w-[650px] p-10 rounded-lg shadow">

                {/* STEP 1 */}

                {step === 1 && (
                    <>
                        <div className="max-w-xl mx-auto text-gray-800">

                            <p className="mb-4">
                                Before signing up, it's important to know:
                            </p>

                            <h3 className="text-lg font-semibold mb-2">
                                You won't be a Melora employee:
                            </h3>

                            <ul className="list-disc ml-6 space-y-2 mb-6">
                                <li>You’ll be your own boss and an independent contractor</li>
                                <li>You’ll have (or will need to get) an Australian Business Number (ABN)</li>
                                <li>You’ll be responsible for your tax and super</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2">
                                Here's what else you'll need to get approved to provide support on Melora:
                            </h3>

                            <ul className="list-disc ml-6 space-y-2">
                                <li>A mobile number</li>
                                <li>An NDIS Worker Screening Check</li>
                                <li>At least 2 professional references</li>
                                <li>Relevant qualifications</li>
                                <li>Working with Children Check (if applicable)</li>
                                <li>Profile photo and bio</li>
                            </ul>

                        </div>

                        <div className="flex justify-between mt-8">

                            <button
                                onClick={() => window.history.back()}
                                className="border px-6 py-2 rounded"
                            >
                                Back
                            </button>

                            <button
                                onClick={() => setStep(2)}
                                className="bg-teal-200 text-gray-900 px-6 py-2 rounded"
                            >
                                Continue sign up
                            </button>

                        </div>
                    </>
                )}

                {/* STEP 2 */}

                {step === 2 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            Where are you located?
                        </h2>

                        <input
                            placeholder="Suburb / state / postcode"
                            className="border p-3 w-full mb-6"
                        />

                        <button
                            onClick={() => setStep(3)}
                            className="bg-teal-200 px-6 py-2 rounded"
                        >
                            Next
                        </button>
                    </>
                )}

                {/* STEP 3 */}

                {step === 3 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            How many hours a week would you like to work?
                        </h2>

                        <div className="flex flex-col gap-4">

                            <button onClick={() => setStep(4)} className="border p-4 rounded-lg text-left">
                                1–10 hours
                            </button>

                            <button onClick={() => setStep(4)} className="border p-4 rounded-lg text-left">
                                11–25 hours
                            </button>

                            <button onClick={() => setStep(4)} className="border p-4 rounded-lg text-left">
                                26–35 hours
                            </button>

                            <button onClick={() => setStep(4)} className="border p-4 rounded-lg text-left">
                                More than 36 hours
                            </button>

                        </div>
                    </>
                )}

                {/* STEP 4 */}

                {step === 4 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            When would you like to start working?
                        </h2>

                        <div className="flex flex-col gap-4">

                            <button onClick={() => setStep(5)} className="border p-4 rounded-lg text-left">
                                Immediately
                            </button>

                            <button onClick={() => setStep(5)} className="border p-4 rounded-lg text-left">
                                Within 2 weeks
                            </button>

                            <button onClick={() => setStep(5)} className="border p-4 rounded-lg text-left">
                                In 2–4 weeks
                            </button>

                            <button onClick={() => setStep(5)} className="border p-4 rounded-lg text-left">
                                Later than 4 weeks
                            </button>

                            <button onClick={() => setStep(5)} className="border p-4 rounded-lg text-left">
                                I'm not sure
                            </button>

                        </div>
                    </>
                )}

                {/* STEP 5 */}

                {step === 5 && (

                    <div className="max-w-xl mx-auto">

                        <h2 className="text-2xl font-bold mb-8 text-center">
                            Please provide your details
                        </h2>

                        <div className="grid grid-cols-2 gap-6">

                            <input
                                name="firstName"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="border p-3 rounded w-full"
                            />

                            <input
                                name="lastName"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="border p-3 rounded w-full"
                            />

                            <input
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border p-3 rounded w-full"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border p-3 rounded w-full"
                            />

                            <input
                                name="mobile"
                                placeholder="Mobile number"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="border p-3 rounded w-full"
                            />

                            <button
                                onClick={handleSubmit}
                                className="bg-teal-300 hover:bg-teal-400 text-black font-medium px-6 py-3 rounded"
                            >
                                Create account
                            </button>

                        </div>

                    </div>

                )}





            </div>

        </div >

    )
}