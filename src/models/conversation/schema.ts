import { Schema } from "mongoose";
import {
	IConversation,
	IConversationModel,
	IConversationMethods,
	IConversationClient,
	IConversationDocument,
} from ".";
import { IMessageDocument } from "..";

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

ConversationSchema.methods.toClient = async function (
	this: IConversationDocument,
	userId,
) {
	const obj = this;

	await obj.populate("messages");

	const messages = obj.messages.sort(
		(a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
	);

	const lastMessageDocument: IMessageDocument | undefined = messages[0];

	let lastMessage: IConversationClient["lastMessage"];

	if (lastMessageDocument) {
		const { authorId, content, createdAt } = lastMessageDocument.toClient();
		lastMessage = { authorId, content, createdAt };
	}

	const out: IConversationClient = {
		id: obj.id,
		contactId: obj.participants
			.find((t) => t.toString() !== userId)
			?.toString()!,
		createdAt: obj.createdAt.toISOString(),
		updatedAt: obj.updatedAt.toISOString(),
		lastMessage,
	};

	return out;
};
