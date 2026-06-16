import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ---------------------------------------------------------------------------
// ALL Google Sheet calls happen SERVER-SIDE only.
// → No CORS issues (server calls Apps Script directly)
// → SHEETS_WEBHOOK is never exposed to the browser
// ---------------------------------------------------------------------------

const SHEETS_URL = process.env.SHEETS_WEBHOOK; // set in .env — never use VITE_ prefix

// ── In-memory slot cache (per server instance) ────────────────────────────
const slotCache: Record<string, string[]> = {};

// ── Slot label helpers ────────────────────────────────────────────────────
function formatSlotLabel(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const endM = m + 30 >= 60 ? m - 30 : m + 30;
  const endH = m + 30 >= 60 ? h + 1 : h;
  const fmt = (hh: number, mm: number) => {
    const p = hh >= 12 ? "PM" : "AM";
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    return `${h12}:${mm.toString().padStart(2, "0")} ${p}`;
  };
  return `${fmt(h, m)} \u2013 ${fmt(endH, endM)}`;
}

function labelToSlotKey(label: string): string | null {
  const match = label.match(/^(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return null;
  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${h}:${m.toString().padStart(2, "0")}`;
}

// ── Apps Script calls ─────────────────────────────────────────────────────
async function fetchBookedSlots(date: string): Promise<string[]> {
  if (!SHEETS_URL) {
    console.warn("[booking] SHEETS_WEBHOOK not set — using cache only");
    return slotCache[date] ?? [];
  }
  try {
    const url = `${SHEETS_URL}?action=slots&date=${encodeURIComponent(date)}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return slotCache[date] ?? [];
    const json = (await res.json()) as { success: boolean; booked?: string[]; error?: string };
    if (!json.success || !Array.isArray(json.booked)) return slotCache[date] ?? [];
    const keys = json.booked.map(labelToSlotKey).filter((k): k is string => k !== null);
    slotCache[date] = keys;
    return keys;
  } catch (err) {
    console.error("[booking] fetchBookedSlots error:", err);
    return slotCache[date] ?? [];
  }
}

async function writeBookingToSheet(payload: {
  id: string; name: string; phone: string; service: string;
  date: string; slot: string; childAge: string;
}): Promise<{ success: boolean; error?: string; message?: string }> {
  if (!SHEETS_URL) return { success: true };
  try {
    const params = new URLSearchParams({
      action: "book", id: payload.id, name: payload.name,
      phone: payload.phone, service: payload.service,
      date: payload.date, slot: payload.slot, childAge: payload.childAge,
    });
    const res = await fetch(`${SHEETS_URL}?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) return { success: false, error: `HTTP ${res.status}` };
    return (await res.json()) as { success: boolean; error?: string; message?: string };
  } catch (err) {
    console.error("[booking] writeBookingToSheet error:", err);
    return { success: false, error: String(err) };
  }
}

// ── Server Functions ──────────────────────────────────────────────────────
const dateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
});

export const getBookedSlots = createServerFn({ method: "GET" })
  .validator((d: unknown) => dateSchema.parse(d))
  .handler(async ({ data }) => {
    const booked = await fetchBookedSlots(data.date);
    return { booked };
  });

const createSchema = z.object({
  name:     z.string().min(2, "Name too short").max(80),
  phone:    z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  service:  z.string().min(2).max(80),
  date:     z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  slot:     z.string().min(3).max(10),
  childAge: z.string().max(30).default("—"),
});

export const createBooking = createServerFn({ method: "POST" })
  .validator((d: unknown) => createSchema.parse(d))
  .handler(async ({ data }) => {
    // Date validation — only today and tomorrow allowed
    const dt = new Date(data.date + "T00:00:00");
    if (Number.isNaN(dt.getTime())) throw new Error("Invalid date");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dt < today) throw new Error("Date must be today or tomorrow");
    if (dt > tomorrow) throw new Error("Bookings are only allowed for today and tomorrow");
    if (dt.getDay() === 0) throw new Error("Shop is closed on Sundays");

    // Double booking check — fresh from Sheet
    const takenSlots = await fetchBookedSlots(data.date);
    if (takenSlots.includes(data.slot)) {
      throw new Error("That slot was just booked. Please pick another time.");
    }

    // Reserve in cache immediately (race condition prevention)
    slotCache[data.date] = [...takenSlots, data.slot];

    // Generate booking ID
    const id = `BK-${Date.now().toString(36).toUpperCase().slice(-6)}`;

    // Write to Sheet
    const result = await writeBookingToSheet({
      id, name: data.name, phone: data.phone,
      service: data.service, date: data.date,
      slot: data.slot, childAge: data.childAge,
    });

    // Slot taken at sheet level (race condition)
    if (!result.success && result.error === "SLOT_TAKEN") {
      slotCache[data.date] = slotCache[data.date].filter((s) => s !== data.slot);
      throw new Error("That slot was just booked. Please pick another time.");
    }

    if (!result.success) {
      console.error("[booking] Sheet write failed:", result.error);
    }

    return {
      id,
      name:      data.name,
      phone:     data.phone,
      service:   data.service,
      date:      data.date,
      slot:      data.slot,
      slotLabel: formatSlotLabel(data.slot),
      amount:    200,
    };
  });