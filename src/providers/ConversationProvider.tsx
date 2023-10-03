"use client";

import { ReactNode, useState } from "react";
import { IConversationClient } from "@/models";
import { ConversationContext } from "@/contexts";

type ConversationProviderProps = {
	children: ReactNode;
};

export function ConversationProvider({ children }: ConversationProviderProps) {
	const [currentConversation, setCurrentConversation] =
		useState<IConversationClient>();

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
