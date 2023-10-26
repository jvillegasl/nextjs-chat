import { dbConnect, errorHandler } from "@/lib";
import { User } from "@/models";
import { getPictureURL } from "@/utils";

export async function POST(request: Request) {
	return errorHandler(async () => {
		const data = await request.json();

		await dbConnect();

		const picture = getPictureURL(data.username);
		const newUser = new User({ ...data, picture });

		const user = (await newUser.save()).toClient();

		return Response.json(user, { status: 201 });
	});
}
