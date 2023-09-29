import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: "/login",
		newUser: "/register",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "text" },
			},
			async authorize(credentials) {
				const response = await fetch(
					`${process.env.NEXTAUTH_URL}/api/login`,
					{
						method: "POST",
						body: JSON.stringify(credentials),
					},
				);

				const data = await response.json();

				if (!response.ok) {
					throw new Error(JSON.stringify(data));
				}

				const user = data.user;

				return user;
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: parseInt(process.env.TOKEN_MAX_AGE!),
	},
	callbacks: {
		async session({ session, token }) {
			session.user = token.user;

			return session;
		},
		async jwt({ token, user }) {
			if (user) token.user = user;

			return token;
		},
	},
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
