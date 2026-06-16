import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect, useCallback } from "react";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Check,
  MessageCircle,
  Heart,
  Home as HomeIcon,
  Download,
} from "lucide-react";
import { formatSlot } from "@/lib/slots";

const searchSchema = z.object({
  id:      z.string(),
  name:    z.string(),
  phone:   z.string(),
  service: z.string(),
  date:    z.string(),
  slot:    z.string(),
});

export const Route = createFileRoute("/confirmation")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Booking Confirmed — Piercing by Tattoo Kid" }] }),
  component: Confirmation,
});

const OWNER_WHATSAPP = "919322520682";

function Confirmation() {
  const { t, lang } = useT();
  const s = Route.useSearch();

  const dateLabel = new Date(s.date + "T00:00:00").toLocaleDateString(
    lang === "ml" ? "ml-IN" : "en-IN",
    { day: "numeric", month: "long", year: "numeric" },
  );

  const slotLabel = formatSlot(s.slot);

  const customerMsg = `Hi ${s.name}, your booking ${s.id} at Piercing by Tattoo Kid is confirmed for ${dateLabel} at ${slotLabel}. ₹200 advance paid. See you soon! 💕`;
  const ownerMsg    = `New booking ${s.id}: ${s.name} (+91 ${s.phone}) — ${s.service} on ${dateLabel} at ${slotLabel}. ₹200 paid.`;

  const custDigits = s.phone.replace(/\D/g, "");
  const custWa     = `https://wa.me/91${custDigits}?text=${encodeURIComponent(customerMsg)}`;
  const ownerWa    = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(ownerMsg)}`;

  // Auto notify owner once
  useEffect(() => {
    const tm = setTimeout(() => {
      try { window.open(ownerWa, "_blank", "noopener,noreferrer"); } catch { /* ignore */ }
    }, 600);
    return () => clearTimeout(tm);
  }, [ownerWa]);

  // Download receipt as PDF using jsPDF
  const downloadReceipt = useCallback(async () => {
    // Dynamically import jsPDF — avoids SSR issues
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    const pink    = [236, 106, 133] as const;
    const dark    = [30,  30,  30]  as const;
    const muted   = [100, 100, 100] as const;
    const white   = [255, 255, 255] as const;
    const lightPk = [253, 240, 243] as const;

    // ── Header bar ───────────────────────────────────────────────────────────
    doc.setFillColor(...pink);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(...white);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Baby Piercing & Tattoo Studio", 105, 13, { align: "center" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Kerala, India  |  +91 9322520682  |  piercingbytattookid.netlify.app", 105, 21, { align: "center" });

    // ── Confirmed badge ───────────────────────────────────────────────────────
    doc.setFillColor(...lightPk);
    doc.roundedRect(15, 36, 180, 16, 4, 4, "F");
    doc.setTextColor(...pink);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("✓  Booking Confirmed!", 105, 47, { align: "center" });

    // ── Booking ID ────────────────────────────────────────────────────────────
    doc.setTextColor(...muted);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("BOOKING ID", 105, 60, { align: "center" });
    doc.setTextColor(...pink);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(s.id, 105, 68, { align: "center" });

    // ── Details table ─────────────────────────────────────────────────────────
    const rows = [
      ["Customer Name",  s.name],
      ["Phone Number",   `+91 ${s.phone}`],
      ["Service",        s.service],
      ["Date",           dateLabel],
      ["Time Slot",      slotLabel],
      ["Advance Paid",   "\u20B9200"],
      ["Payment Status", "Paid \u2713"],
      ["Payment Method", "Online / UPI"],
    ];

    let y = 78;
    doc.setFontSize(10);

    rows.forEach(([label, value], i) => {
      // Alternating row background
      if (i % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(15, y - 4, 180, 10, "F");
      }
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...muted);
      doc.text(label, 20, y + 2);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text(value, 130, y + 2);

      y += 10;
    });

    // ── Divider ───────────────────────────────────────────────────────────────
    y += 4;
    doc.setDrawColor(...pink);
    doc.setLineWidth(0.5);
    doc.line(15, y, 195, y);

    // ── Thank you message ─────────────────────────────────────────────────────
    y += 10;
    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Thank you for choosing us!", 105, y, { align: "center" });

    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text(
      "Please arrive 5 minutes before your appointment.",
      105, y, { align: "center" }
    );

    y += 5;
    doc.text(
      "Bring this receipt or your booking ID when you visit.",
      105, y, { align: "center" }
    );

    // Malayalam thank you
    y += 8;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(...pink);
    doc.text(
      "Piercing by Tattoo Kid - njanngal ninne svagatikkunnu!",
      105, y, { align: "center" }
    );

    // ── Footer ────────────────────────────────────────────────────────────────
    doc.setFillColor(...pink);
    doc.rect(0, 275, 210, 22, "F");
    doc.setTextColor(...white);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Baby Piercing & Tattoo Studio, Kerala", 105, 283, { align: "center" });
    doc.text("+91 9322520682  |  Mon–Sun: 10:00 AM – 7:00 PM", 105, 290, { align: "center" });

    doc.save(`Receipt-${s.id}.pdf`);
  }, [s, dateLabel, slotLabel]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl bg-card p-8 text-center shadow-[var(--shadow-soft)]">

        {/* Check icon */}
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-rose-soft">
          <Check className="h-10 w-10 text-primary" strokeWidth={3} />
        </div>

        <h1 className="mt-6 font-display text-4xl">{t("bookingConfirmed")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("bookingConfirmedSub")}</p>

        {/* Booking details */}
        <dl className="mt-8 grid gap-2.5 rounded-2xl bg-rose-soft/40 p-5 text-left text-sm">
          <Row label={t("bookingId")}    value={<span className="font-mono font-semibold text-primary">{s.id}</span>} />
          <Row label={t("fullName")}     value={s.name} />
          <Row label={t("phoneNumber")}  value={`+91 ${s.phone}`} />
          <Row label={t("service")}      value={s.service} />
          <Row label={t("date")}         value={dateLabel} />
          <Row label={t("time")}         value={slotLabel} />
          <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
            <dt>{t("amountPaid")}</dt>
            <dd className="font-display text-xl text-primary">₹200</dd>
          </div>
        </dl>

        {/* Action buttons */}
        <div className="mt-6 grid gap-2">
          {/* Download Receipt */}
          <Button
            onClick={downloadReceipt}
            className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Receipt (PDF)
          </Button>

          {/* WhatsApp customer */}
          <Button
            asChild
            className="h-12 rounded-full bg-[#25D366] px-6 text-white hover:bg-[#1ebe57]"
          >
            <a href={custWa} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              {t("openWhatsApp")}
            </a>
          </Button>

          {/* Notify owner */}
          <Button asChild variant="outline" className="h-11 rounded-full">
            <a href={ownerWa} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              {t("notifyOwner")}
            </a>
          </Button>

          {/* Back home */}
          <Button asChild variant="ghost" className="h-11 rounded-full">
            <Link to="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              {t("backToHome")}
            </Link>
          </Button>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Heart className="h-3 w-3 fill-primary text-primary" />
          {t("thankYou")}
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-right">{value}</dd>
    </div>
  );
}
