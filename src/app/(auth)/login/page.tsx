import { LoginForm } from "@/components/auth";
import { Box, Container, Link, Typography } from "@mui/material";

export default function LoginPage() {
	return (
		<Container component="main">
			<Box className="flex flex-col items-center">
				<Typography component="h1" variant="h5">
					Login
				</Typography>

				<LoginForm />

				<Link href="/register" variant="body2">
					{"Don't have an account? Sign Up"}
				</Link>
			</Box>
		</Container>
	);
}
