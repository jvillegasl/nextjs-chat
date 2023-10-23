"use client";

import { getOrCreateConversation } from "@/actions";
import { useConversations, useSocket } from "@/hooks";

type ContactItemButtonProps = {
	contactId: string;
};

export function ContactItemButton({ contactId }: ContactItemButtonProps) {
	const { socket } = useSocket();
	const { setCurrentConversation } = useConversations();

	async function handleClick() {
		const conversation = await getOrCreateConversation(contactId);

		setCurrentConversation(conversation);

		socket?.emit("chat:conversation:new", {
			contactId,
			conversationId: conversation.id,
		});
	}

	return <button onClick={handleClick}>Open/New Conversation</button>;
}
