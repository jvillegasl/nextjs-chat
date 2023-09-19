"use client";

import {
	Alert,
	AlertColor,
	Box,
	Button,
	CircularProgress,
	Snackbar,
	TextField,
} from "@mui/material";
import { RegisterUserCallback, useRegisterUser } from "@/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AlertState = {
	isOpen: boolean;
	message?: string;
	severity?: AlertColor;
};

export function RegisterForm() {
	const router = useRouter();

	const {
		register,
		handleRegister,
		setError,
		formState: { errors, isSubmitting },
	} = useRegisterUser();

	const [alertState, setAlertState] = useState<AlertState>({ isOpen: false });

	function handleAlertClose() {
		setAlertState((t) => ({ ...t, isOpen: false }));
	}

	const registerUserCallback: RegisterUserCallback = async function (
		response,
	) {
		handleAlertClose();
		const json = await response.json();

		if (!response.ok) {
			console.error(response);
			console.error(json);
			const usernameError = json?.data?.username;
			const emailError = json?.data?.email;
			const passwordError = json?.data?.error;

			if (usernameError)
				setError("username", {
					type: "server",
					message: usernameError.message,
				});

			if (emailError)
				setError("email", {
					type: "server",
					message: emailError.message,
				});

			if (passwordError)
				setError("password", {
					type: "server",
					message: passwordError.message,
				});

			setAlertState({
				isOpen: true,
				message: json.message,
				severity: "error",
			});

			return;
		}

		router.push("/login");
	};

	return (
		<Box
			component="form"
			noValidate
			sx={{ mt: 1 }}
			onSubmit={handleRegister(registerUserCallback)}
		>
			<TextField
				id="username"
				type="text"
				label="Username"
				margin="normal"
				size="small"
				autoFocus
				fullWidth
				error={!!errors.username}
				helperText={!!errors.username && errors.username.message}
				{...register("username")}
			/>

			<TextField
				id="email"
				type="email"
				label="Email"
				margin="normal"
				size="small"
				fullWidth
				error={!!errors.email}
				helperText={!!errors.email && errors.email.message}
				{...register("email")}
			/>

			<TextField
				id="password"
				type="password"
				label="Password"
				margin="normal"
				size="small"
				fullWidth
				error={!!errors.password}
				helperText={!!errors.password && errors.password.message}
				{...register("password")}
			/>

			<Button
				type="submit"
				variant="contained"
				fullWidth
				sx={{ mt: 3, mb: 2 }}
			>
				{isSubmitting ? (
					<CircularProgress color="inherit" size={24} />
				) : (
					"Submit"
				)}
			</Button>

			<Snackbar
				open={alertState?.isOpen}
				autoHideDuration={5 * 1000}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				onClose={handleAlertClose}
			>
				<Alert
					onClose={handleAlertClose}
					severity={alertState.severity}
					variant="filled"
				>
					{alertState.message}
				</Alert>
			</Snackbar>
		</Box>
	);
}
