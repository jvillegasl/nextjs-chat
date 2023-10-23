"use client";

import { useConversation } from "@/hooks";
import { PropsWithChildren, useEffect } from "react";

export function KeyBindingsWrapper({ children }: PropsWithChildren) {
	const { setCurrentConversation } = useConversation();

	useEffect(() => {
		const escKeyCallback = (e: KeyboardEvent) => {
			if (e.key !== "Escape") return;

			setCurrentConversation(undefined);
		};

		document.addEventListener("keyup", escKeyCallback);
	}, [setCurrentConversation]);

	return children;
}
