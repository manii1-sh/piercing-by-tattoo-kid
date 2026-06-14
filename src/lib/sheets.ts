// ---------------------------------------------------------------------------
// Google Apps Script Web App integration
// Writes booking data directly to your Google Sheet — no backend needed.
// ---------------------------------------------------------------------------

const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK as string | undefined;

export interface SheetBookingPayload {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string; // "YYYY-MM-DD"
  slot: string;
  notes?: string;
  childAge?: string;
}

/**
 * Appends a booking row to the Google Sheet via Apps Script web app.
 * Fails silently — booking is already confirmed, sheet write is best-effort.
 */
export async function appendBookingToSheet(payload: SheetBookingPayload): Promise<void> {
  if (!WEBHOOK_URL) {
    console.warn("[sheets] VITE_SHEETS_WEBHOOK not set — skipping sheet write");
    return;
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      // Apps Script requires text/plain for doPost to receive postData.contents
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!json.success) {
      console.error("[sheets] Apps Script returned error:", json.error);
    }
  } catch (err) {
    // Never block the booking confirmation if the sheet call fails
    console.error("[sheets] Failed to write to Google Sheet:", err);
  }
}

/**
 * Fetches booked slots for a given date from the Google Sheet.
 * Returns empty array on any failure.
 * The sheet stores formatted labels like "2:30 PM – 3:00 PM",
 * so we convert them back to raw keys like "14:30" for the UI.
 */
export async function getBookedSlotsFromSheet(date: string): Promise<string[]> {
  if (!WEBHOOK_URL) return [];

  try {
    const url = `${WEBHOOK_URL}?date=${encodeURIComponent(date)}`;
    const res = await fetch(url);
    const json = await res.json();
    if (!Array.isArray(json.booked)) return [];

    // Convert labels back to raw slot keys by reverse-matching
    return json.booked
      .map((label: string) => labelToSlotKey(label))
      .filter(Boolean) as string[];
  } catch {
    return [];
  }
}

/**
 * Converts a formatted slot label "2:30 PM – 3:00 PM" back to raw key "14:30"
 */
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
