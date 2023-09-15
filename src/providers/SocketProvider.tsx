"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { io as ClientIO, Socket } from "socket.io-client";

type SocketContext = {
	socket: Socket | null;
	isConnected: boolean;
};

export const SocketContext = createContext<SocketContext>({
	socket: null,
	isConnected: false,
});

type SocketProviderProps = {
	children: ReactNode;
};

export function SocketProvider({ children }: SocketProviderProps) {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState<boolean>(false);

	useEffect(() => {
		const socketInstance: Socket = new (ClientIO as any)(undefined, {
			path: "/api/socket/io",
			addTrailingSlash: false,
		});

		socketInstance.on("connect", () => {
			setIsConnected(true);
			console.log("Socket connected", socketInstance.id);
		});

		socketInstance.on("disconnect", () => {
			setIsConnected(false);
			console.log("Socket disconnected", socketInstance.id);
		});

		setSocket(socketInstance);
	}, []);

	return (
		<SocketContext.Provider value={{ socket, isConnected }}>
			{children}
		</SocketContext.Provider>
	);
}
