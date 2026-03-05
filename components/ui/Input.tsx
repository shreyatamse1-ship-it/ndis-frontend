interface InputProps {
    placeholder?: string
    type?: string
}

export default function Input({ placeholder, type = "text" }: InputProps) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
    )
}