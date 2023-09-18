import { Error as MongooseError } from "mongoose";
import mongooseErrorHandler from "./mongoose";

function defaultErrorHandler(err: any) {
	return Response.json(
		{
			error: {
				message: "Internal Server Error",
				err,
			},
		},
		{ status: 500 },
	);
}

export async function errorHandler<T>(fn: () => Promise<T> | T) {
	try {
		return await fn();
	} catch (err: unknown) {
		if (err instanceof MongooseError) {
			return mongooseErrorHandler(err);
		} else {
			return defaultErrorHandler(err);
		}
	}
}
