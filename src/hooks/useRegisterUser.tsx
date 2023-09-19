import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterSchema = z.object({
	username: z
		.string({ required_error: "Username is required" })
		.min(1, { message: "Username is required" }),
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Invalid email format" }),
	password: z
		.string({ required_error: "Password is required" })
		.min(8, { message: "Password must have at least 8 characters" }),
});

type RegisterInput = z.infer<typeof RegisterSchema>;

export type RegisterUserCallback = (response: Response) => void;

export function useRegisterUser() {
	const { handleSubmit, ...form } = useForm<RegisterInput>({
		resolver: zodResolver(RegisterSchema),
	});

	function handleRegister(callback?: RegisterUserCallback) {
		return handleSubmit(async (data) => {
			const response = await fetch("/api/register", {
				method: "POST",
				body: JSON.stringify(data),
			});

			if (callback) callback(response);
		});
	}

	return {
		...form,
		handleRegister,
	};
}
