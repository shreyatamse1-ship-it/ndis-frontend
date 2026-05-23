"use client"

import { useEffect, useState } from "react"

const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost/ndis-backend/controllers"

type Contact = {
    id?: number
    first_name: string
    last_name: string
    phone: string
    relationship: string
}

export default function EmergencyContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([])

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [relationship, setRelationship] = useState("")

    const userId =
        typeof window !== "undefined"
            ? localStorage.getItem("user_id")
            : null

    // 🔹 FETCH CONTACTS
    const fetchContacts = async () => {
        if (!userId) return

        const res = await fetch(
            `${apiBaseUrl}/get_emergency_contacts.php?user_id=${userId}`
        )
        const data = await res.json()
        setContacts(data)
    }

    useEffect(() => {
        fetchContacts()
    }, [userId])

    // 🔹 SAVE CONTACT
    const handleSave = async () => {
        if (!userId) {
            alert("User not logged in")
            return
        }

        if (!firstName || !phone || !relationship) {
            alert("Fill required fields")
            return
        }

        const res = await fetch(
            `${apiBaseUrl}/add_emergency_contact.php`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId,
                    first_name: firstName,
                    last_name: lastName,
                    phone,
                    relationship
                })
            }
        )

        const data = await res.json()

        if (data.status === "success") {
            alert("Contact added ✅")

            // reset form
            setFirstName("")
            setLastName("")
            setPhone("")
            setRelationship("")

            // refresh list
            fetchContacts()
        } else {
            alert("Failed ❌")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Emergency Contacts</h1>
                    <p className="text-slate-600 text-lg font-normal">Add and manage your emergency contacts</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-10">
                    {/* Add Contact Form */}
                    <div className="mb-10 pb-10 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-900 mb-6">Add New Contact</h2>
                        <div className="space-y-6">
                            {/* First Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="w-full border border-slate-300 bg-white rounded-lg p-3.5 text-slate-900 text-sm placeholder-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 focus:border-transparent transition-all duration-150"
                                    placeholder="Enter contact's first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                    Last Name
                                </label>
                                <input
                                    className="w-full border border-slate-300 bg-white rounded-lg p-3.5 text-slate-900 text-sm placeholder-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 focus:border-transparent transition-all duration-150"
                                    placeholder="Enter contact's last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="w-full border border-slate-300 bg-white rounded-lg p-3.5 text-slate-900 text-sm placeholder-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 focus:border-transparent transition-all duration-150"
                                    placeholder="Enter contact number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            {/* Relationship */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                                    Relationship <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="w-full border border-slate-300 bg-white rounded-lg p-3.5 text-slate-900 text-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 focus:border-transparent transition-all duration-150"
                                    value={relationship}
                                    onChange={(e) => setRelationship(e.target.value)}
                                >
                                    <option value="">Select relationship</option>
                                    <option value="Parent">Parent</option>
                                    <option value="Sibling">Sibling</option>
                                    <option value="Friend">Friend</option>
                                    <option value="Spouse">Spouse</option>
                                </select>
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={handleSave}
                                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-150 shadow-sm hover:shadow-md"
                            >
                                Add Contact
                            </button>
                        </div>
                    </div>

                    {/* Saved Contacts List */}
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 mb-6">Saved Contacts</h2>

                        {contacts.length === 0 ? (
                            <div className="text-center py-10 bg-slate-50 rounded-lg border border-slate-200">
                                <p className="text-slate-500 font-medium text-sm">No emergency contacts added yet</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {contacts.map((c, index) => (
                                    <div
                                        key={index}
                                        className="border border-slate-200 rounded-lg p-5 hover:shadow-sm hover:border-slate-300 transition-all duration-150 bg-white"
                                    >
                                        <p className="font-semibold text-slate-900 text-base mb-2">{c.first_name} {c.last_name}</p>
                                        <p className="text-slate-700 text-sm mb-2"><span className="font-medium text-slate-800">Phone:</span> {c.phone}</p>
                                        <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide">Relationship: {c.relationship}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}