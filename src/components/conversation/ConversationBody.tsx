import BG from "@/assets/bg.png";
import { IMessageClient, IUserClient } from "@/models";
import { getMessageHour } from "@/utils";
import { Message } from "./Message";
import { useEffect, useRef } from "react";

type ConversationBodyProps = {
	conversationId: string;
	messages: IMessageClient[];
	user: IUserClient;
	contacts: Record<string, IUserClient>;
	isFetching: boolean;
};

export function ConversationBody({
	conversationId,
	messages,
	user,
	isFetching,
}: ConversationBodyProps) {
	const bodyRef = useRef<HTMLDivElement>(null);
	const lastSeenMessageRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (!lastSeenMessageRef) return;

		const lastSeenMessageElement = lastSeenMessageRef.current;

		if (!lastSeenMessageElement) return;

		if (isFetching) return;

		lastSeenMessageElement.scrollIntoView(false);
	}, [isFetching, conversationId]);

	return (
		<div
			ref={bodyRef}
			className="h-0 flex-grow overflow-y-auto bg-slate-300"
			style={{ backgroundImage: `url(${BG.src})` }}
		>
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
		</div>
	);
}
