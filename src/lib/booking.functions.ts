import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Booking server functions — slots checked + written from server side.
// Google Sheet is updated server-to-server (no CORS issues, no exposed URL).
// ---------------------------------------------------------------------------

// In-memory store as fallback — also acts as a same-request cache.
// The source of truth is Google Sheets (read on every date selection).
const bookedSlots: Record<string, string[]> = {};

const SHEETS_URL = process.env.SHEETS_WEBHOOK; // server-only, never sent to browser

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatSlotLabel(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const endM = m + 30 >= 60 ? m - 30 : m + 30;
  const endH = m + 30 >= 60 ? h + 1 : h;
  const fmt = (hh: number, mm: number) => {
    const p = hh >= 12 ? "PM" : "AM";
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    return `${h12}:${mm.toString().padStart(2, "0")} ${p}`;
  };
  return `${fmt(h, m)} – ${fmt(endH, endM)}`;
}

async function writeToSheet(payload: {
  id: string; name: string; phone: string; service: string;
  date: string; slot: string; childAge?: string;
}): Promise<void> {
  if (!SHEETS_URL) return;
  try {
    const params = new URLSearchParams({
      action: "book",
      id: payload.id,
      name: payload.name,
      phone: payload.phone,
      service: payload.service,
      date: payload.date,
      slot: payload.slot,
      childAge: payload.childAge ?? "—",
    });
    await fetch(`${SHEETS_URL}?${params.toString()}`);
  } catch (err) {
    console.error("[booking] Sheet write failed:", err);
  }
}

async function readBookedSlotsFromSheet(date: string): Promise<string[]> {
  if (!SHEETS_URL) return bookedSlots[date] ?? [];
  try {
    const url = `${SHEETS_URL}?date=${encodeURIComponent(date)}`;
    const res = await fetch(url);
    const json = (await res.json()) as { booked?: string[] };
    if (!Array.isArray(json.booked)) return bookedSlots[date] ?? [];

    // Convert slot labels back to raw keys e.g. "2:30 PM – 3:00 PM" → "14:30"
    const keys = json.booked
      .map((label: string) => {
        const match = label.match(/^(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return null;
        let hh = parseInt(match[1]);
        const mm = parseInt(match[2]);
        const period = match[3].toUpperCase();
        if (period === "PM" && hh !== 12) hh += 12;
        if (period === "AM" && hh === 12) hh = 0;
        return `${hh}:${mm.toString().padStart(2, "0")}`;
      })
      .filter(Boolean) as string[];

    // Sync in-memory cache
    bookedSlots[date] = keys;
    return keys;
  } catch {
    return bookedSlots[date] ?? [];
  }
}

// ── Server Functions ─────────────────────────────────────────────────────────

const dateSchema = z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) });

export const getBookedSlots = createServerFn({ method: "GET" })
  .validator((d: unknown) => dateSchema.parse(d))
  .handler(async ({ data }) => {
    const booked = await readBookedSlotsFromSheet(data.date);
    return { booked };
  });

const createSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().regex(/^\d{10}$/),
  service: z.string().min(2).max(80),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slot: z.string().min(3).max(10),
  childAge: z.string().max(30).optional(),
});

export const createBooking = createServerFn({ method: "POST" })
  .validator((d: unknown) => createSchema.parse(d))
  .handler(async ({ data }) => {
    // Validate date
    const dt = new Date(data.date + "T00:00:00");
    if (Number.isNaN(dt.getTime())) throw new Error("Invalid date");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dt < today) throw new Error("Date must be in the future");
    if (dt.getDay() === 0) throw new Error("We are closed on Sundays");

    // Check slot — prefer sheet, fall back to in-memory
    const taken = await readBookedSlotsFromSheet(data.date);
    if (taken.includes(data.slot)) {
      throw new Error("That slot was just booked. Please pick another.");
    }

    // Reserve in memory immediately (prevents double-booking within same instance)
    bookedSlots[data.date] = [...taken, data.slot];

    const id = `BK-${Date.now().toString(36).slice(-5).toUpperCase()}`;

    // Write to Google Sheet server-side — no CORS, URL never exposed to browser
    await writeToSheet({ id, ...data });

    return { id, ...data, amount: 200 };
  });
