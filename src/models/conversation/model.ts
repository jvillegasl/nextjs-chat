import { model, models } from "mongoose";
import { IConversationModel, IConversation } from ".";
import { ConversationSchema } from "./schema";

export const Conversation: IConversationModel =
	models.Conversation ||
	model<IConversation, IConversationModel>("Conversation", ConversationSchema);
