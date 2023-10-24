"use client";

import { useEffect, ReactNode, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useConversations } from "@/hooks";
import { getContactById } from "@/actions";
import { ContactsContext, ContactsRecord } from "@/contexts";

type ContactsProviderProps = {
	children: ReactNode;
	contactsRecord?: ContactsRecord;
};

export function ContactsProvider({
	children,
	contactsRecord: _contactsRecord = {},
}: ContactsProviderProps) {
	const { data: session } = useSession();
	const { currentConversation } = useConversations();

	const [contactsRecord, setContactsRecord] =
		useState<ContactsRecord>(_contactsRecord);
	const contacts = useMemo(
		() => Object.keys(contactsRecord).map((id) => contactsRecord[id]),
		[contactsRecord],
	);

	useEffect(() => {
		if (!currentConversation || !session) return;

		if (currentConversation.contactId in contactsRecord) return;

		getContactById(currentConversation.contactId).then((v) =>
			setContactsRecord((t) => ({ ...t, [v.id]: v })),
		);
	}, [currentConversation, session, contactsRecord, setContactsRecord]);

	return (
		<ContactsContext.Provider
			value={{ contactsRecord, contacts, setContactsRecord }}
		>
			{children}
		</ContactsContext.Provider>
	);
}
