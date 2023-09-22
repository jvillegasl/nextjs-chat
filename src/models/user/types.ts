import { Document, Model } from "mongoose";
import { IConversationDocument } from "..";

export interface IUser {
	username: string;
	email: string;
	password: string;
}

export interface IUserClient {
	id: string;
	username: string;
	email: string;
	conversations: any[];
}

export interface IUserMethods {
	authPassword(candidatePassword: string): Promise<boolean>;
	toClient(): IUserClient;
}

export interface IUserVirtuals {
	conversations: IConversationDocument[];
}

export interface IUserDocument
	extends Document<unknown, {}, IUser>,
		IUserVirtuals {}

export interface IUserModel
	extends Model<IUser, {}, IUserMethods, IUserVirtuals> {}
