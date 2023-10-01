"use client";

import { getOrCreateConversation } from "@/actions";
import { useConversation } from "@/hooks";

type ContactItemButtonProps = {
	contactId: string;
};

export function ContactItemButton({ contactId }: ContactItemButtonProps) {
	const { setCurrentConversation } = useConversation();

	async function handleClick() {
		const conversation = await getOrCreateConversation(contactId);

		setCurrentConversation(conversation);
	}

	return <button onClick={handleClick}>Open/New Conversation</button>;
}
