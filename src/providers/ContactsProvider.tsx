"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from "react";
import { IUserClient } from "@/models";

export type ContactsRecord = Prettify<Record<string, IUserClient>>;

type ContactsContext = {
	contacts: ContactsRecord;
	setContacts: Dispatch<SetStateAction<ContactsRecord>>;
};

type ContactsProviderProps = {
	children: ReactNode;
	contacts?: ContactsRecord;
};

export const ContactsContext = createContext<ContactsContext | null>(null);

export function ContactsProvider({
	children,
	contacts = {},
}: ContactsProviderProps) {
	const [contactsState, setContactsState] =
		useState<ContactsRecord>(contacts);

	return (
		<ContactsContext.Provider
			value={{ contacts: contactsState, setContacts: setContactsState }}
		>
			{children}
		</ContactsContext.Provider>
	);
}
