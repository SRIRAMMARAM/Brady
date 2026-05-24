import { cookies } from "next/headers";

const API = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const COOKIE = "brady_refresh_token";
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

export async function GET() {
  const jar = await cookies();
  const refreshToken = jar.get(COOKIE)?.value;
  if (!refreshToken) return new Response(null, { status: 401 });

  const upstream = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!upstream.ok) {
    jar.delete(COOKIE);
    return new Response(null, { status: 401 });
  }

  const data = await upstream.json();

  // Rotate the refresh token if the API returned a new one
  if (data.refresh_token) {
    jar.set(COOKIE, data.refresh_token, COOKIE_OPTS);
  }

  const meRes = await fetch(`${API}/auth/me`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });
  const user = meRes.ok ? await meRes.json() : null;

  return Response.json({ access_token: data.access_token, user });
}
