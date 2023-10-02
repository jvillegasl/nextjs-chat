"use client";

import { useConversation } from "@/hooks";
import { FormEventHandler, useRef } from "react";

type ConversationInputProps = {};

export function ConversationInput({}: ConversationInputProps) {
	const { currentConversation } = useConversation();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit: FormEventHandler<HTMLFormElement> = function (e) {
		e.preventDefault();

		if (!currentConversation) return;

		const inputElement = inputRef.current;

		if (!inputElement) return;

		const message = inputElement.value;

		if (!message) return;

		inputElement.value = "";

		fetch("/api/socket/messages", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				message,
				conversationId: currentConversation.id,
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
