import { HydratedDocument, Model } from "mongoose";
import { IConversationClient, IConversationDocument } from "..";

export interface IUser {
	username: string;
	email: string;
	password: string;
}

export interface IUserClient {
	id: string;
	username: string;
	email: string;
	conversations: IConversationClient[];
}

export interface IUserMethods {
	authPassword(candidatePassword: string): Promise<boolean>;
	toClient(): IUserClient;
}

export interface IUserVirtuals {
	conversations: IConversationDocument[];
}

export interface IUserDocument
	extends HydratedDocument<IUser & IUserVirtuals> {}

export interface IUserModel
	extends Model<IUser, {}, IUserMethods, IUserVirtuals> {}
