"use client";

import { IConversationClient } from "@/models";
import { useContacts, useConversation, useWritingSocket } from "@/hooks";

type ConversationItemProps = {
	conversation: IConversationClient;
};

export function ConversationItem({ conversation }: ConversationItemProps) {
	const { setCurrentConversation } = useConversation();
	const { contacts } = useContacts();
	const { isWriting, userWriting } = useWritingSocket(conversation.id);

	const conversationName = contacts[conversation.contactId].username;

	return (
		<div>
			<h3>{conversationName}</h3>

			<pre>{JSON.stringify(conversation, null, 2)}</pre>

			{isWriting && (
				<p className="text-green-500">{userWriting} is Writing</p>
			)}

			<button onClick={() => setCurrentConversation(conversation)}>
				Open Conversation
			</button>
		</div>
	);
}
