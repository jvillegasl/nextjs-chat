import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { Server as ServerIO } from "socket.io";
import { parse } from "cookie";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponseServerIo,
) {
	if (!res.socket.server.io) {
		const path = "/api/socket/io";
		const httpServer: NetServer = res.socket.server as any;
		const io = new ServerIO(httpServer, {
			path: path,
			addTrailingSlash: false,
		});

		io.on("connection", (socket) => {
			socket.on("chat:writing", async (t) => {
				const ioRes = {
					getHeader() {},
					setCookie() {},
					setHeader() {},
				};

				const ioReq = {
					headers: socket.handshake.headers,
					cookies: parse(socket.handshake.headers.cookie!),
				};

				const { user } = (await getServerSession(
					ioReq as any,
					ioRes as any,
					authOptions,
				))!;

				const event = `${t.conversationId}/chat:writing`;

				socket.broadcast.emit(event, {
					username: user.username,
				});
			});
		});

		res.socket.server.io = io;
	}

	res.end();
}
