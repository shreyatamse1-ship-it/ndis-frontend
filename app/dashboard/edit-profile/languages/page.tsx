"use client"

import { useEffect, useState } from "react"
import ProfileSidebar from "../../ProfileSidebar"

export default function LanguagesPage() {

    const allLanguages = [
        "Nepali", "Indonesian", "Russian", "Arabic", "Italian", "Serbian",
        "Cantonese", "Japanese", "Sinhalese", "Croatian", "Korean", "Samoan",
        "English", "Mandarin", "Spanish", "French", "Maltese", "Tamil",
        "German", "Macedonian", "Tagalog (Filipino)", "Greek", "Netherlandic (Dutch)", "Turkish",
        "Hebrew", "Persian", "Vietnamese", "Hindi", "Polish", "Auslan (Australian sign language)",
        "Hungarian", "Portuguese", "Other"
    ]

    const [selected, setSelected] = useState<string[]>([])
    const user_id =
        typeof window !== "undefined"
            ? localStorage.getItem("user_id")
            : null

    // 🔥 TOGGLE LANGUAGE
    const toggleLanguage = (lang: string) => {
        if (selected.includes(lang)) {
            setSelected(selected.filter(l => l !== lang))
        } else {
            setSelected([...selected, lang])
        }
    }

    // 🔥 LOAD DATA
    useEffect(() => {
        if (!user_id) return

        fetch(`http:/54.206.186.109//ndis-backend/controllers/get_languages.php?user_id=${user_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    setSelected(data.languages || [])
                }
            })
    }, [user_id])

    // 🔥 SAVE
    const handleSave = async () => {

        if (!user_id) {
            alert("User not logged in")
            return
        }

        try {
            const res = await fetch("http://54.206.186.109/ndis-backend/controllers/save_languages.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: Number(user_id),
                    languages: selected
                })
            })

            const data = await res.json()

            if (data.status === "success") {
                alert("Saved ✅")
            } else {
                alert(data.message)
            }

        } catch (err) {
            console.error(err)
            alert("Error saving")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <h1 className="text-2xl font-semibold mb-6">My profile</h1>

            <div className="flex gap-6">

                <div className="w-72">
                    <ProfileSidebar />
                </div>

                <div className="flex-1 bg-white border rounded-lg p-6">

                    <h2 className="text-2xl font-semibold mb-2">Languages</h2>

                    <p className="text-gray-600 mb-6">
                        What languages are you fluent in?
                    </p>

                    {/* 🔥 LANGUAGE GRID */}
                    <div className="grid grid-cols-3 gap-4 mb-8">

                        {allLanguages.map(lang => (

                            <div
                                key={lang}
                                onClick={() => toggleLanguage(lang)}
                                className={`border rounded-full px-4 py-2 text-center cursor-pointer
                                ${selected.includes(lang)
                                        ? "bg-gray-200 border-gray-400"
                                        : "border-gray-200"}
                                `}
                            >
                                {lang}
                            </div>

                        ))}

                    </div>

                    {/* SAVE */}
                    <button
                        onClick={handleSave}
                        className="bg-teal-200 hover:bg-teal-400 px-8 py-3 rounded-md"
                    >
                        Save and continue
                    </button>

                </div>

            </div>
        </div>
    )
}