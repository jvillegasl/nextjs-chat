import { Dispatch, SetStateAction, createContext } from "react";
import { IUserClient } from "@/models";

export type ContactsRecord = Prettify<Record<string, IUserClient>>;

type ContactsContext = {
	contacts: ContactsRecord;
	setContacts: Dispatch<SetStateAction<ContactsRecord>>;
};

export const ContactsContext = createContext<ContactsContext | null>(null);
