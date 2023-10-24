"use client";

import { useSidebar } from "@/hooks";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function ContactsSearchBar() {
	const { searchInput, setSearchInput } = useSidebar();

	return (
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
	);
}
