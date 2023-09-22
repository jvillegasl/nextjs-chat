"use client";

import { getConversations } from "@/actions";
import { useConversation } from "@/hooks";
import { IConversationClient } from "@/models";
import { ChangeEventHandler, useEffect, useState } from "react";

type ConversationsListProps = {
	userId: string;
};

export function ConversationsList({ userId }: ConversationsListProps) {
	const { setCurrentConversationId } = useConversation();
	const [conversations, setConversations] = useState<IConversationClient[]>(
		[],
	);

	function handleClick(id: string) {
		setCurrentConversationId(!id ? undefined : id);
	}

	useEffect(() => {
		getConversations(userId).then((t) => setConversations(t));
	}, [userId, setConversations]);

	return (
		<div>
			<h2>Conversations List</h2>

			<p>{userId}</p>

			<pre>{JSON.stringify(conversations, null, 2)}</pre>

			{conversations.map((t, i) => (
				<button key={i} onClick={() => handleClick(t.id)}>
					{t.id}
				</button>
			))}
		</div>
	);
}
