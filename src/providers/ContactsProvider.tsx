"use client";

import { useEffect, ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import { useConversation } from "@/hooks";
import { getContactById } from "@/actions";
import { ContactsContext, ContactsRecord } from "@/contexts";

type ContactsProviderProps = {
	children: ReactNode;
	contacts?: ContactsRecord;
};

export function ContactsProvider({
	children,
	contacts = {},
}: ContactsProviderProps) {
	const { data: session } = useSession();
	const { currentConversation } = useConversation();

	const [contactsState, setContactsState] =
		useState<ContactsRecord>(contacts);

	useEffect(() => {
		if (!currentConversation || !session) return;

		if (currentConversation.contactId in contactsState) return;

		getContactById(currentConversation.contactId).then((v) =>
			setContactsState((t) => ({ ...t, [v.id]: v })),
		);
	}, [currentConversation, session, contactsState, setContactsState]);

	return (
		<ContactsContext.Provider
			value={{ contacts: contactsState, setContacts: setContactsState }}
		>
			{children}
		</ContactsContext.Provider>
	);
}
