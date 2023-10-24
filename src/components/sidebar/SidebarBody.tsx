"use client";

import { useSidebar } from "@/hooks";
import { ConversationsList } from "./ConversationsList";
import { ContactsSearchResults } from "./ContactsSearchResults";

export function SidebarBody() {
	const { isSearching, searchResults } = useSidebar();

	if (isSearching) {
		return <ContactsSearchResults searchResults={searchResults} />;
	}

	return <ConversationsList />;
}
