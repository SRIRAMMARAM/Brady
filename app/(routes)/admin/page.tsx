"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {
  ArrowLeft, Shield, Plus, Edit3, Trash2, X, AlertTriangle,
  CheckCircle, DollarSign, RotateCcw, Calendar, Search,
} from "lucide-react";
import Footer from "@/components/sections/Footer";
import { useAuth, ApiError } from "@/contexts/AuthContext";
import {
  adminRooms, adminBookings,
  type RoomRead, type RoomCreate, type RoomUpdate, type RoomImpact,
  type BookingRead,
} from "@/lib/api";

const gold = "rgba(212,168,67,0.9)";
const fieldStyle = {
  background: "rgba(10,10,14,0.7)",
  border: "1px solid rgba(212,168,67,0.15)",
  color: "rgba(240,235,220,0.85)",
  colorScheme: "dark" as const,
};

type Tab = "rooms" | "bookings";

// ─── Main page ─────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { user, accessToken, isLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("rooms");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#050508" }}>
        <div className="w-6 h-6 border animate-spin" style={{ borderColor: gold, borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div style={{ backgroundColor: "#050508", minHeight: "100vh" }} className="flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <Shield size={42} className="mx-auto mb-6" style={{ color: "rgba(220,100,100,0.8)" }} />
          <h1 className="font-light mb-4" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "2.5rem", color: "rgba(245,235,200,0.9)" }}>
            Admins Only
          </h1>
          <p className="text-sm mb-8" style={{ color: "rgba(200,185,150,0.5)" }}>
            {!user ? "You must be signed in with an administrator account." : "Your account does not have administrator privileges."}
          </p>
          <Link href={!user ? "/my-bookings" : "/"} className="inline-block px-6 py-3 text-xs tracking-widest uppercase" style={{ border: `1px solid ${gold}`, color: gold }}>
            {!user ? "Sign In" : "Back to Home"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(212,168,67,0.06) 0%, transparent 60%)" }} />

      <section className="relative pt-40 pb-10 px-6 md:px-12 lg:px-20">
        <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group" style={{ color: "rgba(152,152,168,0.4)" }}>
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </Link>

        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield size={16} style={{ color: gold }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.6)" }}>Admin Console</span>
            </div>
            <h1 className="font-light leading-none" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #f5e8c0 0%, #c8a84b 40%, #f5e8c0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Operations
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {(["rooms", "bookings"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-5 py-2.5 text-xs tracking-widest uppercase"
                style={{
                  background: tab === t ? "rgba(212,168,67,0.12)" : "transparent",
                  border: `1px solid ${tab === t ? "rgba(212,168,67,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color: tab === t ? gold : "rgba(200,185,150,0.4)",
                }}
              >
                {t === "rooms" ? "Rooms" : "Bookings"}
              </button>
            ))}
          </div>
        </div>

        {tab === "rooms"    && accessToken && <RoomsTab    token={accessToken} />}
        {tab === "bookings" && accessToken && <BookingsTab token={accessToken} />}
      </section>

      <Footer />
    </div>
  );
}

// ─── ROOMS TAB ─────────────────────────────────────────────────────────────
function RoomsTab({ token }: { token: string }) {
  const [items,    setItems]    = useState<RoomRead[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [editing,  setEditing]  = useState<RoomRead | null>(null);
  const [creating, setCreating] = useState(false);
  const [impact,   setImpact]   = useState<RoomImpact | null>(null);
  const [busy,     setBusy]     = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await adminRooms.list(token, 1, 100);
      setItems(res.items);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  async function showImpact(room: RoomRead) {
    try {
      setBusy(true);
      const data = await adminRooms.impact(room.id, token);
      setImpact(data);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to load impact");
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!impact) return;
    setBusy(true);
    try {
      await adminRooms.delete(impact.id, token);
      setImpact(null);
      await fetchItems();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to delete");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(200,185,150,0.4)" }}>
          {items.length} room{items.length === 1 ? "" : "s"}
        </p>
        <motion.button onClick={() => setCreating(true)} className="flex items-center gap-2 px-4 py-2.5 text-xs tracking-widest uppercase" style={{ background: gold, color: "#080806", border: "none" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Plus size={13} /> Add Room
        </motion.button>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 text-xs flex items-center gap-2" style={{ background: "rgba(220,80,80,0.08)", border: "1px solid rgba(220,80,80,0.2)", color: "rgba(220,100,100,0.9)" }}>
          <AlertTriangle size={14} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 border animate-spin" style={{ borderColor: "rgba(212,168,67,0.3)", borderTopColor: gold }} />
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((r) => (
            <div key={r.id} className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-4 items-center p-4" style={{ background: "rgba(13,13,20,0.5)", border: `1px solid ${r.is_active ? "rgba(255,255,255,0.06)" : "rgba(220,80,80,0.15)"}` }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm" style={{ color: "rgba(245,235,200,0.85)", fontFamily: '"Cormorant Garamond", serif', fontSize: "1.2rem" }}>{r.name}</p>
                  {!r.is_active && <span className="text-xs px-2 py-0.5" style={{ background: "rgba(220,80,80,0.1)", color: "rgba(220,100,100,0.8)" }}>inactive</span>}
                </div>
                <p className="text-xs" style={{ color: "rgba(200,185,150,0.4)" }}>{r.type} · max {r.max_guests} guests · #{r.id}</p>
              </div>
              <p className="text-sm" style={{ color: gold, fontFamily: '"Cormorant Garamond", serif', fontSize: "1.25rem" }}>${r.price_per_night.toLocaleString()}</p>
              <button onClick={() => setEditing(r)} className="p-2" style={{ border: "1px solid rgba(212,168,67,0.2)", color: gold }} title="Edit">
                <Edit3 size={13} />
              </button>
              <button onClick={() => showImpact(r)} disabled={busy} className="p-2" style={{ border: "1px solid rgba(220,80,80,0.2)", color: "rgba(220,100,100,0.7)" }} title="Delete">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit modal */}
      <AnimatePresence>
        {(creating || editing) && (
          <RoomFormModal
            token={token}
            initial={editing}
            onClose={() => { setCreating(false); setEditing(null); }}
            onSaved={() => { setCreating(false); setEditing(null); fetchItems(); }}
          />
        )}
      </AnimatePresence>

      {/* Delete impact modal */}
      <AnimatePresence>
        {impact && (
          <ImpactModal
            impact={impact}
            busy={busy}
            onClose={() => setImpact(null)}
            onConfirm={confirmDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Room create/edit modal ───────────────────────────────────────────────
function RoomFormModal({ token, initial, onClose, onSaved }: {
  token: string;
  initial: RoomRead | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<RoomCreate & { is_active: boolean }>({
    name:            initial?.name            ?? "",
    type:            initial?.type            ?? "",
    description:     initial?.description     ?? "",
    story:           initial?.story           ?? "",
    price_per_night: initial?.price_per_night ?? 100,
    max_guests:      initial?.max_guests      ?? 2,
    is_active:       initial?.is_active       ?? true,
  });
  const [busy,  setBusy]  = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      if (initial) {
        const update: RoomUpdate = { ...form };
        await adminRooms.update(initial.id, update, token);
      } else {
        const { is_active: _ignored, ...createBody } = form;
        void _ignored;
        await adminRooms.create(createBody, token);
      }
      onSaved();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to save");
    } finally {
      setBusy(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
      <motion.form
        onSubmit={handleSave}
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
        style={{ background: "#0a0a08", border: `1px solid ${gold}` }}
      >
        <div className="flex items-center justify-between mb-6">
          <p className="font-light" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.75rem", color: "rgba(245,235,200,0.9)" }}>
            {initial ? "Edit Room" : "New Room"}
          </p>
          <button type="button" onClick={onClose} style={{ color: "rgba(200,185,150,0.4)" }}><X size={18} /></button>
        </div>

        <div className="space-y-3">
          {[
            { key: "name",  label: "Name",  type: "text" },
            { key: "type",  label: "Type",  type: "text", placeholder: "queen / king / suite / loft" },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <p className="text-xs tracking-widest uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>{label}</p>
              <input
                type={type} required value={String((form as unknown as Record<string, unknown>)[key] ?? "")}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full px-3 py-2.5 text-sm outline-none" style={fieldStyle}
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs tracking-widest uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>Price / night ($)</p>
              <input
                type="number" required min={1} step="0.01" value={form.price_per_night}
                onChange={(e) => setForm({ ...form, price_per_night: Number(e.target.value) })}
                className="w-full px-3 py-2.5 text-sm outline-none" style={fieldStyle}
              />
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>Max guests</p>
              <input
                type="number" required min={1} max={20} value={form.max_guests}
                onChange={(e) => setForm({ ...form, max_guests: Number(e.target.value) })}
                className="w-full px-3 py-2.5 text-sm outline-none" style={fieldStyle}
              />
            </div>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>Description</p>
            <textarea
              required rows={3} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2.5 text-sm outline-none resize-none" style={fieldStyle}
            />
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>Story</p>
            <textarea
              required rows={3} value={form.story}
              onChange={(e) => setForm({ ...form, story: e.target.value })}
              className="w-full px-3 py-2.5 text-sm outline-none resize-none" style={fieldStyle}
            />
          </div>

          {initial && (
            <label className="flex items-center gap-2 text-xs tracking-widest uppercase mt-2" style={{ color: "rgba(200,185,150,0.6)" }}>
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
              Active
            </label>
          )}
        </div>

        {error && (
          <div className="mt-4 px-3 py-2 text-xs" style={{ background: "rgba(220,80,80,0.08)", border: "1px solid rgba(220,80,80,0.2)", color: "rgba(220,100,100,0.9)" }}>{error}</div>
        )}

        <div className="flex gap-2 mt-6">
          <button type="button" onClick={onClose} className="flex-1 py-3 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,185,150,0.4)", background: "transparent" }}>
            Cancel
          </button>
          <motion.button type="submit" disabled={busy} className="flex-1 py-3 text-xs tracking-widest uppercase" style={{ background: busy ? "rgba(255,255,255,0.05)" : gold, color: busy ? "rgba(255,255,255,0.2)" : "#080806", border: "none" }} whileHover={busy ? {} : { scale: 1.01 }}>
            {busy ? "Saving…" : initial ? "Save" : "Create"}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}

// ─── Delete-impact modal ──────────────────────────────────────────────────
function ImpactModal({ impact, busy, onClose, onConfirm }: {
  impact: RoomImpact;
  busy: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-lg p-6" style={{ background: "#0a0a08", border: "1px solid rgba(220,80,80,0.3)" }}>
        <div className="flex items-center gap-3 mb-5">
          <AlertTriangle size={20} style={{ color: "rgba(220,100,100,0.9)" }} />
          <p className="font-light" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.5rem", color: "rgba(245,235,200,0.9)" }}>
            Delete &ldquo;{impact.name}&rdquo;?
          </p>
        </div>

        <p className="text-sm mb-4" style={{ color: "rgba(200,185,150,0.6)" }}>
          This will soft-delete the room and cancel <span style={{ color: "rgba(220,150,80,0.9)" }}>{impact.future_bookings_count}</span> future {impact.future_bookings_count === 1 ? "booking" : "bookings"}.
        </p>

        {impact.future_bookings.length > 0 && (
          <div className="max-h-48 overflow-y-auto mb-5 space-y-1.5 pr-2">
            {impact.future_bookings.map((b) => (
              <div key={b.ref_code} className="px-3 py-2 text-xs flex items-center justify-between" style={{ background: "rgba(220,80,80,0.05)", border: "1px solid rgba(220,80,80,0.1)" }}>
                <span style={{ color: "rgba(200,185,150,0.7)" }}>{b.user.name} · {b.check_in} → {b.check_out}</span>
                <span className="font-mono" style={{ color: "rgba(200,185,150,0.4)" }}>{b.ref_code}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-3 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,185,150,0.4)", background: "transparent" }}>
            Keep Room
          </button>
          <motion.button onClick={onConfirm} disabled={busy} className="flex-1 py-3 text-xs tracking-widest uppercase" style={{ background: busy ? "rgba(255,255,255,0.05)" : "rgba(220,80,80,0.85)", color: busy ? "rgba(255,255,255,0.2)" : "#fff", border: "none" }} whileHover={busy ? {} : { scale: 1.01 }}>
            {busy ? "Deleting…" : "Confirm Delete"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── BOOKINGS TAB ──────────────────────────────────────────────────────────
function BookingsTab({ token }: { token: string }) {
  const [items,    setItems]    = useState<BookingRead[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [busy,     setBusy]     = useState<string | null>(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate,   setToDate]   = useState("");
  const [page,     setPage]     = useState(1);
  const [pages,    setPages]    = useState(1);

  const fetchItems = useCallback(async (p = 1) => {
    setLoading(true); setError(null);
    try {
      const res = await adminBookings.list(token, {
        page: p, limit: 20,
        ...(fromDate ? { from_date: fromDate } : {}),
        ...(toDate   ? { to_date: toDate   } : {}),
      });
      setItems(res.items);
      setPages(res.pages);
      setPage(p);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [token, fromDate, toDate]);

  useEffect(() => { fetchItems(1); }, [fetchItems]);

  async function action(ref_code: string, kind: "cancel" | "mark-paid" | "refund") {
    setBusy(`${kind}-${ref_code}`); setError(null);
    try {
      if (kind === "cancel")    await adminBookings.cancel(ref_code, token);
      if (kind === "mark-paid") await adminBookings.markPaid(ref_code, token);
      if (kind === "refund")    await adminBookings.refund(ref_code, token);
      await fetchItems(page);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : `Failed to ${kind}`);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-end mb-6">
        <div>
          <p className="text-xs tracking-widest uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>From</p>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="px-3 py-2 text-sm outline-none" style={fieldStyle} />
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>To</p>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="px-3 py-2 text-sm outline-none" style={fieldStyle} />
        </div>
        <button onClick={() => fetchItems(1)} className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase" style={{ background: gold, color: "#080806", border: "none" }}>
          <Search size={13} /> Filter
        </button>
        {(fromDate || toDate) && (
          <button onClick={() => { setFromDate(""); setToDate(""); }} className="px-4 py-2 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,185,150,0.4)", background: "transparent" }}>
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 text-xs flex items-center gap-2" style={{ background: "rgba(220,80,80,0.08)", border: "1px solid rgba(220,80,80,0.2)", color: "rgba(220,100,100,0.9)" }}>
          <AlertTriangle size={14} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 border animate-spin" style={{ borderColor: "rgba(212,168,67,0.3)", borderTopColor: gold }} />
        </div>
      ) : items.length === 0 ? (
        <p className="text-center py-16 text-sm" style={{ color: "rgba(200,185,150,0.4)" }}>No bookings found.</p>
      ) : (
        <div className="space-y-2">
          {items.map((b) => {
            const isPaid      = b.payment_status === "paid";
            const isRefunded  = b.payment_status === "refunded";
            const isCancelled = b.booking_status === "cancelled";

            return (
              <div key={b.ref_code} className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start p-4" style={{ background: "rgba(13,13,20,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <p className="text-sm" style={{ color: "rgba(245,235,200,0.85)", fontFamily: '"Cormorant Garamond", serif', fontSize: "1.15rem" }}>{b.room.name}</p>
                    <span className="text-xs px-2 py-0.5" style={{ background: isCancelled ? "rgba(220,80,80,0.1)" : b.booking_status === "confirmed" ? "rgba(60,180,80,0.08)" : "rgba(212,168,67,0.08)", color: isCancelled ? "rgba(220,100,100,0.8)" : b.booking_status === "confirmed" ? "rgba(80,200,120,0.85)" : "rgba(212,168,67,0.85)" }}>
                      {b.booking_status}
                    </span>
                    <span className="text-xs px-2 py-0.5" style={{ background: isPaid ? "rgba(60,180,80,0.08)" : isRefunded ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.05)", color: isPaid ? "rgba(80,200,120,0.8)" : isRefunded ? "rgba(180,140,255,0.85)" : "rgba(200,185,150,0.5)" }}>
                      {b.payment_status} · {b.payment_mode}
                    </span>
                  </div>
                  <p className="text-xs flex flex-wrap gap-4" style={{ color: "rgba(200,185,150,0.5)" }}>
                    <span className="flex items-center gap-1.5"><Calendar size={11} /> {b.check_in} → {b.check_out}</span>
                    <span>{b.nights} nights</span>
                    <span style={{ color: gold }}>${b.total_price.toLocaleString()}</span>
                    <span className="font-mono" style={{ color: "rgba(200,185,150,0.4)" }}>{b.ref_code}</span>
                    <span>{b.user.name} ({b.user.email})</span>
                  </p>
                </div>

                <div className="flex gap-1.5 flex-wrap">
                  {!isCancelled && !isPaid && !isRefunded && (
                    <button onClick={() => action(b.ref_code, "mark-paid")} disabled={busy !== null} className="flex items-center gap-1.5 px-3 py-2 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(60,180,80,0.2)", color: "rgba(80,200,120,0.8)" }} title="Mark Paid">
                      <DollarSign size={12} /> {busy === `mark-paid-${b.ref_code}` ? "…" : "Paid"}
                    </button>
                  )}
                  {isPaid && !isRefunded && (
                    <button onClick={() => action(b.ref_code, "refund")} disabled={busy !== null} className="flex items-center gap-1.5 px-3 py-2 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(180,140,255,0.2)", color: "rgba(180,140,255,0.85)" }} title="Refund">
                      <RotateCcw size={12} /> {busy === `refund-${b.ref_code}` ? "…" : "Refund"}
                    </button>
                  )}
                  {!isCancelled && (
                    <button onClick={() => action(b.ref_code, "cancel")} disabled={busy !== null} className="flex items-center gap-1.5 px-3 py-2 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(220,80,80,0.2)", color: "rgba(220,100,100,0.7)" }} title="Cancel">
                      <X size={12} /> {busy === `cancel-${b.ref_code}` ? "…" : "Cancel"}
                    </button>
                  )}
                  {(isCancelled || isRefunded) && (
                    <span className="flex items-center gap-1.5 px-3 py-2 text-xs tracking-widest uppercase" style={{ color: "rgba(200,185,150,0.3)" }}>
                      <CheckCircle size={12} /> Closed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button onClick={() => fetchItems(page - 1)} disabled={page === 1} className="px-4 py-2 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(255,255,255,0.08)", color: page === 1 ? "rgba(255,255,255,0.15)" : "rgba(200,185,150,0.5)", background: "transparent" }}>
            Prev
          </button>
          <span className="text-xs" style={{ color: "rgba(200,185,150,0.35)" }}>{page} / {pages}</span>
          <button onClick={() => fetchItems(page + 1)} disabled={page === pages} className="px-4 py-2 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(255,255,255,0.08)", color: page === pages ? "rgba(255,255,255,0.15)" : "rgba(200,185,150,0.5)", background: "transparent" }}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
