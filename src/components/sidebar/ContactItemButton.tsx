"use client";

import { getOrCreateConversation } from "@/actions";
import { useConversation } from "@/hooks";

type ContactItemButtonProps = {
	userId: string;
	contactId: string;
};

export function ContactItemButton({
	userId,
	contactId,
}: ContactItemButtonProps) {
	const { setCurrentConversationId } = useConversation();

	async function handleClick() {
		const conversation = await getOrCreateConversation(userId, contactId);

		console.log(conversation);

		setCurrentConversationId(conversation.id);
	}

	return <button onClick={handleClick}>Open/New Conversation</button>;
}
