import { Error } from "mongoose";

export default function mongooseErrorHandler(err: Error) {
	if (err instanceof Error.MongooseServerSelectionError) {
		return Response.json(
			{ message: "Database Connection Error", data: err },
			{ status: 500 },
		);
	} else if (err instanceof Error.ValidationError) {
		return Response.json(
			{
				message: "Data Validation Error",
				data: err.errors,
			},
			{ status: 400 },
		);
	} else {
		return Response.json(
			{
				message: "Database Internal Error",
			},
			{ status: 500 },
		);
	}
}
