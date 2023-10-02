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

		const event = `${currentConversation.id}/chat:message:new`;

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
							const createdAt = new Date(t.createdAt);
							const username =
								t.authorId === session?.user.id
									? session.user.username
									: contacts[t.authorId]?.username;
							const classname =
								t.authorId === session?.user.id
									? "text-blue-500"
									: "text-red-500";

							return (
								<li key={i} className={classname}>
									<div className="flex">
										<span>{username}:</span>

										<span>{t.content}</span>

										<span className="ml-auto">
											{createdAt.getHours()}:
											{createdAt
												.getMinutes()
												.toLocaleString("en-US", {
													minimumIntegerDigits: 2,
												})}
										</span>
									</div>
								</li>
							);
						})}
					</ul>
				</>
			)}
		</div>
	);
}
