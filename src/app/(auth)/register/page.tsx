import { RegisterForm } from "@/components/auth";
import { Box, Container, Link, Typography } from "@mui/material";

export const metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<Container component="main">
			<Box className="flex flex-col items-center">
				<Typography component="h1" variant="h5">
					Register
				</Typography>

				<RegisterForm />

				<Link href="/login" variant="body2">
					Already have an account? Login
				</Link>
			</Box>
		</Container>
	);
}
