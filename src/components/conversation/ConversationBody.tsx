import BG from "@/assets/bg.png";
import { IMessageClient, IUserClient } from "@/models";
import { getMessageHour } from "@/utils";
import { Message } from "./Message";
import { useEffect, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";

type ConversationBodyProps = {
	conversationId: string;
	messages: IMessageClient[];
	user: IUserClient;
	contacts: Record<string, IUserClient>;
	isFetching: boolean;
	scrollToBottom: (el: HTMLDivElement) => void;
};

export function ConversationBody({
	conversationId,
	messages,
	user,
	isFetching,
	scrollToBottom,
}: ConversationBodyProps) {
	const bodyRef = useRef<HTMLDivElement>(null);
	const lastSeenMessageRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (!bodyRef) return;

		const bodyElement = bodyRef.current;

		if (!bodyElement) return;

		scrollToBottom(bodyElement);
	}, [scrollToBottom]);

	useEffect(() => {
		if (isFetching) return;

		if (!lastSeenMessageRef) return;

		const lastSeenMessageElement = lastSeenMessageRef.current;

		if (!lastSeenMessageElement) return;

		lastSeenMessageElement.scrollIntoView(false);
	}, [isFetching, conversationId]);

	return (
		<div
			ref={bodyRef}
			className="flex h-0 flex-grow flex-col overflow-y-auto bg-slate-300"
			style={{ backgroundImage: `url(${BG.src})` }}
		>
			{isFetching ? (
				<Box
					sx={{
						display: "flex",
						flexGrow: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CircularProgress size={64} />
				</Box>
			) : (
				<>
					<div className="h-10"></div>
					<ul>
						{messages.map((t, i) => {
							const hour = getMessageHour(t.createdAt);
							const liProps =
								i === messages.length - 1
									? { ref: lastSeenMessageRef }
									: {};
							return (
								<li key={i} className="px-4 pb-1" {...liProps}>
									<Message
										content={t.content}
										hour={hour}
										alignEnd={t.authorId === user.id}
									/>
								</li>
							);
						})}
					</ul>
				</>
			)}
		</div>
	);
}
