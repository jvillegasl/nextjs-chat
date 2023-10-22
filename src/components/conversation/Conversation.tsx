"use client";

import { clsx } from "clsx";
import { useConversation, useContacts, useMessages } from "@/hooks";
import { ConversationInputBar } from "./ConversationInputBar";
import { ConversationHeader } from "./ConversationHeader";
import { ConversationBody } from "./ConversationBody";
import { IUserClient } from "@/models";

type ConversationProps = { className?: string; user: IUserClient };

export function Conversation({ className, user }: ConversationProps) {
	const { currentConversation } = useConversation();
	const { contacts } = useContacts();
	const { messages, isFetching } = useMessages();

	return (
		<div className={clsx(className, "flex flex-col")}>
			{!!currentConversation && (
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
