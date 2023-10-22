import { useEffect, useMemo, useState } from "react";
import { IMessageClient } from "@/models";
import { getMessages } from "@/actions";
import { useConversation, useSocket } from ".";

type MessagesRecord = Record<string, IMessageClient[]>;

export function useMessages() {
	const { socket } = useSocket();
	const { currentConversation } = useConversation();

	const [messagesRecord, setMessagesRecord] = useState<MessagesRecord>({});
	const messages = useMemo<IMessageClient[]>(() => {
		if (!currentConversation) return [];

		return messagesRecord[currentConversation.id] ?? [];
	}, [currentConversation, messagesRecord]);

	useEffect(() => {
		if (!currentConversation) return;

		if (currentConversation.id in messagesRecord) return;

		getMessages(currentConversation.id).then((v) =>
			setMessagesRecord((t) => ({ ...t, [currentConversation.id]: v })),
		);
	}, [currentConversation, messagesRecord]);

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

	return { messages };
}
