import { Dispatch, SetStateAction, createContext } from "react";
import { IMessageClient } from "@/models";

export type MessagesRecord = Record<string, IMessageClient[]>;

type MessagesContext = {
	messagesRecord: MessagesRecord;
	messages: IMessageClient[];
	setMessagesRecord: Dispatch<SetStateAction<MessagesRecord>>;
	isFetching: boolean;
};

export const MessagesContext = createContext<MessagesContext | null>(null);
