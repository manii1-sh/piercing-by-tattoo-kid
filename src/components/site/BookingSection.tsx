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
  const submit = useServerFn(createBooking);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [childAge, setChildAge] = useState("");
  const [loading, setLoading] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d;
  }, []);

  useEffect(() => {
    if (!date) {
      setBooked([]);
      return;
    }
    const iso = formatDateISO(date);
    fetchBooked({ data: { date: iso } })
      .then((r) => setBooked(r.booked))
      .catch(() => setBooked([]));
  }, [date, fetchBooked]);

  const dateLabel = date
    ? date.toLocaleDateString(lang === "ml" ? "ml-IN" : "en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const goStep2 = () => {
    if (!date || !slot) {
      toast.error(t("pickDateFirst"));
      return;
    }
    setStep(2);
  };
  const goStep3 = () => {
    if (name.trim().length < 2 || !/^\d{10}$/.test(phone)) {
      toast.error(t("fillDetails"));
      return;
    }
    if (!childAge.trim()) {
      toast.error(t("fillChildAge"));
      return;
    }
    setStep(3);
  };

  const handlePay = async () => {
    if (!date || !slot) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    try {
      const res = await submit({
        data: {
          name: name.trim(),
          phone,
          service: SERVICE,
          date: formatDateISO(date),
          slot,
          childAge: childAge.trim(),
        },
      });
      const search = {
        id: res.id,
        name: name.trim(),
        phone,
        service: SERVICE,
        date: formatDateISO(date),
        slot,
      };
      navigate({ to: "/confirmation", search });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Booking failed");
      setLoading(false);
    }
  };

  const StepBadge = ({ n, label, active }: { n: number; label: string; active: boolean }) => (
    <div className="flex min-w-0 items-center gap-2">
      <div
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${active ? "bg-primary text-primary-foreground" : "bg-rose-soft text-muted-foreground"}`}
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
          {/* Wizard */}
          <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-7">
            {/* Stepper */}
            <div className="grid grid-cols-3 items-center gap-2 rounded-full bg-rose-soft/50 p-2 sm:gap-4">
              <StepBadge n={1} label={t("selectDateTime")} active={step >= 1} />
              <StepBadge n={2} label={t("yourDetails")} active={step >= 2} />
              <StepBadge n={3} label={t("confirmPay")} active={step >= 3} />
            </div>

            {step === 1 && (
              <div className="mt-6 grid gap-6 md:grid-cols-[auto_1fr]">
                <div className="rounded-2xl border border-border bg-background p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      setSlot(null);
                    }}
                    disabled={(d) => d < today || d > maxDate || d.getDay() === 0}
                    className="pointer-events-auto"
                  />
                </div>
                <div>
                  <div className="mb-3 text-sm font-medium">{t("availableSlots")}</div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {ALL_SLOTS.map((s) => {
                      const isBooked = booked.includes(s);
                      const isSelected = slot === s;
                      return (
                        <button
                          key={s}
                          disabled={!date || isBooked}
                          onClick={() => setSlot(s)}
                          className={[
                            "h-12 rounded-xl border text-sm font-medium transition-all",
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                              : isBooked
                                ? "cursor-not-allowed border-border bg-muted text-muted-foreground/60 line-through"
                                : date
                                  ? "border-border bg-background hover:border-primary hover:bg-rose-soft"
                                  : "cursor-not-allowed border-border bg-muted/50 text-muted-foreground/50",
                          ].join(" ")}
                        >
                          {formatSlot(s)}
                        </button>
                      );
                    })}
                  </div>
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

            {step === 2 && (
              <div className="mt-6 space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <Label htmlFor="name">{t("fullName")}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl"
                    placeholder="Anjali Menon"
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
                  />
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

            {step === 3 && (
              <div className="mt-6 rounded-2xl border border-border bg-rose-soft/30 p-5">
                <div className="font-display text-2xl">{t("confirmPay")}</div>
                <p className="mt-1 text-sm text-muted-foreground">{t("secureBooking")}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t("fullName")}</span>
                    <span className="font-medium">{name}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t("phoneNumber")}</span>
                    <span className="font-medium">+91 {phone}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t("childAge")}</span>
                    <span className="font-medium">{childAge}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t("date")}</span>
                    <span className="font-medium">{dateLabel}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t("time")}</span>
                    <span className="font-medium">{slot && formatSlot(slot)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t("service")}</span>
                    <span className="font-medium">{SERVICE}</span>
                  </li>
                  <li className="mt-2 flex justify-between border-t border-border pt-2">
                    <span>{t("advancePayable")}</span>
                    <span className="font-display text-xl text-primary">₹200</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              {step > 1 ? (
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                  disabled={loading}
                >
                  {t("back")}
                </Button>
              ) : (
                <span />
              )}
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
                  {t("confirmPay")} <ChevronRight className="ml-1 h-4 w-4" />
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

          {/* Summary card */}
          <aside className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] h-fit">
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
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> {t("secureBooking")}
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-2xl bg-rose-soft/30 p-3 text-xs text-muted-foreground">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span>
                After payment, a WhatsApp confirmation will be sent to your number automatically.
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
