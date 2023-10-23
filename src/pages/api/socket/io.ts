import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { Server as ServerIO, Socket } from "socket.io";
import { parse } from "cookie";
import { dbConnect } from "@/lib";
import { Conversation } from "@/models";

export const config = {
	api: {
		bodyParser: false,
	},
};

async function getServerSessionFromSocket(socket: Socket) {
	const ioRes = {
		getHeader() {},
		setCookie() {},
		setHeader() {},
	};

	const ioReq = {
		headers: socket.handshake.headers,
		cookies: parse(socket.handshake.headers.cookie!),
	};

	const session = await getServerSession(
		ioReq as any,
		ioRes as any,
		authOptions,
	);

	return session;
}

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
				const { user } = (await getServerSessionFromSocket(socket))!;

				const event = `${t.conversationId}/chat:writing`;

				socket.broadcast.emit(event, {
					username: user.username,
				});
			});

			socket.on("chat:conversation:new", async (t) => {
				const event = `${t.contactId}/chat:conversation:new`;

				await dbConnect();

				const conversation = await Conversation.findById(
					t.conversationId,
				);

				const conversationClient = await conversation?.toClient(
					t.contactId,
				);

				socket.broadcast.emit(event, {
					conversation: conversationClient,
				});
			});
		});

		res.socket.server.io = io;
	}

	res.end();
}
