"use client";

import { FormEventHandler } from "react";
import { useWriteMessage } from "@/hooks";
import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type ConversationInputBarProps = {
	conversationId: string;
};

export function ConversationInputBar({
	conversationId,
}: ConversationInputBarProps) {
	const { message, setMessage, handleChange } =
		useWriteMessage(conversationId);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async function (e) {
		e.preventDefault();

		if (!message) return;

		setMessage("");

		await fetch("/api/socket/messages", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				message,
				conversationId,
			}),
		});
	};

	return (
		<div className="h-16 px-4 py-3">
			<form
				className="flex flex-row items-center"
				onSubmit={handleSubmit}
			>
				<TextField
					className="flex-grow"
					placeholder="Write a message"
					autoComplete="off"
					inputProps={{ sx: { paddingX: 1.5, paddingY: 1 } }}
					value={message}
					onChange={handleChange}
				/>

				{!!message && (
					<IconButton type="submit">
						<SendIcon />
					</IconButton>
				)}
			</form>
		</div>
	);
}
