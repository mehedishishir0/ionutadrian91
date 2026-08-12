import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

type ApiUser = {
  id: string;
  email: string;
  username: string;
  role: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
};

type AuthResponse = {
  statusCode: number;
  data: { accessToken: string; refreshToken: string; user: ApiUser };
};

const apiUrl = (process.env.API_URL ?? "http://localhost:5000").replace(/\/$/, "");

function accessTokenExpiresAt(accessToken: string) {
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split(".")[1], "base64url").toString("utf8"),
    ) as { exp?: number };
    return typeof payload.exp === "number" ? payload.exp * 1000 : Date.now() + 14 * 60 * 1000;
  } catch {
    return Date.now() + 14 * 60 * 1000;
  }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(`${apiUrl}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });
    const result: AuthResponse = await response.json();

    if (!response.ok || !result.data?.accessToken || !result.data?.refreshToken) {
      throw new Error("Token refresh failed");
    }

    return {
      ...token,
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken,
      accessTokenExpires: accessTokenExpiresAt(result.data.accessToken),
      error: undefined,
    };
  } catch {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const response = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-client-platform": "web" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            clientPlatform: "web",
          }),
        });
        const result: AuthResponse = await response.json();

        if (!response.ok || !result.data?.user || !result.data.accessToken || !result.data.refreshToken) {
          return null;
        }

        return {
          id: result.data.user.id,
          name: [result.data.user.firstName, result.data.user.lastName].filter(Boolean).join(" ") || result.data.user.username,
          email: result.data.user.email,
          image: result.data.user.avatarUrl ?? undefined,
          role: result.data.user.role,
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: accessTokenExpiresAt(user.accessToken),
          role: user.role,
        };
      }
      if (typeof token.accessTokenExpires === "number" && Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      session.user.role = typeof token.role === "string" ? token.role : "";
      session.accessToken = typeof token.accessToken === "string" ? token.accessToken : "";
      session.error = typeof token.error === "string" ? token.error : undefined;
      return session;
    },
  },
};
