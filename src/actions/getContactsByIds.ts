"use server";

import { dbConnect } from "@/lib";
import { User } from "@/models";

export async function getContactsByIds(ids: string[]) {
	await dbConnect();

	const contacts = await User.find({ _id: { $in: ids } });

	return contacts.map((t) => t.toClient());
}
