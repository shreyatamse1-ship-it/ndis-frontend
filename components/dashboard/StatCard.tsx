import Card from "../ui/Card"

type StatCardProps = {
    title: string
    value: string
}

export default function StatCard({ title, value }: StatCardProps) {
    return (
        <Card>

            <p className="text-sm text-gray-500">
                {title}
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-2">
                {value}
            </h2>

        </Card>
    )
}