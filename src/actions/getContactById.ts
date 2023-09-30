"use server";

import { dbConnect } from "@/lib";
import { User } from "@/models";

export async function getContactById(id: string) {
	await dbConnect();

	const contact = (await User.findById(id))!;

	return contact.toClient();
}
