interface ButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export default function Button({ children, className, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-md font-medium transition hover:shadow-md ${className}`}
        >
            {children}
        </button>
    )
}