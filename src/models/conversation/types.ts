import { Types, Document, Model } from "mongoose";
import { IMessageDocument } from "..";

export interface IConversation {
	participants: Types.ObjectId[];
}

export interface IConversationClient {
	id: string;
}

export interface IConversationMethods {
	toClient(): IConversationClient;
}

export interface IConversationVirtuals {
	messages: IMessageDocument[];
}

export interface IConversationDocument
	extends Document<unknown, {}, IConversation>,
		IConversationVirtuals,
		IConversationMethods {}

export interface IConversationModel
	extends Model<
		IConversation,
		{},
		IConversationMethods,
		IConversationVirtuals
	> {}
