import { model, models } from "mongoose";
import { IUser, IUserModel } from "..";
import { UserSchema } from "./schema";

export const User: IUserModel =
	models.User || model<IUser, IUserModel>("User", UserSchema);
