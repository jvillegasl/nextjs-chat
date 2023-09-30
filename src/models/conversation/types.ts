import { Types, Model, HydratedDocument } from "mongoose";
import { IMessageDocument } from "..";

export interface IConversation {
	participants: Types.ObjectId[];
}

export interface IConversationClient {
	id: string;
	participants: string[];
}

export interface IConversationMethods {
	toClient(): IConversationClient;
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
