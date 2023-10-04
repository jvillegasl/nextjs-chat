"use client";

import { FormEventHandler } from "react";
import { useWriteMessage } from "@/hooks";

type ConversationInputBarProps = {
	conversationId: string;
};

export function ConversationInputBar({ conversationId }: ConversationInputBarProps) {
	const { message, setMessage, handleChange } =
		useWriteMessage(conversationId);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async function (e) {
		e.preventDefault();

		if (!message) return;

		setMessage("");

		await fetch("/api/socket/messages", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				message,
				conversationId,
			}),
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="message"
				value={message}
				onChange={handleChange}
			/>

			<button type="submit">Submit</button>
		</form>
	);
}
