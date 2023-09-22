import { model, models } from "mongoose";
import { IMessage, MessageModel } from ".";
import { MessageSchema } from "./schema";

export const Message: MessageModel =
	models.Message || model<IMessage, MessageModel>("Message", MessageSchema);
