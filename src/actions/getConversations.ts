"use server";

import { dbConnect } from "@/lib";
import { User } from "@/models";

export async function getConversations(userId: string) {
	await dbConnect();

	const user = (await User.findById(userId).populate("conversations"))!;

	const conversations = user.toClient().conversations;

	return conversations;
}
