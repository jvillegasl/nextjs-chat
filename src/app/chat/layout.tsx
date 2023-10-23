import {
	ConversationProvider,
	ContactsProvider,
	SocketProvider,
} from "@/providers";
import { PropsWithChildren } from "react";
import { getContacts } from "@/actions";
import { ContactsRecord } from "@/contexts";
import { KeyBindingsWrapper } from "@/components";

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
					<KeyBindingsWrapper>{children}</KeyBindingsWrapper>
				</ContactsProvider>
			</ConversationProvider>
		</SocketProvider>
	);
}
