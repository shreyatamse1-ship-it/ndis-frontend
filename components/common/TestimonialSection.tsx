type Testimonial = {
    name: string;
    text: string;
};

export default function TestimonialSection({
    data,
}: {
    data: Testimonial[];
}) {
    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
                Hear from other support workers
            </h2>

            <div className="grid grid-cols-3 gap-6">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-xl shadow"
                    >
                        <p className="text-gray-600">"{item.text}"</p>
                        <div className="mt-4 font-semibold">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}