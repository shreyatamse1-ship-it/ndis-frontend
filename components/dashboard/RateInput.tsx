"use client";

interface Props {
    label: string;
    value: string;
    checked: boolean;
    onCheck: () => void;
    onChange: (v: string) => void;
    flat?: boolean;
}

export default function RateInput({
    label,
    value,
    checked,
    onCheck,
    onChange,
    flat,
}: Props) {
    return (
        <div className="space-y-3">

            {/* Checkbox + label */}
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onCheck}
                    className="w-4 h-4"
                />

                <span className="font-medium">{label}</span>
            </div>

            {/* Input field */}
            {checked && (
                <div>
                    <p className="text-sm text-gray-600 mb-1">
                        {flat
                            ? "Add an indicative flat rate"
                            : "Add an indicative hourly rate"}
                    </p>

                    <div className="relative w-72">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>

                        <input
                            type="number"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="border rounded-md pl-7 pr-3 py-2 w-full"
                            placeholder="0.00"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}