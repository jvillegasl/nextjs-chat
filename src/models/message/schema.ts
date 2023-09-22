import { Schema } from "mongoose";
import { IMessage } from "..";
import { IMessageClient, IMessageMethods, MessageModel } from ".";

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

MessageSchema.methods.toClient = function () {
	const obj = this;

	const out: IMessageClient = {
		author: obj.author.toString(),
		content: obj.content,
		conversation: obj.author.toString(),
	};

	return out;
};
