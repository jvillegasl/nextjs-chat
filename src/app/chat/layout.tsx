import {
	ConversationProvider,
	ContactsProvider,
	SocketProvider,
} from "@/providers";
import { PropsWithChildren } from "react";
import { getContacts } from "@/actions";
import { ContactsRecord } from "@/contexts";

export default async function ChatLayout({ children }: PropsWithChildren) {
	const contacts = await getContacts();
	const contactsRecord: ContactsRecord = contacts.reduce(
		(acc, t) => ({ ...acc, [t.id]: t }),
		{},
	);

	return (
		<SocketProvider>
			<ConversationProvider>
				<ContactsProvider contacts={contactsRecord}>
					{children}
				</ContactsProvider>
			</ConversationProvider>
		</SocketProvider>
	);
}
