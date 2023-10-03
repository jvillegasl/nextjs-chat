import { Dispatch, SetStateAction, createContext } from "react";
import { IConversationClient } from "@/models";

type ConversationContext = {
	currentConversation?: IConversationClient;
	setCurrentConversation: Dispatch<
		SetStateAction<IConversationClient | undefined>
	>;
};
export const ConversationContext = createContext<ConversationContext | null>(
	null,
);
