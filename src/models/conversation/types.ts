import { Types, Model, HydratedDocument } from "mongoose";
import { IMessageDocument } from "..";

export interface IConversation {
	participants: Types.ObjectId[];
}

export interface IConversationClient {
	id: string;
	contactId: string;
}

export interface IConversationMethods {
	toClient(userId: string): IConversationClient;
}

export interface IConversationVirtuals {
	messages: IMessageDocument[];
}

export interface IConversationDocument
	extends HydratedDocument<
		IConversation & IConversationVirtuals & IConversationMethods
	> {}

export interface IConversationModel
	extends Model<
		IConversation,
		{},
		IConversationMethods,
		IConversationVirtuals
	> {}
