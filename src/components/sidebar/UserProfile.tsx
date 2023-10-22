import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserProfileSettings } from "./UserProfileSettings";

export async function UserProfile() {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Session not found");

	return (
		<div className="flex h-16 items-center justify-between bg-sky-300 px-4">
			<Image
				className="rounded-full"
				src={session.user.picture}
				alt={`${session.user.username} picture`}
				width={40}
				height={40}
			/>

			<UserProfileSettings />
		</div>
	);
}
