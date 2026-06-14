import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Check, MessageCircle, Heart, Home as HomeIcon } from "lucide-react";
import { formatSlot } from "@/lib/slots";

const searchSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  service: z.string(),
  date: z.string(),
  slot: z.string(),
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

  const customerMsg = `Hi ${s.name}, your booking ${s.id} at Piercing by Tattoo Kid is confirmed for ${dateLabel} at ${formatSlot(s.slot)}. ₹200 advance paid. See you soon! 💕`;
  const ownerMsg = `New booking ${s.id}: ${s.name} (+91 ${s.phone}) — ${s.service} on ${dateLabel} at ${formatSlot(s.slot)}. ₹200 paid.`;

  // sanitize phone (strip non-digits, ensure country code)
  const custDigits = s.phone.replace(/\D/g, "");
  const custWa = `https://wa.me/91${custDigits}?text=${encodeURIComponent(customerMsg)}`;
  const ownerWa = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(ownerMsg)}`;

  useEffect(() => {
    // Auto-fire owner notification in background tab (best-effort; popup blockers may stop this)
    const tm = setTimeout(() => {
      try {
        window.open(ownerWa, "_blank", "noopener,noreferrer");
      } catch {
        /* ignore */
      }
    }, 600);
    return () => clearTimeout(tm);
  }, [ownerWa]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl bg-card p-8 text-center shadow-[var(--shadow-soft)]">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-rose-soft">
          <Check className="h-10 w-10 text-primary" strokeWidth={3} />
        </div>
        <h1 className="mt-6 font-display text-4xl">{t("bookingConfirmed")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("bookingConfirmedSub")}</p>

        <dl className="mt-8 grid gap-2.5 rounded-2xl bg-rose-soft/40 p-5 text-left text-sm">
          <Row
            label={t("bookingId")}
            value={<span className="font-mono font-semibold text-primary">{s.id}</span>}
          />
          <Row label={t("fullName")} value={s.name} />
          <Row label={t("phoneNumber")} value={`+91 ${s.phone}`} />
          <Row label={t("service")} value={s.service} />
          <Row label={t("date")} value={dateLabel} />
          <Row label={t("time")} value={formatSlot(s.slot)} />
          <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
            <dt>{t("amountPaid")}</dt>
            <dd className="font-display text-xl text-primary">₹200</dd>
          </div>
        </dl>

        <div className="mt-6 grid gap-2">
          <Button
            asChild
            className="h-12 rounded-full bg-[#25D366] px-6 text-white hover:bg-[#1ebe57]"
          >
            <a href={custWa} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              {t("openWhatsApp")}
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-full">
            <a href={ownerWa} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              {t("notifyOwner")}
            </a>
          </Button>
          <Button asChild variant="ghost" className="h-11 rounded-full">
            <Link to="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              {t("backToHome")}
            </Link>
          </Button>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Heart className="h-3 w-3 fill-primary text-primary" /> {t("thankYou")}
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
