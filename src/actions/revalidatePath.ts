"use server";

import { revalidatePath as _revalidatePath } from "next/cache";

export async function revalidatePath(path: string) {
	return _revalidatePath(path);
}
