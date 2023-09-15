"use client";

import { useSocket } from "@/hooks";
import {
	FormEvent,
	FormEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";

export default function Home() {
	const { socket } = useSocket();
	const [messages, setMessages] = useState<string[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!socket) return;

		socket.on("chat:global", (t) => setMessages((prev) => [...prev, t]));
	}, [socket]);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!inputRef.current || !socket) return;

		const message = inputRef.current.value;

		await fetch("/api/socket/messages", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message }),
		});
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ul>
				{messages.map((message, i) => (
					<li key={i}>{message}</li>
				))}
			</ul>

			<form onSubmit={handleSubmit}>
				<input
					className="text-black"
					type="text"
					name="message"
					ref={inputRef}
				/>
				<button>Submit</button>
			</form>
		</main>
	);
}
