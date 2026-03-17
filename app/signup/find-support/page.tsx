"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FindSupport() {
    const router = useRouter();

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        email: "",
        accountFirstName: "",
        accountLastName: "",
        phone: "",
        password: "",
    });



    const handleSubmit = async () => {
        console.log("FINAL DATA:", formData); // 🔍 DEBUG

        const userData = {
            name: formData.accountFirstName + " " + formData.accountLastName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
        };

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            console.log("RESPONSE:", data);

            if (res.ok) {
                alert("Account created successfully");
                router.push("/dashboard");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    };


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
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
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
                            value={formData.accountFirstName}
                            onChange={(e) =>
                                setFormData({ ...formData, accountFirstName: e.target.value })
                            }
                            className="border p-3 w-full mb-4"
                        />

                        <input
                            placeholder="Last name"
                            value={formData.accountLastName}
                            onChange={(e) =>
                                setFormData({ ...formData, accountLastName: e.target.value })
                            }
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
                            Create your account
                        </h2>

                        <input
                            placeholder="Account first name"
                            value={formData.accountFirstName}
                            onChange={(e) => setFormData({ ...formData, accountFirstName: e.target.value })}
                            className="border p-3 w-full mb-4"
                        />

                        <input
                            placeholder="Account last name"
                            value={formData.accountLastName}
                            onChange={(e) => setFormData({ ...formData, accountLastName: e.target.value })}
                            className="border p-3 w-full mb-4"
                        />

                        <input
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="border p-3 w-full mb-4"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="border p-3 w-full mb-6"
                        />

                        <button
                            onClick={handleSubmit}
                            className="bg-teal-400 px-6 py-3 rounded"
                        >
                            Create Account
                        </button>
                        {step === 8 && (
                            <>


                                <button
                                    className="nextBtn"
                                    onClick={() => router.push("/dashboard")}
                                >

                                </button>
                            </>
                        )}

                    </>

                )}


            </div>

        </div >
    )
}