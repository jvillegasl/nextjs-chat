import { useContext } from "react";
import { MessagesContext } from "@/contexts";

export function useMessages() {
	const context = useContext(MessagesContext);

	if (!context)
		throw new Error(
			"Context not found: You are trying to access MessagesContext outside of its provider.",
		);

	return context;
}
