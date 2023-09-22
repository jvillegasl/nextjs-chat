import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ConversationsList } from "./ConversationsList";

type SidebarProps = {};

export async function Sidebar({}: SidebarProps) {
	const session = await getServerSession(authOptions);

	if (!session) return <h1>Session Not Found</h1>;

	return (
		<div>
			<h1>Sidebar</h1>

			<pre>{JSON.stringify(session, null, 2)}</pre>

			<ConversationsList userId={session.user.id} />
		</div>
	);
}
