"use client";

import { useContacts } from "@/hooks";
import { useState } from "react";
import { ContactItemButton } from "./ContactItemButton";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function ContactsSearchBar() {
	const [searchInput, setSearchInput] = useState<string>("");
	const { contacts } = useContacts();

	const contactsList = Object.keys(contacts).map((id) => contacts[id]);
	const filteredContacts = contactsList.filter((t) =>
		t.username.includes(searchInput),
	);

	return (
		<div>
			<div className="px-4 py-3">
				<OutlinedInput
					placeholder="Search for a chat or start a new one."
					size="small"
					fullWidth
					sx={{ fontSize: 14 }}
					inputProps={{ sx: { paddingY: 1 } }}
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					startAdornment={
						<InputAdornment position="start">
							{!searchInput ? (
								<SearchIcon />
							) : (
								<IconButton
									color="primary"
									tabIndex={-1}
									sx={{ px: 0 }}
									onClick={() => setSearchInput("")}
								>
									<ArrowBackIcon />
								</IconButton>
							)}
						</InputAdornment>
					}
				/>
			</div>

			{!!searchInput && (
				<ul>
					{filteredContacts.map((t, i) => (
						<li key={i}>
							<pre>{JSON.stringify(t, null, 2)}</pre>

							<ContactItemButton contactId={t.id} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
