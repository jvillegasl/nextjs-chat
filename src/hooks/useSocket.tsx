import { SocketContext } from "@/providers";
import { useContext } from "react";

export function useSocket() {
	const context = useContext(SocketContext);

	if (!context) {
		throw new Error(
			"Context not found: You are trying to access SocketContext outside of its provider.",
		);
	}

	return context;
}
