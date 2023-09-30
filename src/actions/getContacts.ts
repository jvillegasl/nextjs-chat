"use server";

import { dbConnect } from "@/lib";
import { User } from "@/models";

export async function getContacts(userId: string) {
	await dbConnect();

	const contacts = await User.find({ _id: { $ne: userId } });
	return contacts.map((t) => t.toClient());
}
