import { useEffect, useRef, useState } from "react";
import { useSocket } from ".";

export function useWritingSocket(
	conversationId: string,
	timeout: number = 1500,
) {
	const { socket } = useSocket();

	const timerRef = useRef<NodeJS.Timeout>();

	const [isWriting, setIsWriting] = useState<boolean>(false);
	const [userWriting, setUserWriting] = useState<string>();

	useEffect(() => {
		if (!socket) return;

		const event = `${conversationId}/chat:writing`;

		if (socket.hasListeners(event)) return;

		socket.on(event, (data) => {
			clearTimeout(timerRef.current);
			setUserWriting(data.username);
			setIsWriting(data.isWriting);

			const timer = setTimeout(() => {
				setUserWriting("");
				setIsWriting(false);
			}, timeout);

			timerRef.current = timer;
		});
	}, [socket, conversationId, timeout]);

	return {
		isWriting,
		userWriting,
	};
}
