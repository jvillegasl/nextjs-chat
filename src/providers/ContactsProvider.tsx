"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from "react";
import { IUserClient } from "@/models";

type ContactsRecord = Partial<Record<string, IUserClient>>;

type ContactsContext = {
	contacts: ContactsRecord;
	setContacts: Dispatch<SetStateAction<ContactsRecord>>;
};

type ContactsProviderProps = {
	children: ReactNode;
};

export const ContactsContext = createContext<ContactsContext | null>(null);

export function ContactsProvider({ children }: ContactsProviderProps) {
	const [contacts, setContacts] = useState<ContactsRecord>({});

	return (
		<ContactsContext.Provider value={{ contacts, setContacts }}>
			{children}
		</ContactsContext.Provider>
	);
}
