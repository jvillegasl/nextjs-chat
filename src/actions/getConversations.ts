"use server";

import { dbConnect } from "@/lib";
import { User } from "@/models";

export async function getConversations(userId: string) {
	await dbConnect();

	const user = (await User.findById(userId).populate("conversations"))!;

	const conversations = user.conversations;

	return conversations.map((t) => t.toClient(userId));
}
