import { getConversations } from "@/actions";
import { ConversationItemButton } from "./ConversationItemButton";

export async function ConversationsList() {
	const conversations = await getConversations();

	return (
		<div>
			<h2>Conversations List</h2>

			<ul>
				{conversations.map((t, i) => (
					<li key={i}>
						<pre>{JSON.stringify(t, null, 2)}</pre>

						<ConversationItemButton conversation={t} />
					</li>
				))}
			</ul>
		</div>
	);
}
