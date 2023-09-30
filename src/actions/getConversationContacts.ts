"use server";

import { dbConnect } from "@/lib";
import { Conversation, IUserDocument } from "@/models";

export async function getConversationContacts(
	userId: string,
	conversationId: string,
) {
	await dbConnect();

	const conversation = (await Conversation.findById(conversationId).populate<{
		participants: IUserDocument[];
	}>("participants"))!;

	const participants = conversation.participants.filter(
		(t) => t.id !== userId,
	);

	return participants.map((t) => t.toClient());
}
