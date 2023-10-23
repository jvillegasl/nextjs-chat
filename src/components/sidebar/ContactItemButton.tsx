"use client";

import { getOrCreateConversation } from "@/actions";
import { useConversation, useSocket } from "@/hooks";

type ContactItemButtonProps = {
	contactId: string;
};

export function ContactItemButton({ contactId }: ContactItemButtonProps) {
	const { socket } = useSocket();
	const { setCurrentConversation } = useConversation();

	async function handleClick() {
		const conversation = await getOrCreateConversation(contactId);

		setCurrentConversation(conversation);

		socket?.emit("chat:conversation:new", { contactId, conversation });
	}

	return <button onClick={handleClick}>Open/New Conversation</button>;
}
