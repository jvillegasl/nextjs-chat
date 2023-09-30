import { getConversations } from "@/actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ConversationItemButton } from "./ConversationItemButton";

export async function ConversationsList() {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Session not found");

	const conversations = await getConversations(session.user.id);

	return (
		<div>
			<h2>Conversations List</h2>

			<ul>
				{conversations.map((t, i) => (
					<li key={i}>
						<pre>{JSON.stringify(t, null, 2)}</pre>

						<ConversationItemButton conversationId={t.id} />
					</li>
				))}
			</ul>
		</div>
	);
}
