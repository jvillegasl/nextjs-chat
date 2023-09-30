import { ChatProvider, ContactsProvider, SocketProvider } from "@/providers";
import { PropsWithChildren } from "react";

export default function ChatLayout({ children }: PropsWithChildren) {
	return (
		<ContactsProvider>
			<ChatProvider>
				<SocketProvider>{children}</SocketProvider>
			</ChatProvider>
		</ContactsProvider>
	);
}
