interface TableProps {
    headers: string[]
    rows: string[][]
}

export default function Table({ headers, rows }: TableProps) {
    return (
        <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="text-left p-3">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                        {row.map((cell, j) => (
                            <td key={j} className="p-3">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}