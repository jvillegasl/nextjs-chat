"use client";

import { useChat } from "@/hooks";
import { FormEventHandler, useRef } from "react";

type ConversationInputProps = {};

export function ConversationInput({}: ConversationInputProps) {
	const { currentConversationId } = useChat();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit: FormEventHandler<HTMLFormElement> = function (e) {
		e.preventDefault();

		if (!currentConversationId) return;

		const inputElement = inputRef.current;

		if (!inputElement) return;

		const message = inputElement.value;
		inputElement.value = "";

		fetch("/api/socket/messages", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				message,
				conversationId: currentConversationId,
			}),
		}).then();
	};

	return (
		<form onSubmit={handleSubmit}>
			<input ref={inputRef} type="text" name="message" />

			<button type="submit">Submit</button>
		</form>
	);
}
