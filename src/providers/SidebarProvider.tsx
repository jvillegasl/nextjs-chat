"use client";

import { SidebarContext } from "@/contexts";
import { useContacts } from "@/hooks";
import { IUserClient } from "@/models";
import { PropsWithChildren, useMemo, useState } from "react";

export function SidebarProvider({ children }: PropsWithChildren) {
	const { contacts } = useContacts();
	const contactsList = useMemo(
		() => Object.keys(contacts).map((id) => contacts[id]),
		[contacts],
	);

	const [searchInput, setSearchInput] = useState<string>("");
	const searchResults = useMemo<IUserClient[]>(
		() => contactsList.filter((t) => t.username.includes(searchInput)),
		[contactsList, searchInput],
	);
	const isSearching = !!searchInput;

	return (
		<SidebarContext.Provider
			value={{ searchInput, setSearchInput, isSearching, searchResults }}
		>
			{children}
		</SidebarContext.Provider>
	);
}
