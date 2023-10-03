"use client";

import { useSession } from "next-auth/react";
import { useConversation, useContacts, useMessages } from "@/hooks";
import { ConversationInput } from "./ConversationInput";

type ConversationProps = {};

export function Conversation({}: ConversationProps) {
	const { data: session } = useSession();

	const { currentConversation } = useConversation();
	const { contacts } = useContacts();
	const { messages } = useMessages();

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
