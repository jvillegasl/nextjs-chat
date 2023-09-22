import { Schema } from "mongoose";
import {
	IConversationModel,
	IConversation,
	IConversationMethods,
	IConversationClient,
} from ".";

export const ConversationSchema = new Schema<
	IConversation,
	IConversationModel,
	IConversationMethods
>(
	{
		participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

ConversationSchema.virtual("messages", {
	ref: "Message",
	localField: "_id",
	foreignField: "conversation",
});

ConversationSchema.methods.toClient = function () {
	const obj = this;

	const out: IConversationClient = {
		id: obj.id,
	};

	return out;
};
