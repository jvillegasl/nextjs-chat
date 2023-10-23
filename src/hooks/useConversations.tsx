import { useContext } from "react";
import { ConversationsContext } from "@/contexts";

export function useConversations() {
	const context = useContext(ConversationsContext);

	if (!context) {
		throw new Error(
			"Context not found: You are trying to access ConversationContext outside of its provider.",
		);
	}

	return context;
}
