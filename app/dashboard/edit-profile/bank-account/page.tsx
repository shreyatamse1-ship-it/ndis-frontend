"use client"

import { useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

export default function BankAccountPage() {

    const [accountName, setAccountName] = useState("")
    const [bankName, setBankName] = useState("")
    const [bsb, setBsb] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [agreed, setAgreed] = useState(false)

    const handleSave = async () => {

        // ✅ Basic validation
        if (!accountName || !bankName || !bsb || !accountNumber) {
            alert("Please fill all fields")
            return
        }

        if (!agreed) {
            alert("Please accept the agreement")
            return
        }

        const payload = {
            user_id: 1, // replace later with real login ID
            account_name: accountName,
            bank_name: bankName,
            bsb: bsb,
            account_number: accountNumber
        }

        try {
            const res = await fetch("http://localhost/ndis-backend/controllers/save_bank.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            const text = await res.text()
            console.log("RAW:", text)

            const data = JSON.parse(text)

            if (data.status === "success") {
                alert("Bank details saved ✅")
            } else {
                alert(data.message)
            }

        } catch (err) {
            console.error(err)
            alert("Something went wrong")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <h1 className="text-2xl font-semibold mb-6">
                My profile
            </h1>

            <div className="flex flex-col md:flex-row gap-6">

                {/* Sidebar */}
                <div className="w-full md:w-72">
                    <ProfileSidebar />
                </div>

                {/* Right Content */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">

                    <h2 className="text-2xl font-semibold mb-3">
                        Bank account
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Enter your bank details to receive payments.
                    </p>

                    {/* Info */}
                    <div className="bg-purple-100 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <span>🔒</span>
                        <p>
                            Your bank details <strong>will not be displayed</strong>
                        </p>
                    </div>

                    {/* Account Name */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Account name
                        </label>

                        <input
                            type="text"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="w-full border border-gray-200 rounded-md p-3"
                        />
                    </div>

                    {/* Bank Name */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Bank name
                        </label>

                        <input
                            type="text"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            className="w-full border border-gray-200 rounded-md p-3"
                        />
                    </div>

                    {/* BSB + Account */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">

                        <div>
                            <label className="block mb-1 font-medium">
                                BSB
                            </label>

                            <input
                                type="text"
                                value={bsb}
                                onChange={(e) => setBsb(e.target.value)}
                                className="w-full border border-gray-200 rounded-md p-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Account number
                            </label>

                            <input
                                type="text"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                className="w-full border border-gray-200 rounded-md p-3"
                            />
                        </div>

                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-3 mb-6">

                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />

                        <p className="text-gray-600 text-sm">
                            I confirm my details are correct.
                        </p>

                    </div>

                    {/* Save */}
                    <button
                        onClick={handleSave}
                        className="bg-teal-200 hover:bg-teal-400 text-gray-900 px-8 py-3 rounded-md"
                    >
                        Save and continue
                    </button>

                </div>
            </div>
        </div>
    )
}