import { getSession } from "next-auth/react";

const apiUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(/\/$/, "");

export async function authenticatedFetch(path: string, init: RequestInit = {}) {
  const session = await getSession();
  if (!session?.accessToken || session.error) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${session.accessToken}`);
  const url = path.startsWith("http") ? path : `${apiUrl}${path}`;
  return fetch(url, { ...init, headers });
}
