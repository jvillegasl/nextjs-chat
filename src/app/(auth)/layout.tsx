import { ReactNode } from "react";
import { Box, Container } from "@mui/material";

type AuthLayoutProps = {
	children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<Container maxWidth="xs">
			<Box sx={{ mt: 12 }}>{children}</Box>
		</Container>
	);
}
