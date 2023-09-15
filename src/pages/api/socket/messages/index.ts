import { NextApiRequest } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponseServerIo,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { message } = req.body;

	res.socket.server.io.emit("chat:global", message);

	res.status(200).json(message);
}
