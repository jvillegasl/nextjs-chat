import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib";
import { Sidebar } from "@/components/sidebar";
import { Conversation } from "@/components/conversation";
import { UnauthenticatedWrapper } from "@/components";

export default async function ChatPage() {
	await dbConnect();

	const session = await getServerSession(authOptions);

	if (!session) throw new Error("User Not Found");

	return (
		<UnauthenticatedWrapper>
			<main className="relative h-[100vh] bg-slate-200">
				<div className="absolute left-0 right-0 top-0 h-32 bg-sky-400"></div>
				<div className="absolute inset-0 mx-auto grid max-w-[1600px] grid-cols-12 bg-white shadow-xl xl:inset-4">
					<Sidebar className="col-span-4" />
					<Conversation className="col-span-8" user={session.user} />
				</div>
			</main>
		</UnauthenticatedWrapper>
	);
}
