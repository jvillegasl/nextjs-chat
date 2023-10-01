"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib";
import { Conversation, IUserDocument } from "@/models";
import { getServerSession } from "next-auth";

export async function getConversationContacts(conversationId: string) {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Session not found");

	const userId = session.user.id;

	await dbConnect();

	const conversation = (await Conversation.findById(conversationId).populate<{
		participants: IUserDocument[];
	}>("participants"))!;

	const participants = conversation.participants.filter(
		(t) => t.id !== userId,
	);

	return participants.map((t) => t.toClient());
}
