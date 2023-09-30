import { useContext } from "react";
import { ConversationContext } from "@/providers";

export function useConversation() {
	const context = useContext(ConversationContext);

	if (!context) {
		throw new Error(
			"Context not found: You are trying to access ConversationContext outside of its provider.",
		);
	}

	return context;
}
