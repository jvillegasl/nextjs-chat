"use client";

import Image from "next/image";
import { IConversationClient } from "@/models";
import {
	useConversations,
	useNewMessageSocket,
	useWritingSocket,
} from "@/hooks";
import { getLastMessageDate } from "@/utils";

type ConversationItemProps = {
	conversation: IConversationClient;
};

export function ConversationItem({ conversation }: ConversationItemProps) {
	const { setCurrentConversation } = useConversations();

	const { isWriting, userWriting } = useWritingSocket(conversation.id);
	useNewMessageSocket(conversation.id);

	const lastMessage = conversation.lastMessage;

	function getConversationInfo() {
		if (isWriting) {
			return (
				<span className="italic text-green-500">
					{userWriting} is Writing...
				</span>
			);
		}

		if (!!lastMessage) {
			return <span className="opacity-60">{lastMessage.content}</span>;
		}

		return (
			<span className="italic opacity-60">Write your first message</span>
		);
	}

	return (
		<div
			className="flex h-[4.5rem] w-full cursor-pointer"
			onClick={() => setCurrentConversation(conversation)}
		>
			<div className="flex flex-row items-center pl-3 pr-4">
				<Image
					className="rounded-full"
					src={conversation.picture}
					alt={`${conversation.name} conversation picture`}
					width={48}
					height={48}
				/>
			</div>

			<div className="flex flex-grow flex-col justify-center pr-4">
				<div className="flex flex-row">
					<span className="flex-grow">{conversation.name}</span>

					{!!lastMessage && (
						<span className="text-sm opacity-60">
							{getLastMessageDate(lastMessage.createdAt)}
						</span>
					)}
				</div>

				<div className="text-sm">{getConversationInfo()}</div>
			</div>
		</div>
	);
}
