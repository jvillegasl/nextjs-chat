import { ChatProvider, SocketProvider } from "@/providers";
import { PropsWithChildren } from "react";

export default function ChatLayout({ children }: PropsWithChildren) {
	return (
		<ChatProvider>
			<SocketProvider>{children}</SocketProvider>
		</ChatProvider>
	);
}
