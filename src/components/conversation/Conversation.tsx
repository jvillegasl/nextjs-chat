"use client";

import { getMessages } from "@/actions/getMessages";
import { useConversation, useContacts, useSocket } from "@/hooks";
import { useEffect, useState } from "react";
import { ConversationInput } from "./ConversationInput";
import { IMessageClient } from "@/models";
import { useSession } from "next-auth/react";
import { getContactById } from "@/actions";

type ConversationProps = {};

export function Conversation({}: ConversationProps) {
	const { data: session } = useSession();

	const { socket } = useSocket();
	const { currentConversation } = useConversation();
	const [messages, setMessages] = useState<IMessageClient[]>([]);
	const { contacts, setContacts } = useContacts();

	useEffect(() => {
		if (!currentConversation || !session) return;

		if (currentConversation.contactId in contacts) return;

		getContactById(currentConversation.contactId).then((v) =>
			setContacts((t) => ({ ...t, [v.id]: v })),
		);
	}, [currentConversation, session, contacts, setContacts]);

	useEffect(() => {
		if (!currentConversation) return;

		getMessages(currentConversation.id).then((t) => setMessages(t));
	}, [currentConversation]);

	useEffect(() => {
		if (!currentConversation) return;

		const event = `${currentConversation}/chat:message:new`;

		if (!socket || socket.hasListeners(event)) return;

		socket.on(event, (v) => setMessages((t) => [...t, v]));
	}, [socket, currentConversation]);

	return (
		<div>
			<h1>Conversation</h1>

			{!!currentConversation && (
				<>
					<ConversationInput />

					<h3>Conversation ID: {currentConversation.id}</h3>

					<ul>
						{messages.map((t, i) => {
							if (t.authorId === session?.user.id) {
								return (
									<li key={i} className="text-blue-500">
										<span>{session.user.username}: </span>

										<span>{t.content}</span>
									</li>
								);
							}

							return (
								<li key={i} className="text-red-500">
									<span>
										{contacts[t.authorId]?.username}:
									</span>

									<span>{t.content}</span>
								</li>
							);
						})}
					</ul>
				</>
			)}
		</div>
	);
}
