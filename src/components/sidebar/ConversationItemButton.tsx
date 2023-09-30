"use client";

import { useChat } from "@/hooks";

type ConversationItemButtonProps = {
	conversationId: string;
};

export function ConversationItemButton({
	conversationId,
}: ConversationItemButtonProps) {
	const { setCurrentConversationId } = useChat();

	return (
		<button onClick={() => setCurrentConversationId(conversationId)}>
			Open Conversation
		</button>
	);
}
