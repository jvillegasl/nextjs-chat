import { dbConnect, errorHandler } from "@/lib";
import { User } from "@/models";

export async function POST(request: Request) {
	return errorHandler(async () => {
		const data = await request.json();

		await dbConnect();

		const newUser = new User(data);

		const user = (await newUser.save()).toClient();

		return Response.json(user, { status: 201 });
	});
}
