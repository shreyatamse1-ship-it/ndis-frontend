"use client";

import { useEffect, useState } from "react";

type Client = {
    application_id: number;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    suburb: string;
    funding_type: string;
    title: string;
    status: string;
};

export default function MyClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user) return;

        const parsed = JSON.parse(user);

        fetch(
            `http://54.206.186.109/ndis-backend/controllers/getMyClients.php?user_id=${parsed.id}`
        )
            .then((res) => res.json())
            .then((data) => setClients(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-6">

            <div className="mb-8">
                <h1 className="text-3xl font-semibold">
                    My Clients
                </h1>

                <p className="text-gray-500">
                    Clients who accepted your application
                </p>
            </div>

            {clients.length === 0 ? (
                <div className="bg-white border rounded-xl p-10 text-center">
                    <h2 className="text-lg font-medium">
                        No clients yet
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Once your applications are accepted,
                        clients will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">

                    {clients.map((client) => (
                        <div
                            key={client.application_id}
                            className="bg-white border rounded-xl p-5 shadow-sm"
                        >
                            <div className="flex justify-between">

                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {client.first_name} {client.last_name}
                                    </h2>

                                    <p className="text-gray-500 text-sm">
                                        {client.email}
                                    </p>

                                    <p className="text-sm mt-2">
                                        📍 {client.suburb}
                                    </p>

                                    <p className="text-sm">
                                        Funding: {client.funding_type}
                                    </p>

                                    <p className="text-sm mt-2">
                                        Service Needed:
                                        {" "}
                                        {client.title}
                                    </p>
                                </div>

                                <div>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                        Active Client
                                    </span>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}