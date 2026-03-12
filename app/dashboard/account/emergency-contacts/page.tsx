export default function EmergencyContacts() {
    return (
        <div className="bg-white border rounded-xl shadow-sm p-6 md:p-8">

            <input
                className="w-full border rounded-md p-3 mb-6"
                placeholder="Contact's First Name"
            />

            <input
                className="w-full border rounded-md p-3 mb-6"
                placeholder="Contact's Last Name"
            />

            <input
                className="w-full border rounded-md p-3 mb-6"
                placeholder="Contact Number"
            />

            <select className="w-full border rounded-md p-3 mb-8">
                <option value="">Select relationship</option>
                <option>Partner / Spouse</option>
                <option>Immediate Family</option>
                <option>Extended Family</option>
                <option>Legal Representative / Advocate</option>
                <option>Approved Provider / Care Coordinator</option>
                <option>Friend / Neighbour</option>
            </select>

            <button className="bg-teal-200 hover:bg-teal-500 text- px-6 py-3 rounded-lg">
                Save
            </button>

        </div>
    )
}