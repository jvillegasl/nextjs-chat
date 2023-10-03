import { useEffect, useState } from "react";
import { IMessageClient } from "@/models";
import { getMessages } from "@/actions";
import { useConversation, useSocket } from ".";

export function useMessages() {
	const { socket } = useSocket();
	const { currentConversation } = useConversation();

	const [messages, setMessages] = useState<IMessageClient[]>([]);

	useEffect(() => {
		if (!currentConversation) return;

		getMessages(currentConversation.id).then((t) => setMessages(t));
	}, [currentConversation]);

	useEffect(() => {
		if (!currentConversation) return;

		const event = `${currentConversation.id}/chat:message:new`;

		if (!socket || socket.hasListeners(event)) return;

		socket.on(event, (v) => setMessages((t) => [...t, v]));
	}, [socket, currentConversation]);

	return { messages };
}
