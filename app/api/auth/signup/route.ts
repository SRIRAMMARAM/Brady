import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const API = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const COOKIE = "brady_refresh_token";
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const upstream = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!upstream.ok) {
    const err = await upstream.json().catch(() => ({}));
    return Response.json(
      { detail: err?.detail ?? upstream.statusText },
      { status: upstream.status },
    );
  }

  const data = await upstream.json();
  const jar = await cookies();
  jar.set(COOKIE, data.refresh_token, COOKIE_OPTS);

  const meRes = await fetch(`${API}/auth/me`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });
  const user = meRes.ok ? await meRes.json() : null;

  return Response.json({ access_token: data.access_token, user });
}
