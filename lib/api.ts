// ─── Brady Inn API Client ──────────────────────────────────────────────────
// Generated from OpenAPI 3.1.0 spec (Brady Inn Booking API v0.1.0)
// Base URL is read from NEXT_PUBLIC_API_BASE_URL environment variable.

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// ─── Shared types ─────────────────────────────────────────────────────────

export type UserRole = "admin" | "user";
export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type PaymentMode = "online" | "property";
export type PaymentStatus = "unpaid" | "paid";

export interface UserRead {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  created_at: string;
}

export interface RoomRead {
  id: number;
  name: string;
  type: string;
  description: string;
  story: string;
  price_per_night: number;
  max_guests: number;
  is_active: boolean;
}

export interface BookingRead {
  ref_code: string;
  room: RoomRead;
  user: UserRead;
  check_in: string;
  check_out: string;
  nights: number;
  total_price: number;
  payment_mode: PaymentMode;
  payment_status: PaymentStatus;
  booking_status: BookingStatus;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PayOnlineResponse {
  client_secret: string;
}

export interface InquiryResponse {
  ok: boolean;
}

// ─── Request bodies ───────────────────────────────────────────────────────

export interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserBookingCreate {
  room_id: number;
  check_in: string;   // YYYY-MM-DD
  check_out: string;  // YYYY-MM-DD
  payment_mode: PaymentMode;
}

export interface InquiryCreate {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface RoomCreate {
  name: string;
  type: string;
  description: string;
  story: string;
  price_per_night: number;
  max_guests: number;
}

export interface RoomUpdate {
  name?: string | null;
  type?: string | null;
  description?: string | null;
  story?: string | null;
  price_per_night?: number | null;
  max_guests?: number | null;
  is_active?: boolean | null;
}

// ─── HTTP helper ──────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function req<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = body?.detail?.[0]?.msg ?? body?.detail ?? message;
    } catch { /* ignore parse errors */ }
    throw new ApiError(res.status, message);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────

export const auth = {
  signup: (body: SignupRequest) =>
    req<TokenResponse>("/auth/signup", { method: "POST", body: JSON.stringify(body) }),

  login: (body: LoginRequest) =>
    req<TokenResponse>("/auth/login", { method: "POST", body: JSON.stringify(body) }),

  refresh: (refresh_token: string) =>
    req<AccessTokenResponse>("/auth/refresh", { method: "POST", body: JSON.stringify({ refresh_token }) }),

  me: (token: string) =>
    req<UserRead>("/auth/me", {}, token),
};

// ─── Rooms (public) ───────────────────────────────────────────────────────

export const rooms = {
  list: () =>
    req<RoomRead[]>("/rooms"),

  get: (room_id: number) =>
    req<RoomRead>(`/rooms/${room_id}`),
};

// ─── Availability ─────────────────────────────────────────────────────────

export const availability = {
  check: (check_in: string, check_out: string, guests: number) =>
    req<RoomRead[]>(
      `/availability?check_in=${check_in}&check_out=${check_out}&guests=${guests}`
    ),
};

// ─── Bookings (public lookup + user-scoped) ───────────────────────────────

export const bookings = {
  get: (ref_code: string) =>
    req<BookingRead>(`/bookings/${ref_code}`),

  cancel: (ref_code: string, token: string) =>
    req<BookingRead>(`/bookings/${ref_code}/cancel`, { method: "POST" }, token),

  payOnline: (ref_code: string) =>
    req<PayOnlineResponse>(`/bookings/${ref_code}/pay-online`, { method: "POST" }),
};

// ─── User bookings (requires auth) ───────────────────────────────────────

export const userBookings = {
  create: (body: UserBookingCreate, token: string) =>
    req<BookingRead>("/user/bookings", { method: "POST", body: JSON.stringify(body) }, token),

  list: (token: string, page = 1, limit = 20) =>
    req<PaginatedResponse<BookingRead>>(
      `/user/bookings?page=${page}&limit=${limit}`,
      {},
      token
    ),
};

// ─── Inquiries (public) ───────────────────────────────────────────────────

export const inquiries = {
  submit: (body: InquiryCreate) =>
    req<InquiryResponse>("/inquiries", { method: "POST", body: JSON.stringify(body) }),
};

// ─── Admin — Rooms ────────────────────────────────────────────────────────

export const adminRooms = {
  list: (token: string, page = 1, limit = 20) =>
    req<PaginatedResponse<RoomRead>>(`/admin/rooms?page=${page}&limit=${limit}`, {}, token),

  create: (body: RoomCreate, token: string) =>
    req<RoomRead>("/admin/rooms", { method: "POST", body: JSON.stringify(body) }, token),

  update: (room_id: number, body: RoomUpdate, token: string) =>
    req<RoomRead>(`/admin/rooms/${room_id}`, { method: "PUT", body: JSON.stringify(body) }, token),

  delete: (room_id: number, token: string) =>
    req<void>(`/admin/rooms/${room_id}`, { method: "DELETE" }, token),
};

// ─── Admin — Bookings ─────────────────────────────────────────────────────

export const adminBookings = {
  list: (token: string, opts?: { from_date?: string; to_date?: string; page?: number; limit?: number }) => {
    const p = new URLSearchParams();
    if (opts?.from_date) p.set("from_date", opts.from_date);
    if (opts?.to_date)   p.set("to_date", opts.to_date);
    if (opts?.page)      p.set("page", String(opts.page));
    if (opts?.limit)     p.set("limit", String(opts.limit));
    return req<PaginatedResponse<BookingRead>>(`/admin/bookings?${p}`, {}, token);
  },

  cancel: (ref_code: string, token: string) =>
    req<void>(`/admin/bookings/${ref_code}`, { method: "DELETE" }, token),
};
