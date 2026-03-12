export default function PhoneSMSPage() {
    return (
        <div className="bg-white border rounded-xl shadow-sm p-6 md:p-8">

            <label className="block font-medium mb-2">
                Phone number
            </label>

            <input
                className="w-full border rounded-md p-3 mb-6"
                defaultValue="0412 345 670"
            />

            <p className="text-gray-600 mb-6">
                The free Melora app is preferred for notifications.
            </p>

            <label className="flex items-center gap-3 mb-8">
                <input type="checkbox" />
                Receive SMS when notifications are sent
            </label>

            <button className="bg-teal-200 hover:bg-teal-500 text-gray-900 px-6 py-3 rounded-lg">
                Save
            </button>

        </div>
    )
}