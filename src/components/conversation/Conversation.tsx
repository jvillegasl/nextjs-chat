"use client";

import { Session } from "next-auth";
import { clsx } from "clsx";
import { useConversation, useContacts, useMessages } from "@/hooks";
import { ConversationInputBar } from "./ConversationInputBar";
import { ConversationHeader } from "./ConversationHeader";
import { ConversationBody } from "./ConversationBody";

type ConversationProps = { className?: string; session: Session };

export function Conversation({ className, session }: ConversationProps) {
	const { currentConversation } = useConversation();
	const { contacts } = useContacts();
	const { messages } = useMessages();

	return (
		<div className={clsx(className, "flex flex-col")}>
			{!!currentConversation && (
				<>
					<ConversationHeader conversation={currentConversation} />

					<ConversationBody
						contacts={contacts}
						messages={messages}
						user={session.user}
					/>

					<ConversationInputBar
						conversationId={currentConversation.id}
					/>
				</>
			)}
		</div>
	);
}
