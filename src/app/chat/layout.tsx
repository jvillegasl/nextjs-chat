import {
	ConversationsProvider,
	ContactsProvider,
	SocketProvider,
} from "@/providers";
import { PropsWithChildren } from "react";
import { getContacts, getConversations } from "@/actions";
import { ContactsRecord } from "@/contexts";
import { KeyBindingsWrapper } from "@/components";

export default async function ChatLayout({ children }: PropsWithChildren) {
	const conversations = await getConversations()
	
	const contacts = await getContacts();
	const contactsRecord: ContactsRecord = contacts.reduce(
		(acc, t) => ({ ...acc, [t.id]: t }),
		{},
	);

	return (
		<SocketProvider>
			<ConversationsProvider conversations={conversations}>
				<ContactsProvider contacts={contactsRecord}>
					<KeyBindingsWrapper>{children}</KeyBindingsWrapper>
				</ContactsProvider>
			</ConversationsProvider>
		</SocketProvider>
	);
}
