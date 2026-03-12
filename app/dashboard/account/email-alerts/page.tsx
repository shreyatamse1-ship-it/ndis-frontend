export default function EmailAlerts() {
    return (
        <div className="bg-white border rounded-xl shadow-sm p-6 md:p-8 space-y-4">

            {[
                "agreements",
                "posted jobs",
                "messages",
                "planned session reminder emails",
                "support hours",
            ].map((item, i) => (
                <label key={i} className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked />
                    I would like to receive emails about {item}.
                </label>
            ))}

            <button className="bg-teal-200 hover:bg-teal-500 text-gray-900 px-6 py-3 rounded-lg mt-4">
                Save
            </button>

        </div>
    )
}