import {
	ConversationProvider,
	ContactsProvider,
	SocketProvider,
	ContactsRecord,
} from "@/providers";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getContacts } from "@/actions";

export default async function ChatLayout({ children }: PropsWithChildren) {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Session not found");

	const contacts = await getContacts(session.user.id);
	const contactsRecord: ContactsRecord = contacts.reduce(
		(acc, t) => ({ ...acc, [t.id]: t }),
		{},
	);

	return (
		<ContactsProvider contacts={contactsRecord}>
			<ConversationProvider>
				<SocketProvider>{children}</SocketProvider>
			</ConversationProvider>
		</ContactsProvider>
	);
}
