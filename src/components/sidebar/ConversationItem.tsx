"use client";

import { IConversationClient } from "@/models";
import { useConversation, useWritingSocket } from "@/hooks";

type ConversationItemProps = {
	conversation: IConversationClient;
};

export function ConversationItem({ conversation }: ConversationItemProps) {
	const { setCurrentConversation } = useConversation();

	const { isWriting, userWriting } = useWritingSocket(conversation.id);

	return (
		<div>
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
