import { getConversations } from "@/actions";
import { ConversationItem } from "./ConversationItem";

export async function ConversationsList() {
	const conversations = await getConversations();

	const orderedConversations = conversations.sort((a, b) => {
		const date1 = a.lastMessage?.createdAt ?? "";
		const date2 = b.lastMessage?.createdAt ?? "";

		return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
	});

	return (
		<div>
			<h2>Conversations List</h2>

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
