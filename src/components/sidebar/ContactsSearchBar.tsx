"use client";

import { useContacts } from "@/hooks";
import { useState } from "react";
import { ContactItemButton } from "./ContactItemButton";

export function ContactsSearchBar() {
	const [searchInput, setSearchInput] = useState<string>("");
	const { contacts } = useContacts();

	const contactsList = Object.keys(contacts).map((id) => contacts[id]);
	const filteredContacts = contactsList.filter((t) =>
		t.username.includes(searchInput),
	);

	return (
		<div>
			<h2>Contacts Search Bar</h2>

			<input
				type="text"
				placeholder="Search for a chat or start a new one."
				className="w-full"
				onChange={(e) => setSearchInput(e.target.value)}
			/>

			<ul>
				{!!searchInput &&
					filteredContacts.map((t, i) => (
						<li key={i}>
							<pre>{JSON.stringify(t, null, 2)}</pre>

							<ContactItemButton contactId={t.id} />
						</li>
					))}
			</ul>
		</div>
	);
}
