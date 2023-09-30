import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function UserProfile() {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Session not found");

	return (
		<div>
			<h2>User Profile</h2>

			<pre>{JSON.stringify(session.user, null, 2)}</pre>
		</div>
	);
}
