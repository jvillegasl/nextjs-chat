import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInResponse, signIn } from "next-auth/react";
import { z } from "zod";

const LoginSchema = z.object({
	username: z
		.string({ required_error: "Username is required" })
		.min(1, { message: "Username is required" }),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, { message: "Password is required" }),
});

type LoginInput = z.infer<typeof LoginSchema>;

export type LoginCallback = (response: SignInResponse | undefined) => void;

export function useLogin() {
	const { handleSubmit, ...form } = useForm<LoginInput>({
		resolver: zodResolver(LoginSchema),
	});

	function handleLogin(callback?: LoginCallback) {
		return handleSubmit(async (data) => {
			const response = await signIn("credentials", {
				...data,
				redirect: false,
			});

			if (callback) callback(response);
		});
	}

	return {
		...form,
		handleLogin,
	};
}
