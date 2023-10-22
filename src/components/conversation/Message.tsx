import { clsx } from "clsx";

type MessageProps = {
	username?: string;
	hour: string;
	content: string;
	alignEnd: boolean;
};

type MessageBubleProps = Omit<MessageProps, "alignEnd">;

export function Message({ alignEnd, ...props }: MessageProps) {
	return (
		<div className={clsx("flex", alignEnd && "justify-end")}>
			{<MessageBubble {...props} />}
		</div>
	);
}

function MessageBubble({ username, content, hour }: MessageBubleProps) {
	return (
		<div className="relative rounded-lg bg-white p-2 pr-10 shadow-md">
			{!!username && (
				<div>
					<span className="text-sm font-medium">{username}</span>
				</div>
			)}

			<div>
				<span className="text-sm">{content}</span>
			</div>

			<div className="absolute bottom-1 right-1">
				<span className="text-xs opacity-60">{hour}</span>
			</div>
		</div>
	);
}
