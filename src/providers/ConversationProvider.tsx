"use client";

import { ReactNode, useState } from "react";
import { IConversationClient } from "@/models";
import { ConversationContext } from "@/contexts";
import { useNewConversationSocket } from "@/hooks";

type ConversationProviderProps = {
	children: ReactNode;
};

export function ConversationProvider({ children }: ConversationProviderProps) {
	const [currentConversation, setCurrentConversation] =
		useState<IConversationClient>();

	useNewConversationSocket();

	return (
		<ConversationContext.Provider
			value={{
				currentConversation: currentConversation,
				setCurrentConversation: setCurrentConversation,
			}}
		>
			{children}
		</ConversationContext.Provider>
	);
}
