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
import { LoginCallback, useLogin } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type AlertState = {
	isOpen: boolean;
	message?: string;
	severity?: AlertColor;
};

export function LoginForm() {
	const {
		register,
		handleLogin,
		formState: { errors, isSubmitting },
	} = useLogin();
	const callbackUrl = useSearchParams()?.get("callbackUrl");
	const router = useRouter();

	const [alertState, setAlertState] = useState<AlertState>({ isOpen: false });

	function handleAlertClose() {
		setAlertState((t) => ({ ...t, isOpen: false }));
	}

	const loginCallback: LoginCallback = function (response) {
		handleAlertClose();

		if (response?.error) {
			const errorData = JSON.parse(response.error);

			console.error(errorData);

			setAlertState({
				isOpen: true,
				message: errorData.message,
				severity: "error",
			});

			return;
		}

		router.push(callbackUrl ?? "/");
	};

	return (
		<Box
			component="form"
			noValidate
			sx={{ mt: 1 }}
			onSubmit={handleLogin(loginCallback)}
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
				disabled={isSubmitting}
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
