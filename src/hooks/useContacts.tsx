import { ContactsContext } from "@/contexts";
import { useContext } from "react";

export function useContacts() {
	const context = useContext(ContactsContext);

	if (!context) {
		throw new Error(
			"Context not found: You are trying to access ContactsContext outside of its provider.",
		);
	}

	return context;
}
