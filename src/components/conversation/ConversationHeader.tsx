import { IConversationClient } from "@/models";
import Image from "next/image";

type ConversationHeaderProps = {
	conversation: IConversationClient;
};

export function ConversationHeader({ conversation }: ConversationHeaderProps) {
	return (
		<div className="flex h-16 flex-row items-center bg-sky-300 px-4">
			<div className="pr-4">
				<Image
					className="rounded-full"
					src={conversation.picture}
					alt={`${conversation.name} conversation picture`}
					width={40}
					height={40}
				/>
			</div>

			<div>
				<span className="font-light">{conversation.name}</span>
			</div>
		</div>
	);
}
