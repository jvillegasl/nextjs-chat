"use client";

import {
	Box,
	ClickAwayListener,
	Fade,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Popper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRef, useState } from "react";
import { signOut } from "next-auth/react";

export function UserProfileSettings() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const handleClick = function () {
		setIsOpen((t) => !t);
	};

	function handleClickAway() {
		setIsOpen(false);
	}

	return (
		<>
			<IconButton
				aria-label="settings"
				onClick={handleClick}
				ref={anchorRef}
			>
				<MoreVertIcon />
			</IconButton>

			<ClickAwayListener
				onClickAway={handleClickAway}
				mouseEvent={isOpen ? "onClick" : "onMouseDown"}
			>
				<Popper
					open={isOpen}
					anchorEl={anchorRef.current}
					placement="bottom-end"
					transition
				>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={250}>
							<Box
								sx={{
									boxShadow: 3,
								}}
							>
								<List sx={{ bgcolor: "background.paper" }}>
									<ListItem disablePadding>
										<ListItemButton
											component="button"
											onClick={() => signOut()}
										>
											<ListItemText primary="Log out" />
										</ListItemButton>
									</ListItem>
								</List>
							</Box>
						</Fade>
					)}
				</Popper>
			</ClickAwayListener>
		</>
	);
}
