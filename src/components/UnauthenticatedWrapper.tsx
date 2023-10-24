"use client";

import { signOut, useSession } from "next-auth/react";
import { PropsWithChildren, useEffect } from "react";

export function UnauthenticatedWrapper({ children }: PropsWithChildren) {
	const { status } = useSession();

	useEffect(() => {
		const interval = setInterval(() => {
			if (status === "unauthenticated") {
				signOut();
			}
		}, 10 * 1000);

		return () => clearInterval(interval);
	}, [status]);

	return children;
}
