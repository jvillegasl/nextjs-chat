import { useEffect } from "react";
import { useConversations, useMessages, useSocket } from ".";
import { IMessageClient } from "@/models";

export function useNewMessageSocket(conversationId: string) {
	const { socket } = useSocket();
	const { messagesRecord, setMessagesRecord } = useMessages();
	const { conversations, setConversations } = useConversations();

	useEffect(() => {
		const event = `${conversationId}/chat:message:new`;

		if (!socket || socket.hasListeners(event)) return;

		socket.on(event, (newMessage: IMessageClient) => {
			if (conversationId in messagesRecord) {
				setMessagesRecord((t) => ({
					...t,
					[conversationId]: [...t[conversationId], newMessage],
				}));
			}

			const index = conversations.findIndex(
				(t) => t.id === conversationId,
			);

			if (!index) return;

			setConversations((prevState) =>
				prevState.map((t, i) => {
					if (i === index) {
						const lastMessage = {
							authorId: newMessage.authorId,
							content: newMessage.content,
							createdAt: newMessage.createdAt,
						};

						return { ...t, lastMessage };
					}

					return t;
				}),
			);
		});
	}, [
		socket,
		conversationId,
		conversations,
		messagesRecord,
		setMessagesRecord,
		setConversations,
	]);
}
