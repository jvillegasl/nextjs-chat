"use client";

import { ReactNode, useEffect, useState } from "react";
import { IConversationClient } from "@/models";
import { ConversationsContext } from "@/contexts";
import { useSocket } from "@/hooks";
import { useSession } from "next-auth/react";

type ConversationProviderProps = {
	children: ReactNode;
	conversations: IConversationClient[];
};

export function ConversationsProvider({
	children,
	conversations: _conversations,
}: ConversationProviderProps) {
	const { socket } = useSocket();
	const { data, status } = useSession();

	const [conversations, setConversations] =
		useState<IConversationClient[]>(_conversations);
	const [currentConversation, setCurrentConversation] =
		useState<IConversationClient>();

	useEffect(() => {
		if (!socket || status !== "authenticated") return;

		const event = `${data.user.id}/chat:conversation:new`;

		if (socket.hasListeners(event)) return;

		socket.on(event, (v) =>
			setConversations((t) => [...t, v.conversation]),
		);
	}, [socket, data, status, setConversations]);

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
