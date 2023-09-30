"use client";

import { getMessages } from "@/actions/getMessages";
import { useChat, useSocket } from "@/hooks";
import { useEffect, useState } from "react";
import { ConversationInput } from "./ConversationInput";
import { IMessageClient } from "@/models";

type ConversationProps = {};

export function Conversation({}: ConversationProps) {
	const { socket } = useSocket();
	const { currentConversationId } = useChat();
	const [messages, setMessages] = useState<IMessageClient[]>([]);

	useEffect(() => {
		if (!currentConversationId) return;

		getMessages(currentConversationId).then((t) => setMessages(t));
	}, [currentConversationId]);

	useEffect(() => {
		if (!currentConversationId) return;

		const event = `${currentConversationId}/chat:message:new`;

		if (!socket || socket.hasListeners(event)) return;

		socket.on(event, (v) => setMessages((t) => [...t, v]));
	}, [socket, currentConversationId]);

	return (
		<div>
			<h1>Conversation</h1>

			{!!currentConversationId && (
				<>
					<ConversationInput />

					<h3>Conversation ID: {currentConversationId}</h3>

					<pre>{JSON.stringify(messages, null, 2)}</pre>
				</>
			)}
		</div>
	);
}
