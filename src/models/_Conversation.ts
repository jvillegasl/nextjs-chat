// import { Document, Model, Schema, Types, model, models } from "mongoose";

// export interface IConversation {
// 	participants: Types.ObjectId[];
// }

// interface IConversationMethods {}

// export interface IConversationDocument
// 	extends Document<unknown, {}, IConversation> {}

// interface ConversationModel
// 	extends Model<IConversation, {}, IConversationMethods> {}

// const ConversationSchema = new Schema<
// 	IConversation,
// 	ConversationModel,
// 	IConversationMethods
// >(
// 	{
// 		participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
// 	},
// 	{
// 		timestamps: true,
// 		toJSON: {
// 			virtuals: true,
// 			transform: function (doc, ret) {
// 				delete ret._id
				
// 				console.log("TOJSON", ret);
// 				return {};
// 			},
// 		},
// 		toObject: { virtuals: true },
// 	},
// );

// ConversationSchema.virtual("messages", {
// 	ref: "Message",
// 	localField: "_id",
// 	foreignField: "conversation",
// });

// export const Conversation: ConversationModel =
// 	models.Conversation ||
// 	model<IConversation, ConversationModel>("Conversation", ConversationSchema);
