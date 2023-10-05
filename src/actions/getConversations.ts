"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib";
import { User } from "@/models";
import { getServerSession } from "next-auth";

export async function getConversations() {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Session not found");

	const userId = session.user.id;

	await dbConnect();

	const user = (await User.findById(userId).populate("conversations"))!;

	const conversations = user.conversations;

	const promises = conversations.map(async (t) => {
		return await t.toClient(userId);
	});

	return Promise.all(promises);
}
