"use client";

import { useState } from "react";

export default function FindSupport() {

    const [step, setStep] = useState(1)

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        age: "",
        funding: "",
        suburb: "",
        startTime: "",
        accountFirstName: "",
        accountLastName: "",
        phone: "",
        password: ""
    })

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-lg shadow-md w-[600px]">

                {/* STEP 1 */}

                {step === 1 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            Who needs support?
                        </h2>

                        <div className="flex flex-col gap-4">

                            <button
                                onClick={() => setStep(2)}
                                className="border p-4 rounded-lg text-left"
                            >
                                A person I'm assisting →
                            </button>

                            <button
                                onClick={() => setStep(2)}
                                className="border p-4 rounded-lg text-left"
                            >
                                Me →
                            </button>

                            <button
                                onClick={() => setStep(2)}
                                className="border p-4 rounded-lg text-left"
                            >
                                My client →
                            </button>

                        </div>
                    </>
                )}

                {/* STEP 2 */}

                {step === 2 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            Enter your email
                        </h2>

                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border p-3 w-full mb-6"
                        />

                        <button
                            onClick={() => setStep(3)}
                            className="bg-teal-200 text-gray-900 px-6 py-3 rounded"
                        >
                            Next
                        </button>
                    </>
                )}

                {/* STEP 3 */}

                {step === 3 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            What's the name of the person who needs support?
                        </h2>

                        <input
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="border p-3 w-full mb-4"
                        />

                        <input
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="border p-3 w-full mb-6"
                        />

                        <button
                            onClick={() => setStep(4)}
                            className="bg-teal-200 text-gray-900 px-6 py-3 rounded"
                        >
                            Next
                        </button>
                    </>
                )}

                {/* STEP 4 */}

                {step === 4 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            Are they 18 years old or over?
                        </h2>

                        <div className="flex flex-col gap-4">

                            <button
                                onClick={() => {
                                    setFormData({ ...formData, age: "18+" })
                                    setStep(5)
                                }}
                                className="border p-4 rounded-lg text-left"
                            >
                                Yes, they are 18 or over →
                            </button>

                            <button
                                onClick={() => {
                                    setFormData({ ...formData, age: "under18" })
                                    setStep(5)
                                }}
                                className="border p-4 rounded-lg text-left"
                            >
                                No, they are not yet 18 →
                            </button>

                        </div>
                    </>
                )}

                {/* STEP 5 */}

                {step === 5 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            Do you have government funding?
                        </h2>

                        <div className="flex flex-col gap-4">

                            <button
                                onClick={() => {
                                    setFormData({ ...formData, funding: "NDIS" })
                                    setStep(6)
                                }}
                                className="border p-4 rounded-lg text-left"
                            >
                                I have NDIS funding →
                            </button>

                            <button
                                onClick={() => {
                                    setFormData({ ...formData, funding: "support-home" })
                                    setStep(6)
                                }}
                                className="border p-4 rounded-lg text-left"
                            >
                                I have Support at Home funding →
                            </button>

                            <button
                                onClick={() => {
                                    setFormData({ ...formData, funding: "waiting" })
                                    setStep(6)
                                }}
                                className="border p-4 rounded-lg text-left"
                            >
                                I am waiting for funding →
                            </button>

                            <button
                                onClick={() => {
                                    setFormData({ ...formData, funding: "private" })
                                    setStep(6)
                                }}
                                className="border p-4 rounded-lg text-left"
                            >
                                I am planning to pay privately →
                            </button>

                            <button
                                onClick={() => {
                                    setFormData({ ...formData, funding: "other" })
                                    setStep(6)
                                }}
                                className="border p-4 rounded-lg text-left"
                            >
                                Other / Not sure →
                            </button>

                        </div>
                    </>
                )}

                {/* STEP 6 */}

                {step === 6 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            What suburb will support usually take place?
                        </h2>

                        <input
                            placeholder="Enter suburb"
                            value={formData.suburb}
                            onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                            className="border p-3 w-full mb-6"
                        />

                        <button
                            onClick={() => setStep(7)}
                            className="bg-teal-200 text-gray-900 px-6 py-3 rounded"
                        >
                            Next
                        </button>
                    </>
                )}

                {/* STEP 7 */}

                {step === 7 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            When would you like to start looking for support?
                        </h2>

                        <div className="flex flex-col gap-4">

                            <button
                                onClick={() => {
                                    setFormData({ ...formData, startTime: "ready" })
                                    setStep(8)
                                }}
                                className="border p-4 rounded-lg text-left"
                            >
                                I'm ready to start within the next 4 weeks →
                            </button>

                            <button
                                onClick={() => {
                                    setFormData({ ...formData, startTime: "later" })
                                    setStep(8)
                                }}
                                className="border p-4 rounded-lg text-left"
                            >
                                I'm not ready yet – maybe after 4 weeks →
                            </button>

                        </div>
                    </>
                )}

                {/* STEP 8 */}

                {step === 8 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            Add account holder’s details
                        </h2>

                        <input
                            placeholder="First name"
                            value={formData.accountFirstName}
                            onChange={(e) => setFormData({ ...formData, accountFirstName: e.target.value })}
                            className="border p-3 w-full mb-4"
                        />

                        <input
                            placeholder="Last name"
                            value={formData.accountLastName}
                            onChange={(e) => setFormData({ ...formData, accountLastName: e.target.value })}
                            className="border p-3 w-full mb-4"
                        />

                        <input
                            placeholder="Mobile number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="border p-3 w-full mb-4"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border p-3 w-full mb-4"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="border p-3 w-full mb-6"
                        />

                        <button className="bg-teal-200 text-gray-900 px-6 py-3 rounded">
                            Create Account
                        </button>

                    </>
                )}

            </div>

        </div>
    )
}