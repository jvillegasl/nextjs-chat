"use client";

import { SidebarContext } from "@/contexts";
import { useContacts } from "@/hooks";
import { IUserClient } from "@/models";
import { PropsWithChildren, useMemo, useState } from "react";

export function SidebarProvider({ children }: PropsWithChildren) {
	const { contacts } = useContacts();

	const [searchInput, setSearchInput] = useState<string>("");

	const isSearching = !!searchInput;
	const searchResults = useMemo<IUserClient[]>(
		() => contacts.filter((t) => t.username.includes(searchInput)),
		[contacts, searchInput],
	);

	return (
		<SidebarContext.Provider
			value={{ searchInput, setSearchInput, isSearching, searchResults }}
		>
			{children}
		</SidebarContext.Provider>
	);
}
