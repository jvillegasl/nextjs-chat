"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from "react";

type ConversationContext = {
	currentConversationId?: string;
	setCurrentConversationId: Dispatch<SetStateAction<string | undefined>>;
};

type ConversationProviderProps = {
	children: ReactNode;
};

export const ConversationContext = createContext<ConversationContext | null>(
	null,
);

export function ConversationProvider({ children }: ConversationProviderProps) {
	const [currentConversationId, setCurrentConversationId] =
		useState<string>();

	return (
		<ConversationContext.Provider
			value={{ currentConversationId, setCurrentConversationId }}
		>
			{children}
		</ConversationContext.Provider>
	);
}
