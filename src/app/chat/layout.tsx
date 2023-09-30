import {
	ConversationProvider,
	ContactsProvider,
	SocketProvider,
} from "@/providers";
import { PropsWithChildren } from "react";

export default function ChatLayout({ children }: PropsWithChildren) {
	return (
		<ContactsProvider>
			<ConversationProvider>
				<SocketProvider>{children}</SocketProvider>
			</ConversationProvider>
		</ContactsProvider>
	);
}
