import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
	callbacks: {
		authorized({ token }) {
			return token !== null;
		},
	},
});

export const config = {
	matcher: ["/", "/chat", "/api/socket/messages", "/api/auth/:path*"],
};
