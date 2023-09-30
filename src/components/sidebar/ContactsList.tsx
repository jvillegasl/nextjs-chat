import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ContactItemButton } from "./ContactItemButton";
import { getContacts } from "@/actions";

export async function ContactsList() {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Session not found");

	const contacts = await getContacts(session.user.id);

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
