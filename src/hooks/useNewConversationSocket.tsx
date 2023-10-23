import { useEffect } from "react";
import { useConversations, useSocket } from ".";
import { useSession } from "next-auth/react";

export function useNewConversationSocket() {
	const { socket } = useSocket();
	const { data, status } = useSession();
	const { setConversations } = useConversations();

	useEffect(() => {
		if (!socket || status !== "authenticated") return;

		const event = `${data.user.id}/chat:conversation:new`;

		if (socket.hasListeners(event)) return;

		socket.on(event, (v) =>
			setConversations((t) => [...t, v.conversation]),
		);
	}, [socket, data, status, setConversations]);
}
