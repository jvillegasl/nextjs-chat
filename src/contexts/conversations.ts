import { Dispatch, SetStateAction, createContext } from "react";
import { IConversationClient } from "@/models";

type ConversationsContext = {
	conversations: IConversationClient[];
	setConversations: Dispatch<SetStateAction<IConversationClient[]>>;
	currentConversation?: IConversationClient;
	setCurrentConversation: Dispatch<
		SetStateAction<IConversationClient | undefined>
	>;
};
export const ConversationsContext = createContext<ConversationsContext | null>(
	null,
);
