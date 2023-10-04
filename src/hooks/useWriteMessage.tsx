import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useSocket } from ".";
import { Socket } from "socket.io-client";

function emitWritingStatus(
	socket: Socket,
	conversationId: string,
	isWriting: boolean,
) {
	socket.emit("chat:writing", {
		conversationId,
		isWriting,
	});
}

export function useWriteMessage(
	conversationId: string,
	timeout: number = 1000,
) {
	const { socket } = useSocket();

	const intervalRef = useRef<NodeJS.Timeout>();

	const [message, setMessage] = useState<string>("");
	const [isWriting, setIsWriting] = useState<boolean>(false);

	// Clock to emit socket event while writing
	useEffect(() => {
		if (isWriting && !intervalRef.current) {
			const interval = setInterval(() => {
				if (!socket) return;

				emitWritingStatus(socket, conversationId, true);
			}, timeout);

			intervalRef.current = interval;
		} else if (!isWriting && intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = undefined;
		}
	}, [isWriting, timeout, socket, conversationId]);

	// Timer to turn off writing state after changes stop
	useEffect(() => {
		if (!isWriting) return;

		const timer = setTimeout(() => setIsWriting(false), timeout);

		return () => clearTimeout(timer);
	}, [message, isWriting, timeout, socket]);

	const handleChange: ChangeEventHandler<HTMLInputElement> = function (e) {
		setMessage(e.target.value);

		if (isWriting) return;

		setIsWriting(true);
	};

	return {
		message,
		setMessage,
		isWriting,
		handleChange,
	};
}
