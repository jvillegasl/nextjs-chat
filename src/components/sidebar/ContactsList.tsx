import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib";
import { User } from "@/models";
import { getServerSession } from "next-auth";
import { ContactItemButton } from "./ContactItemButton";

export async function ContactsList() {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Session not found");

	await dbConnect();

	const data = await User.find({ _id: { $ne: session.user.id } });
	const contacts = data.map((t) => t.toClient());

	return (
		<div>
			<h2>Contacts List</h2>

			<ul>
				{contacts.map((t, i) => (
					<li key={i}>
						<pre>{JSON.stringify(t, null, 2)}</pre>

						<ContactItemButton
							userId={session.user.id}
							contactId={t.id}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
