"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib";
import { Conversation } from "@/models";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function getOrCreateConversation(contactId: string) {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Session not found");

	const userId = session.user.id;

	await dbConnect();

	const conversation = await Conversation.findOne({
		participants: { $size: 2, $all: [userId, contactId] },
	});

	if (conversation) return await conversation.toClient(userId);

	const newConversation = await Conversation.create({
		participants: [userId, contactId],
	});

	revalidatePath("/chat");

	return await newConversation.toClient(userId);
}
