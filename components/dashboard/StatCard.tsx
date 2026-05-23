"use client";
import Card from "../ui/Card"

type StatCardProps = {
    title: string
    value: string | number
    icon?: React.ReactNode
}

export default function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <Card>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900">
                        {value}
                    </h2>
                </div>

                {icon && (
                    <div className="text-teal-600 text-3xl opacity-20">
                        {icon}
                    </div>
                )}
            </div>
        </Card>
    )
}