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
	const { setCurrentConversation } = useConversation();

	async function handleClick() {
		const conversation = await getOrCreateConversation(userId, contactId);

		setCurrentConversation(conversation);
	}

	return <button onClick={handleClick}>Open/New Conversation</button>;
}
