import { HydratedDocument, Model } from "mongoose";
import { IConversationDocument } from "..";

export interface IUser {
	username: string;
	email: string;
	password: string;
	picture: string;
}

export interface IUserClient {
	id: string;
	username: string;
	email: string;
	picture: string;
}

export interface IUserMethods {
	authPassword(candidatePassword: string): Promise<boolean>;
	toClient(): IUserClient;
}

export interface IUserVirtuals {
	conversations: IConversationDocument[];
}

export interface IUserDocument
	extends HydratedDocument<IUser & IUserVirtuals & IUserMethods> {}

export interface IUserModel
	extends Model<IUser, {}, IUserMethods, IUserVirtuals> {}
