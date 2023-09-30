"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from "react";

type ChatContext = {
	currentConversationId?: string;
	setCurrentConversationId: Dispatch<SetStateAction<string | undefined>>;
};

type ChatProviderProps = {
	children: ReactNode;
};

export const ChatContext = createContext<ChatContext | null>(null);

export function ChatProvider({ children }: ChatProviderProps) {
	const [currentConversationId, setCurrentConversationId] =
		useState<string>();

	return (
		<ChatContext.Provider
			value={{ currentConversationId, setCurrentConversationId }}
		>
			{children}
		</ChatContext.Provider>
	);
}
