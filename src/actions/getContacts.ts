"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib";
import { User } from "@/models";
import { getServerSession } from "next-auth";

export async function getContacts() {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Session not found");

	const userId = session.user.id;

	await dbConnect();

	const contacts = await User.find({ _id: { $ne: userId } });
	return contacts.map((t) => t.toClient());
}
