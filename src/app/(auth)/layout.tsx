import { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type AuthLayoutProps = {
	children: ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
	const session = await getServerSession(authOptions);

	if (session) redirect("/chat");

	return (
		<Container maxWidth="xs">
			<Box sx={{ mt: 12 }}>{children}</Box>
		</Container>
	);
}
