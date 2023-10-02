import { Schema } from "mongoose";
import { IMessage } from "..";
import {
	IMessageClient,
	IMessageDocument,
	IMessageMethods,
	MessageModel,
} from ".";

export const MessageSchema = new Schema<
	IMessage,
	MessageModel,
	IMessageMethods
>(
	{
		content: {
			type: String,
			required: [true, "Message Content is required"],
		},
		author: { type: Schema.Types.ObjectId, ref: "User" },
		conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
	},
	{ timestamps: true },
);

MessageSchema.methods.toClient = function (this: IMessageDocument) {
	const obj = this;

	const out: IMessageClient = {
		authorId: obj.author.toString(),
		content: obj.content,
		conversationId: obj.author.toString(),
		createdAt: obj.createdAt.toISOString(),
		updatedAt: obj.updatedAt.toISOString(),
	};

	return out;
};
