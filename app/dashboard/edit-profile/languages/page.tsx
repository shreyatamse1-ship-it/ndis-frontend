"use client"

import ProfileSidebar from "../../ProfileSidebar"
import { useState } from "react"

export default function LanguagesPage() {

    const mainLanguages = [
        "Nepali", "Indonesian", "Russian",
        "Arabic", "Italian", "Serbian",
        "Cantonese", "Japanese", "Sinhalese",
        "Croatian", "Korean", "Samoan",
        "English", "Mandarin", "Spanish",
        "French", "Maltese", "Tamil",
        "German", "Macedonian", "Tagalog (Filipino)",
        "Greek", "Netherlandic (Dutch)", "Turkish",
        "Hebrew", "Persian", "Vietnamese",
        "Hindi", "Polish", "Auslan (Australian sign language)",
        "Hungarian", "Portuguese", "Other"
    ]

    const [selectedMain, setSelectedMain] = useState<string[]>([])
    const [selectedOther, setSelectedOther] = useState<string[]>([])

    const toggleMain = (lang: string) => {
        setSelectedMain(prev =>
            prev.includes(lang)
                ? prev.filter(l => l !== lang)
                : [...prev, lang]
        )
    }

    const toggleOther = (lang: string) => {
        setSelectedOther(prev =>
            prev.includes(lang)
                ? prev.filter(l => l !== lang)
                : [...prev, lang]
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                {/* SIDEBAR */}
                <div className="lg:w-1/4">
                    <ProfileSidebar />
                </div>


                {/* CONTENT */}
                <div className="lg:w-3/4">

                    <div className="bg-white rounded-xl shadow-sm p-8">

                        <h1 className="text-3xl font-semibold mb-6">
                            Languages
                        </h1>


                        {/* MAIN LANGUAGES */}
                        <h2 className="text-xl font-semibold mb-2">
                            What languages are you fluent in?
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Select your main language(s)
                        </p>


                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">

                            {mainLanguages.map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => toggleMain(lang)}
                                    className={`border rounded-full py-3 px-4 text-sm transition
                  
                  ${selectedMain.includes(lang)
                                            ? "bg-purple-100 border-purple-500 text-purple-700"
                                            : "border-gray-300 hover:border-purple-400"
                                        }
                  
                  `}
                                >
                                    {lang}
                                </button>
                            ))}

                        </div>


                        <hr className="mb-10" />


                        {/* OTHER LANGUAGES */}
                        <h2 className="text-xl font-semibold mb-2">
                            Other language
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Select other language(s) you can provide support in.
                        </p>


                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">

                            {mainLanguages.map(lang => (
                                <button
                                    key={lang + "other"}
                                    onClick={() => toggleOther(lang)}
                                    className={`border rounded-full py-3 px-4 text-sm transition
                  
                  ${selectedOther.includes(lang)
                                            ? "bg-purple-100 border-purple-500 text-purple-700"
                                            : "border-gray-300 hover:border-purple-400"
                                        }
                  
                  `}
                                >
                                    {lang}
                                </button>
                            ))}

                        </div>


                        {/* SAVE BUTTON */}
                        <button className="bg-teal-200 hover:bg-teal-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg">
                            Save and continue
                        </button>

                    </div>
                </div>

            </div>

        </div>
    )
}