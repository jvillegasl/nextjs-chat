"use client";

import { useConversations, useNewConversationSocket } from "@/hooks";
import { ConversationItem } from "./ConversationItem";
import { useMemo } from "react";

export function ConversationsList() {
	const { conversations } = useConversations();

	useNewConversationSocket();

	const orderedConversations = useMemo(
		() =>
			[...conversations].sort((a, b) => {
				const date1 = a.lastMessage?.createdAt ?? "";
				const date2 = b.lastMessage?.createdAt ?? "";

				return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
			}),

		[conversations],
	);

	return (
		<div>
			<ul>
				{orderedConversations.map((t, i) => (
					<li key={i}>
						<ConversationItem conversation={t} />
					</li>
				))}
			</ul>
		</div>
	);
}
