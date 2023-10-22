import BG from "@/assets/bg.png";
import { IMessageClient, IUserClient } from "@/models";
import { getMessageHour } from "@/utils";
import { Message } from "./Message";

type ConversationBodyProps = {
	messages: IMessageClient[];
	user: IUserClient;
	contacts: Record<string, IUserClient>;
};

export function ConversationBody({ messages, user }: ConversationBodyProps) {
	return (
		<div
			className="flex-grow bg-slate-300"
			style={{ backgroundImage: `url(${BG.src})` }}
		>
			<div className="h-10"></div>

			<ul>
				{messages.map((t, i) => {
					const hour = getMessageHour(t.createdAt);

					return (
						<li key={i} className="mb-1 px-4">
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
