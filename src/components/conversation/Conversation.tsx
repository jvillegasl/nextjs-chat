"use client";

import { clsx } from "clsx";
import { IUserClient } from "@/models";
import { useConversations, useContacts, useMessages } from "@/hooks";
import { ConversationInputBar } from "./ConversationInputBar";
import { ConversationHeader } from "./ConversationHeader";
import { ConversationBody } from "./ConversationBody";
import { ConversationCover } from "./ConversationCover";
import { useState } from "react";

type ConversationProps = { className?: string; user: IUserClient };

export function Conversation({ className, user }: ConversationProps) {
	const { currentConversation } = useConversations();
	const { contactsRecord } = useContacts();
	const { messages, isFetching } = useMessages();

	const [shouldScrollToBottom, setShouldScrollToBottom] =
		useState<boolean>(false);
	const scrollToBottom = (el: HTMLElement) => {
		if (!shouldScrollToBottom) return;

		setShouldScrollToBottom(false);

		el.scrollTo(0, el.scrollHeight);
	};

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
						contacts={contactsRecord}
						messages={messages}
						user={user}
						isFetching={isFetching}
						scrollToBottom={scrollToBottom}
					/>
					<ConversationInputBar
						conversationId={currentConversation.id}
						onSubmitSuccess={() => setShouldScrollToBottom(true)}
					/>
				</>
			)}
		</div>
	);
}
