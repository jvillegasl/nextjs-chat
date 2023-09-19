import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
import { IUser } from "@/models";

declare module "next-auth" {
	interface User extends Pick<IUser, "username" | "email"> {}
	interface AdapterUser extends User {}

	interface Session {
		user: User;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: User;
	}
}
