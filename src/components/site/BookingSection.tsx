import { useEffect, useMemo, useState } from "react";
import { useT } from "@/lib/i18n";
import { ALL_SLOTS, formatDateISO, formatSlot } from "@/lib/slots";
import { getBookedSlots, createBooking } from "@/lib/booking.functions";
import { useServerFn } from "@tanstack/react-start";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Lock, Loader2, ShieldCheck, Calendar as CalIcon, ChevronRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { SectionHeading } from "./SectionHeading";

const SERVICE = "Baby Ear Piercing";

export function BookingSection() {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const fetchBooked = useServerFn(getBookedSlots);
  const submit      = useServerFn(createBooking);

  const [step, setStep]         = useState<1 | 2 | 3>(1);
  const [date, setDate]         = useState<Date | undefined>(undefined);
  const [slot, setSlot]         = useState<string | null>(null);
  const [booked, setBooked]     = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [childAge, setChildAge] = useState("");
  const [loading, setLoading]   = useState(false);

  // Date limits — today and tomorrow only
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 1); // only today + 1 day
    return d;
  }, []);

  // Fetch booked slots whenever date changes
  useEffect(() => {
    if (!date) { setBooked([]); return; }

    const iso = formatDateISO(date);
    setLoadingSlots(true);
    setSlot(null); // reset selected slot when date changes

    fetchBooked({ data: { date: iso } })
      .then((r) => setBooked(r.booked))
      .catch(() => {
        setBooked([]);
        toast.error("Could not load slot availability. Please try again.");
      })
      .finally(() => setLoadingSlots(false));
  }, [date, fetchBooked]);

  // Date label (Malayalam or English)
  const dateLabel = date
    ? date.toLocaleDateString(lang === "ml" ? "ml-IN" : "en-IN", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "—";

  // Step navigation
  const goStep2 = () => {
    if (!date) { toast.error(t("pickDateFirst")); return; }
    if (!slot) { toast.error(t("pickSlotFirst")); return; }
    setStep(2);
  };

  const goStep3 = () => {
    if (name.trim().length < 2) {
      toast.error(t("fillDetails")); return;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number"); return;
    }
    if (!childAge.trim()) {
      toast.error(t("fillChildAge")); return;
    }
    setStep(3);
  };

  // Final payment + booking submit
  const handlePay = async () => {
    if (!date || !slot) return;
    setLoading(true);

    try {
      const res = await submit({
        data: {
          name:     name.trim(),
          phone,
          service:  SERVICE,
          date:     formatDateISO(date),
          slot,
          childAge: childAge.trim(),
        },
      });

      // Navigate to confirmation page with booking details
      navigate({
        to: "/confirmation",
        search: {
          id:      res.id,
          name:    res.name,
          phone:   res.phone,
          service: res.service,
          date:    res.date,
          slot:    res.slot,
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Booking failed. Please try again.";
      toast.error(msg);

      // If slot was just taken — go back to step 1 and refresh slots
      if (msg.toLowerCase().includes("slot")) {
        setSlot(null);
        setStep(1);
        // Refresh booked slots for the same date
        if (date) {
          fetchBooked({ data: { date: formatDateISO(date) } })
            .then((r) => setBooked(r.booked))
            .catch(() => {});
        }
      }

      setLoading(false);
    }
  };

  // Step badge component
  const StepBadge = ({ n, label, active }: { n: number; label: string; active: boolean }) => (
    <div className="flex min-w-0 items-center gap-2">
      <div
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold
          ${active
            ? "bg-primary text-primary-foreground"
            : "bg-rose-soft text-muted-foreground"}`}
      >
        {n}
      </div>
      <span className={`truncate text-sm ${active ? "text-foreground" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );

  return (
    <section id="book" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>{t("bookYourAppointment")}</SectionHeading>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-[1.6fr_1fr]">

          {/* ── Booking Wizard ─────────────────────────────────────── */}
          <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-7">

            {/* Stepper */}
            <div className="grid grid-cols-3 items-center gap-2 rounded-full bg-rose-soft/50 p-2 sm:gap-4">
              <StepBadge n={1} label={t("selectDateTime")} active={step >= 1} />
              <StepBadge n={2} label={t("yourDetails")}   active={step >= 2} />
              <StepBadge n={3} label={t("confirmPay")}    active={step >= 3} />
            </div>

            {/* ── Step 1: Date + Slot ───────────────────────────────── */}
            {step === 1 && (
              <div className="mt-6 grid gap-6 md:grid-cols-[auto_1fr]">
                {/* Calendar */}
                <div className="rounded-2xl border border-border bg-background p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => { setDate(d); setSlot(null); }}
                    disabled={(d) => d < today || d > maxDate || d.getDay() === 0}
                    className="pointer-events-auto"
                  />
                </div>

                {/* Slot grid */}
                <div>
                  <div className="mb-3 text-sm font-medium">
                    {t("availableSlots")}
                    {loadingSlots && (
                      <Loader2 className="ml-2 inline h-3.5 w-3.5 animate-spin text-muted-foreground" />
                    )}
                  </div>

                  {!date && (
                    <p className="text-sm text-muted-foreground">{t("pickDateFirst")}</p>
                  )}

                  {date && (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {ALL_SLOTS.map((s) => {
                        const isBooked   = booked.includes(s);
                        const isSelected = slot === s;
                        return (
                          <button
                            key={s}
                            disabled={isBooked || loadingSlots}
                            onClick={() => setSlot(s)}
                            className={[
                              "h-12 rounded-xl border text-sm font-medium transition-all",
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                                : isBooked
                                  ? "cursor-not-allowed border-border bg-muted text-muted-foreground/60 line-through"
                                  : loadingSlots
                                    ? "cursor-wait border-border bg-muted/50 text-muted-foreground/50"
                                    : "border-border bg-background hover:border-primary hover:bg-rose-soft",
                            ].join(" ")}
                          >
                            {formatSlot(s)}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Legend */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-success" />
                      {t("available")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                      {t("selected")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                      {t("booked")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Customer Details ──────────────────────────── */}
            {step === 2 && (
              <div className="mt-6 max-w-md space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">{t("fullName")}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl"
                    placeholder="Anjali Menon"
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">{t("phoneNumber")}</Label>
                  <Input
                    id="phone"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="h-12 rounded-xl"
                    placeholder="9876543210"
                    autoComplete="tel"
                  />
                  <p className="text-xs text-muted-foreground">10-digit number without +91</p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="childAge">{t("childAge")}</Label>
                  <Input
                    id="childAge"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="h-12 rounded-xl"
                    placeholder={t("childAgePlaceholder")}
                  />
                  <p className="text-xs text-muted-foreground">{t("childAgeHint")}</p>
                </div>
              </div>
            )}

            {/* ── Step 3: Confirm + Pay ─────────────────────────────── */}
            {step === 3 && (
              <div className="mt-6 rounded-2xl border border-border bg-rose-soft/30 p-5">
                <div className="font-display text-2xl">{t("confirmPay")}</div>
                <p className="mt-1 text-sm text-muted-foreground">{t("secureBooking")}</p>

                <ul className="mt-4 space-y-1.5 text-sm">
                  {[
                    [t("fullName"),    name],
                    [t("phoneNumber"), `+91 ${phone}`],
                    [t("childAge"),    childAge],
                    [t("date"),        dateLabel],
                    [t("time"),        slot ? formatSlot(slot) : "—"],
                    [t("service"),     SERVICE],
                  ].map(([label, value]) => (
                    <li key={label} className="flex justify-between">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{value}</span>
                    </li>
                  ))}
                  <li className="mt-2 flex justify-between border-t border-border pt-2">
                    <span>{t("advancePayable")}</span>
                    <span className="font-display text-xl text-primary">₹200</span>
                  </li>
                </ul>
              </div>
            )}

            {/* ── Navigation Buttons ────────────────────────────────── */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              {step > 1 ? (
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                  disabled={loading}
                >
                  {t("back")}
                </Button>
              ) : <span />}

              {step === 1 && (
                <Button
                  onClick={goStep2}
                  className="h-12 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                >
                  {t("nextDetails")} <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
              {step === 2 && (
                <Button
                  onClick={goStep3}
                  className="h-12 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                >
                  {t("reviewBooking")} <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
              {step === 3 && (
                <Button
                  onClick={handlePay}
                  disabled={loading}
                  className="h-12 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("processing")}
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      {t("payAdvance")}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* ── Summary Card ─────────────────────────────────────────── */}
          <aside className="h-fit rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalIcon className="h-4 w-4 text-primary" />
              {t("yourBooking")}
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">{t("date")}</dt>
                <dd className="font-medium">{dateLabel}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">{t("time")}</dt>
                <dd className="font-medium">{slot ? formatSlot(slot) : "—"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">{t("service")}</dt>
                <dd className="font-medium">{SERVICE}</dd>
              </div>
              <div className="my-3 border-t border-border" />
              <div className="flex items-center justify-between">
                <dt>{t("advancePayable")}</dt>
                <dd className="font-display text-2xl text-primary">₹200</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center justify-center gap-1.5 rounded-full bg-rose-soft/50 px-3 py-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              {t("secureBooking")}
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-2xl bg-rose-soft/30 p-3 text-xs text-muted-foreground">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span>
                Booking confirmed instantly. Shop owner will be notified on WhatsApp.
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
