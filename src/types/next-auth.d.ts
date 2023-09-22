import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
import { IUser, IUserClient } from "@/models";

declare module "next-auth" {
	type User = IUserClient;

	interface Session {
		user: User;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: User;
	}
}
