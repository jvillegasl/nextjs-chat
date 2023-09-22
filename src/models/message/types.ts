import { Model, Types, Document } from "mongoose";

export interface IMessage {
	content: string;
	author: Types.ObjectId;
	conversation: Types.ObjectId;
}

export interface IMessageClient {
	content: string;
	author: string;
	conversation: string;
}

export interface IMessageMethods {
	toClient(): IMessageClient;
}

export interface IMessageDocument
	extends Document<unknown, {}, IMessage>,
		IMessageMethods {}

export interface MessageModel extends Model<IMessage, {}, IMessageMethods> {}
