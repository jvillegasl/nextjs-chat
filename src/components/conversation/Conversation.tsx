"use client";

import { clsx } from "clsx";
import { IUserClient } from "@/models";
import { useConversations, useContacts, useMessages } from "@/hooks";
import { ConversationInputBar } from "./ConversationInputBar";
import { ConversationHeader } from "./ConversationHeader";
import { ConversationBody } from "./ConversationBody";
import { ConversationCover } from "./ConversationCover";

type ConversationProps = { className?: string; user: IUserClient };

export function Conversation({ className, user }: ConversationProps) {
	const { currentConversation } = useConversations();
	const { contacts } = useContacts();
	const { messages, isFetching } = useMessages();

	return (
		<div
			className={clsx(
				className,
				"flex flex-col border-0 border-l border-solid border-l-sky-200",
			)}
		>
			{!currentConversation ? (
				<ConversationCover />
			) : (
				<>
					<ConversationHeader conversation={currentConversation} />
					<ConversationBody
						conversationId={currentConversation.id}
						contacts={contacts}
						messages={messages}
						user={user}
						isFetching={isFetching}
					/>
					<ConversationInputBar
						conversationId={currentConversation.id}
					/>
				</>
			)}
		</div>
	);
}
