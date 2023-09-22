import { dbConnect, errorHandler } from "@/lib";
import { User } from "@/models";

export async function POST(request: Request) {
	return errorHandler(async () => {
		const { username, password } = await request.json();

		await dbConnect();

		const refUser = await User.findOne({ username }).select("+password");

		if (!refUser) {
			return Response.json(
				{ message: "User not found" },
				{ status: 401 },
			);
		}

		const isMatch = await refUser.authPassword(password);

		if (!isMatch) {
			return Response.json(
				{ message: "Incorrect Password" },
				{ status: 401 },
			);
		}

		const user = refUser.toClient();

		return Response.json({ user }, { status: 200 });
	});
}
