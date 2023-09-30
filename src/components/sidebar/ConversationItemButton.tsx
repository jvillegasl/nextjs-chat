"use client";

import { useConversation } from "@/hooks";

type ConversationItemButtonProps = {
	conversationId: string;
};

export function ConversationItemButton({
	conversationId,
}: ConversationItemButtonProps) {
	const { setCurrentConversationId } = useConversation();

	return (
		<button onClick={() => setCurrentConversationId(conversationId)}>
			Open Conversation
		</button>
	);
}
