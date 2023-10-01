import {
	ConversationProvider,
	ContactsProvider,
	SocketProvider,
	ContactsRecord,
} from "@/providers";
import { PropsWithChildren } from "react";
import { getContacts } from "@/actions";

export default async function ChatLayout({ children }: PropsWithChildren) {
	const contacts = await getContacts();
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
