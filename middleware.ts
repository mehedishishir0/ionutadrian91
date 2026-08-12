import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/auth/login" },
  callbacks: {
    authorized: ({ token }) => Boolean(token && token.error !== "RefreshAccessTokenError"),
  },
});

export const config = {
  matcher: ["/((?!api/auth|auth/login|_next/static|_next/image|favicon.ico).*)"],
};
