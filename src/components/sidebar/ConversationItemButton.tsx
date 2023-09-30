"use client";

import { useConversation } from "@/hooks";
import { IConversationClient } from "@/models";

type ConversationItemButtonProps = {
	conversation: IConversationClient;
};

export function ConversationItemButton({
	conversation,
}: ConversationItemButtonProps) {
	const { setCurrentConversation } = useConversation();

	return (
		<button onClick={() => setCurrentConversation(conversation)}>
			Open Conversation
		</button>
	);
}
