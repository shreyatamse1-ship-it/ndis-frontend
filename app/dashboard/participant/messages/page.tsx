"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
    id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    created_at?: string;
};

type User = {
    id: number;
    name: string;
    role?: string;
};

export default function ParticipantMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [receiverId, setReceiverId] = useState<number | null>(null);
    const [text, setText] = useState("");
    const [userId, setUserId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const rawUser = localStorage.getItem("user");
        const role = localStorage.getItem("role");

        if (!rawUser || role !== "participant") {
            router.push("/login");
            return;
        }

        try {
            const parsed = JSON.parse(rawUser);
            if (!parsed?.id) {
                router.push("/login");
                return;
            }

            setUserId(parsed.id);
        } catch {
            router.push("/login");
        }
    }, [router]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://54.206.186.109/ndis-backend/controllers/getUsers.php");
                const data = await res.json();
                setUsers(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error loading users:", err);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (!receiverId || !userId) return;

        const fetchConversation = async () => {
            try {
                const res = await fetch(`http://54.206.186.109/ndis-backend/controllers/getMessages.php?sender_id=${userId}&receiver_id=${receiverId}`);
                const data = await res.json();
                setMessages(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error loading conversation:", err);
            }
        };

        fetchConversation();
        const interval = setInterval(fetchConversation, 2500);
        return () => clearInterval(interval);
    }, [receiverId, userId]);

    const sendMessage = async () => {
        if (!receiverId || !userId || !text.trim()) return;

        try {
            await fetch("http://54.206.186.109/ndis-backend/controllers/sendMessage.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender_id: userId,
                    receiver_id: receiverId,
                    message: text.trim(),
                }),
            });

            setText("");
            const res = await fetch(`http://54.206.186.109/ndis-backend/controllers/getMessages.php?sender_id=${userId}&receiver_id=${receiverId}`);
            const data = await res.json();
            setMessages(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    const selectedUser = users.find((user) => user.id === receiverId);

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-6">
            <div className="mx-auto max-w-350">
                <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                    <div className="mb-4 text-sm uppercase tracking-[0.24em] text-teal-600 font-semibold">Participant Messages</div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold text-slate-900">Messages</h1>
                            <p className="mt-2 max-w-2xl text-sm text-slate-500">Talk to support workers from a clean participant chat interface.</p>
                        </div>
                        <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-600 border border-slate-200">Conversations with your team</div>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 shadow-sm overflow-hidden">
                        <div className="border-b border-slate-200 bg-white px-6 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Conversations</div>
                        <div className="divide-y divide-slate-200">
                            {users.length === 0 ? (
                                <div className="p-5 text-sm text-slate-500">Loading available support workers…</div>
                            ) : (
                                users
                                    .filter((user) => user.id !== userId)
                                    .map((user) => (
                                        <button
                                            key={user.id}
                                            onClick={() => setReceiverId(user.id)}
                                            className={`w-full px-6 py-4 text-left transition ${receiverId === user.id ? "bg-white" : "hover:bg-slate-100"}`}
                                        >
                                            <div className="text-base font-medium text-slate-900">{user.name}</div>
                                            <div className="mt-1 text-sm text-slate-500">{user.role || "Support worker"}</div>
                                        </button>
                                    ))
                            )}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col min-h-162.5">
                        <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 text-lg font-semibold text-slate-900">
                            {selectedUser ? selectedUser.name : "Select a conversation"}
                        </div>

                        <div className="flex-1 overflow-y-auto bg-slate-100 px-6 py-6 space-y-4">
                            {!receiverId ? (
                                <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-slate-600 text-sm">
                                    Select a support worker to begin a conversation.
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-slate-600 text-sm">
                                    No messages yet. Send the first message to start the chat.
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender_id === userId ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`max-w-[75%] rounded-3xl px-5 py-4 text-sm leading-6 ${msg.sender_id === userId ? "bg-teal-600 text-white" : "bg-white text-slate-900 border border-slate-200"}`}>
                                            <div>{msg.message}</div>
                                            {msg.created_at && (
                                                <div className="mt-3 text-[11px] text-slate-400">{new Date(msg.created_at).toLocaleString()}</div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="border-t border-slate-200 bg-white px-6 py-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <input
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    disabled={!receiverId}
                                    className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
                                    placeholder={receiverId ? "Type your message..." : "Choose a conversation to start messaging"}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!receiverId || !text.trim()}
                                    className="inline-flex shrink-0 items-center justify-center rounded-3xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:bg-slate-300"
                                >
                                    Send message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
