export default function AddressPage() {
    return (
        <div className="bg-white border rounded-xl shadow-sm p-6 md:p-8">

            <h2 className="text-xl font-semibold mb-4">
                Residential Address
            </h2>

            <input
                className="w-full border rounded-md p-3 mb-6"
                placeholder="Street Address"
            />

            <input
                className="w-full border rounded-md p-3 mb-8"
                defaultValue="Pemulwuy NSW 2145"
            />

            <h2 className="text-xl font-semibold mb-4">
                Postal Address
            </h2>

            <label className="flex items-center gap-3 mb-6">
                <input type="checkbox" />
                Same as residential address
            </label>

            <input
                className="w-full border rounded-md p-3 mb-6"
                placeholder="Street Address"
            />

            <input
                className="w-full border rounded-md p-3 mb-8"
                placeholder="Suburb/state/postcode"
            />

            <button className="bg-teal-200 hover:bg-teal-500 text-gray-900 px-6 py-3 rounded-lg">
                Save
            </button>

        </div>
    )
}