import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const API = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const COOKIE = "brady_refresh_token";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const jar = await cookies();

  if (body.access_token) {
    fetch(`${API}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${body.access_token}` },
    }).catch(() => {});
  }

  jar.delete(COOKIE);
  return new Response(null, { status: 204 });
}
