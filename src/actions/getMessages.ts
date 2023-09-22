"use server";

import { dbConnect } from "@/lib";
import { Conversation } from "@/models";

export async function getMessages(conversationId: string) {
	await dbConnect();

	const conversation =
		(await Conversation.findById(conversationId).populate("messages"))!;

	const messages = conversation.messages.map((t) => t.toClient());

	return messages;
}
