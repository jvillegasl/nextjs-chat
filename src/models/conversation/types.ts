import { Types, Document, Model } from "mongoose";

export interface IConversation {
	participants: Types.ObjectId[];
}

export interface IConversationClient {
	id: string;
}

export interface IConversationMethods {
	toClient(): IConversationClient;
}

export interface IConversationDocument
	extends Document<unknown, {}, IConversation>,
		IConversationMethods {}

export interface IConversationModel
	extends Model<IConversation, {}, IConversationMethods> {}
