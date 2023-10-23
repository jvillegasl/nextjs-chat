"use client";

import { ReactNode, useState } from "react";
import { IConversationClient } from "@/models";
import { ConversationsContext } from "@/contexts";

type ConversationProviderProps = {
	children: ReactNode;
	conversations: IConversationClient[];
};

export function ConversationsProvider({
	children,
	conversations: _conversations,
}: ConversationProviderProps) {
	const [conversations, setConversations] =
		useState<IConversationClient[]>(_conversations);
	const [currentConversation, setCurrentConversation] =
		useState<IConversationClient>();

	return (
		<ConversationsContext.Provider
			value={{
				conversations,
				setConversations,
				currentConversation: currentConversation,
				setCurrentConversation: setCurrentConversation,
			}}
		>
			{children}
		</ConversationsContext.Provider>
	);
}
