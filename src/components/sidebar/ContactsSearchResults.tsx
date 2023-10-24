"use client";

import Image from "next/image";
import { IUserClient } from "@/models";
import { useConversations, useSocket } from "@/hooks";
import { getOrCreateConversation } from "@/actions";

type ContactsSearchResultsProps = {
	searchResults: IUserClient[];
};

type ContactsSearchItemProps = {
	contact: IUserClient;
};

export function ContactsSearchResults({
	searchResults,
}: ContactsSearchResultsProps) {
	return (
		<ul>
			{searchResults.map((t, i) => (
				<li key={i}>
					<ContactsSearchItem contact={t} />
				</li>
			))}
		</ul>
	);
}

function ContactsSearchItem({ contact }: ContactsSearchItemProps) {
	const { socket } = useSocket();
	const { setCurrentConversation, setConversations } = useConversations();

	async function handleClick() {
		const { conversation, created } = await getOrCreateConversation(
			contact.id,
		);

		setCurrentConversation(conversation);

		socket?.emit("chat:conversation:new", {
			contactId: contact.id,
			conversationId: conversation.id,
		});

		if (!created) return;

		setConversations((t) => [...t, conversation]);
	}

	return (
		<div
			className="flex h-[4.5rem] w-full cursor-pointer"
			onClick={handleClick}
		>
			<div className="flex flex-row items-center pl-3 pr-4">
				<Image
					className="rounded-full"
					src={contact.picture}
					alt={`${contact.username} picture`}
					width={48}
					height={48}
				/>
			</div>

			<div className="flex flex-grow flex-row items-center pr-4">
				<span>{contact.username}</span>
			</div>
		</div>
	);
}
