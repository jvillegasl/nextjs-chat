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
			setMessagesRecord((prevState) => {
				if (newMessage.conversationId in prevState) {
					return {
						...prevState,
						[conversationId]: [
							...prevState[conversationId],
							newMessage,
						],
					};
				}

				return prevState;
			});

			setConversations((prevState) =>
				prevState.map((t) => {
					if (t.id === newMessage.conversationId) {
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
