import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib";
import { Sidebar } from "@/components/sidebar";
import { Conversation } from "@/components/conversation";
import { ConversationProvider } from "@/providers";

export default async function ChatPage() {
	await dbConnect();

	const session = await getServerSession(authOptions);

	if (!session) return <h1>User not found</h1>;

	return (
		<ConversationProvider>
			<main>
				<h1>Chat</h1>
				<div className="grid grid-cols-2">
					<Sidebar />
					<Conversation />
				</div>
			</main>
		</ConversationProvider>
	);
}
