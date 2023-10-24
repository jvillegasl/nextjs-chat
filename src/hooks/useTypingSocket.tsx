import { useEffect, useRef, useState } from "react";
import { useSocket } from ".";

export function useTypingSocket(
	conversationId: string,
	timeout: number = 1500,
) {
	const { socket } = useSocket();

	const timerRef = useRef<NodeJS.Timeout>();

	const [isTyping, setIsTyping] = useState<boolean>(false);
	const [userTyping, setUserTyping] = useState<string>();

	useEffect(() => {
		if (!socket) return;

		const event = `${conversationId}/chat:writing`;

		if (socket.hasListeners(event)) return;

		socket.on(event, (data) => {
			clearTimeout(timerRef.current);
			setUserTyping(data.username);
			setIsTyping(true);

			const timer = setTimeout(() => {
				setUserTyping("");
				setIsTyping(false);
			}, timeout);

			timerRef.current = timer;
		});
	}, [socket, conversationId, timeout]);

	return {
		isTyping,
		userTyping,
	};
}
