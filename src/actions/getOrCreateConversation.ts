"use server";

import { Conversation } from "@/models";
import { revalidatePath } from "next/cache";

export async function getOrCreateConversation(
	userId: string,
	contactId: string,
) {
	const conversation = await Conversation.findOne({
		participants: { $size: 2, $all: [userId, contactId] },
	});

	if (conversation) return conversation.toClient(userId);

	const newConversation = await Conversation.create({
		participants: [userId, contactId],
	});

	revalidatePath("/chat");

	return newConversation.toClient(userId);
}
