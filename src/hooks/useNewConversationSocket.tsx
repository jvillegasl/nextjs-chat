import { useEffect } from "react";
import { useSocket } from ".";
import { useSession } from "next-auth/react";
import { revalidatePath } from "@/actions";

export function useNewConversationSocket() {
	const { socket } = useSocket();
	const { data, status } = useSession();

	useEffect(() => {
		if (!socket || status !== "authenticated") return;

		const event = `${data.user.id}/chat:conversation:new`;

		if (socket.hasListeners(event)) return;

		socket.on(event, async () => revalidatePath("/chat"));
	}, [socket, data, status]);
}
