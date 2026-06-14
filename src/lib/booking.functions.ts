import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ---------------------------------------------------------------------------
// TODO: Replace these in-memory stubs with your own backend/database calls.
// ---------------------------------------------------------------------------

// Simple in-memory store for demo purposes — does NOT persist across restarts.
const bookedSlots: Record<string, string[]> = {};

const dateSchema = z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) });

export const getBookedSlots = createServerFn({ method: "GET" })
  .validator((d: unknown) => dateSchema.parse(d))
  .handler(async ({ data }) => {
    return { booked: bookedSlots[data.date] ?? [] };
  });

const createSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().regex(/^\d{10}$/),
  service: z.string().min(2).max(80),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slot: z.string().min(3).max(10),
});

export const createBooking = createServerFn({ method: "POST" })
  .validator((d: unknown) => createSchema.parse(d))
  .handler(async ({ data }) => {
    // Block past dates & Sundays server-side
    const dt = new Date(data.date + "T00:00:00");
    if (Number.isNaN(dt.getTime())) throw new Error("Invalid date");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dt < today) throw new Error("Date must be in the future");
    if (dt.getDay() === 0) throw new Error("We are closed on Sundays");

    // Check slot availability
    const taken = bookedSlots[data.date] ?? [];
    if (taken.includes(data.slot)) {
      throw new Error("That slot was just booked. Please pick another.");
    }

    // Reserve the slot
    bookedSlots[data.date] = [...taken, data.slot];

    const id = `BK-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    return { id, ...data, amount: 200 };
  });
