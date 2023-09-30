"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from "react";
import { IConversationClient } from "@/models";

type ConversationContext = {
	currentConversation?: IConversationClient;
	setCurrentConversation: Dispatch<
		SetStateAction<IConversationClient | undefined>
	>;
};

type ConversationProviderProps = {
	children: ReactNode;
};

export const ConversationContext = createContext<ConversationContext | null>(
	null,
);

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
