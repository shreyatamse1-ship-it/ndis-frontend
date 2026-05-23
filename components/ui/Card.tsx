type CardProps = {
    title?: string
    children: React.ReactNode
}

export default function Card({ title, children }: CardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">

            {title && (
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {title}
                </h3>
            )}

            {children}

        </div>
    )
}