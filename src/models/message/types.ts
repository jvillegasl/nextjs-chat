import { Timestamps } from "@/types";
import { Model, Types, HydratedDocument } from "mongoose";

export interface IMessage extends Timestamps {
	content: string;
	author: Types.ObjectId;
	conversation: Types.ObjectId;
}

export interface IMessageClient {
	content: string;
	authorId: string;
	conversationId: string;
	createdAt: string;
	updatedAt: string;
}

export interface IMessageMethods {
	toClient(): IMessageClient;
}

export interface IMessageDocument
	extends HydratedDocument<IMessage & IMessageMethods> {}

export interface MessageModel extends Model<IMessage, {}, IMessageMethods> {}
