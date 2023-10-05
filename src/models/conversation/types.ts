import { Types, Model, HydratedDocument } from "mongoose";
import { IMessageClient, IMessageDocument } from "..";
import { Timestamps } from "@/types";

export interface IConversation extends Timestamps {
	participants: Types.ObjectId[];
}

export interface IConversationClient {
	id: string;
	contactId: string;
	lastMessage?: Pick<IMessageClient, "authorId" | "content" | "createdAt">;
	createdAt: string;
	updatedAt: string;
}

export interface IConversationMethods {
	toClient(userId: string): Promise<IConversationClient>;
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
