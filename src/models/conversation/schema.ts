import { Schema } from "mongoose";
import {
	IConversation,
	IConversationModel,
	IConversationMethods,
	IConversationClient,
	IConversationDocument,
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

ConversationSchema.methods.toClient = function (this: IConversationDocument) {
	const obj = this;

	const out: IConversationClient = {
		id: obj.id,
		participants: obj.participants.map((t) => t.toString()),
	};

	return out;
};
