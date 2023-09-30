import { useContext } from "react";
import { ChatContext } from "@/providers";

export function useChat() {
	const context = useContext(ChatContext);

	if (!context) {
		throw new Error(
			"Context not found: You are trying to access ConversationContext outside of its provider.",
		);
	}

	return context;
}
