"use client";

import { getMessages } from "@/actions";
import { MessagesContext } from "@/contexts";
import { useConversations, useSocket } from "@/hooks";
import { IMessageClient } from "@/models";
import { ReactNode, useEffect, useMemo, useState, useTransition } from "react";

type MessagesProviderProps = {
	children: ReactNode;
};

type MessagesRecord = Record<string, IMessageClient[]>;

export function MessagesProvider({ children }: MessagesProviderProps) {
	const { socket } = useSocket();
	const { currentConversation } = useConversations();

	const [messagesRecord, setMessagesRecord] = useState<MessagesRecord>({});
	const [isFetching, startTransition] = useTransition();

	const messages = useMemo<IMessageClient[]>(() => {
		if (!currentConversation) return [];

		return messagesRecord[currentConversation.id] ?? [];
	}, [currentConversation, messagesRecord]);

	// Fetch messages of current cunversation if needed
	useEffect(() => {
		if (!currentConversation) return;

		if (currentConversation.id in messagesRecord) return;

		startTransition(async () => {
			const fetchedMessages = await getMessages(currentConversation.id);

			setMessagesRecord((t) => ({
				...t,
				[currentConversation.id]: fetchedMessages,
			}));
		});
	}, [currentConversation, messagesRecord]);

	// Socket listener to add new message
	useEffect(() => {
		if (!currentConversation) return;

		const event = `${currentConversation.id}/chat:message:new`;

		if (!socket || socket.hasListeners(event)) return;

		socket.on(event, (v) =>
			setMessagesRecord((t) => {
				const newRecord = { ...t };

				newRecord[currentConversation.id].push(v);

				return newRecord;
			}),
		);
	}, [socket, currentConversation]);

	return (
		<MessagesContext.Provider
			value={{ messagesRecord, messages, setMessagesRecord, isFetching }}
		>
			{children}
		</MessagesContext.Provider>
	);
}
