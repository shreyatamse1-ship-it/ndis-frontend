type CardProps = {
    title?: string
    children: React.ReactNode
}

export default function Card({ title, children }: CardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

            {title && (
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {title}
                </h3>
            )}

            {children}

        </div>
    )
}