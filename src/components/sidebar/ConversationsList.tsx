import { getConversations } from "@/actions";
import { ConversationItem } from "./ConversationItem";

export async function ConversationsList() {
	const conversations = await getConversations();

	return (
		<div>
			<h2>Conversations List</h2>

			<ul>
				{conversations.map((t, i) => (
					<li key={i}>
						<ConversationItem conversation={t} />
					</li>
				))}
			</ul>
		</div>
	);
}
