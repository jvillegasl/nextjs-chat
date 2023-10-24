import { Dispatch, SetStateAction, createContext } from "react";
import { IUserClient } from "@/models";

export type ContactsRecord = Record<string, IUserClient>;

type ContactsContext = {
	contactsRecord: ContactsRecord;
	contacts: IUserClient[];
	setContactsRecord: Dispatch<SetStateAction<ContactsRecord>>;
};

export const ContactsContext = createContext<ContactsContext | null>(null);
