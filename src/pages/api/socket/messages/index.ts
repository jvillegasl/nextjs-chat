import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib";
import { Message } from "@/models";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponseServerIo,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { user } = (await getServerSession(req, res, authOptions))!;
	const { message, conversationId } = req.body;

	await dbConnect();

	const newMessage = await Message.create({
		author: user.id,
		content: message,
		conversation: conversationId,
	});

	const event = `${conversationId}/chat:message:new`;

	res.socket.server.io.emit(event, newMessage.toClient());

	res.status(200).json(message);
}
