import { Server as SocketIOServer, ServerOptions } from "socket.io";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";

declare module "socket.io" {
	interface ServerOptions {
		addTrailingSlash: boolean;
	}
}

declare global {
	type NextApiResponseServerIo = NextApiResponse & {
		socket: Socket & {
			server: NetServer & {
				io: SocketIOServer;
			};
		};
	};
}
