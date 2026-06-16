import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ShieldCheck, Heart, Sparkles, Calendar, HelpCircle, ArrowRight, UserCheck, Flame } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works: Safe & Sterile Process — Piercing by Tattoo Kid" },
      { name: "description", content: "Understand our step-by-step safe piercing process. From autoclaved single-use equipment to specialized infant techniques." },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  const { t } = useT();

  const steps = [
    {
      num: "01",
      icon: Calendar,
      title: t("step1Title"),
      desc: t("step1Desc"),
      details: "Select your preferred date, time, and specific piercing style using our simplified online slot booking system.",
    },
    {
      num: "02",
      icon: UserCheck,
      title: t("step2Title"),
      desc: t("step2Desc"),
      details: "Arrive at our clinical-grade, kid-friendly studio space. We provide a soothing, playful environment to relax the little ones.",
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: t("step3Title"),
      desc: t("step3Desc"),
      details: "The procedure is carried out in seconds by certified specialists using 100% sterile, single-use vacuum-sealed needles.",
    },
    {
      num: "04",
      icon: Heart,
      title: t("step4Title"),
      desc: t("step4Desc"),
      details: "Receive a personalized aftercare guide sheet and clean solution. Celebrate the happy moment with a tiny smile!",
    },
  ];

  const safetyProtocols = [
    {
      icon: Flame,
      title: "Autoclave Sterilization",
      desc: "All metal jewelry and operational accessories undergo dry/steam autoclave cycles to eradicate all micro-agents.",
    },
    {
      icon: ShieldCheck,
      title: "Safe Needle & Cannula Methods Only",
      desc: "We never reuse needles or equipment. We only use professional TN needle or Cannula methods (strictly no gunshot piercings).",
    },
    {
      icon: Sparkles,
      title: "Titanium & Surgical Steel Only",
      desc: "We insert high-quality, bio-compatible Titanium (ASTM F-136) and Surgical Steel body-safe jewelry to prevent skin allergies (no gold jewelry available).",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 relative overflow-hidden bg-gradient-to-b from-[#fdf0f3] via-[#fff8f9] to-[#fdf0f3] py-16 sm:py-24">
        {/* Background glows */}
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl pointer-events-none animate-pulse duration-[10000ms]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary shadow-sm">
              <HelpCircle className="h-3.5 w-3.5 text-primary" /> Gentle Process
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl text-ink">
              Safe &amp; Sterile <span className="italic text-primary">How It Works</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We design every step of the journey to be stress-free, gentle, and strictly clinical. Review our approach and hygiene standards below.
            </p>
          </div>

          {/* Methods and Materials Notice Alert */}
          <div className="mt-8 max-w-2xl mx-auto rounded-2xl bg-amber-50/80 border border-amber-200/60 p-4 text-amber-900 text-xs flex flex-col gap-1.5 shadow-sm text-center">
            <div className="font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 text-amber-800">
              <ShieldCheck className="h-4 w-4" /> Studio Policy &amp; Safety Notice
            </div>
            <p className="leading-relaxed">
              We do <strong>not</strong> provide gunshot piercings under any circumstances. We exclusively practice <strong>TN Needle or Cannula</strong> piercing methods. Additionally, we do <strong>not</strong> offer gold jewelry; we insert only premium, body-safe <strong>Titanium and Surgical Steel</strong> jewelry.
            </p>
          </div>

          {/* ── SECTION 1: Steps ── */}
          <div className="mt-16">
            <SectionHeading>The 4 Simple Steps</SectionHeading>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className="group relative rounded-[32px] border border-primary/5 bg-white/60 backdrop-blur-md p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-extrabold text-primary/20 group-hover:text-primary/30 transition-colors">
                      {s.num}
                    </span>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-soft text-primary shadow-inner">
                      <s.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-ink leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground font-semibold leading-relaxed">
                    {s.desc}
                  </p>
                  <p className="mt-4 text-xs text-foreground/75 leading-relaxed">
                    {s.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 2: Hygiene Standards ── */}
          <div className="mt-24 rounded-[32px] bg-white border border-primary/10 p-8 sm:p-12 shadow-xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] items-center">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" /> Sterile Guarantee
                </span>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-ink">
                  Safety is not an option. <span className="italic text-primary">It's our promise.</span>
                </h2>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  We maintain hospital-level hygiene protocols. Every instrument, needle, earring, and glove is autoclaved or disposed of right after the procedure.
                </p>
              </div>

              <div className="space-y-6">
                {safetyProtocols.map((p) => (
                  <div key={p.title} className="flex gap-4 items-start">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary/20 bg-rose-50/50 text-primary shadow-inner">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold text-ink">{p.title}</h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SECTION 3: Aftercare Guidelines ── */}
          <div className="mt-24 grid gap-12 lg:grid-cols-2 items-stretch">
            <div className="rounded-[32px] bg-white/40 border border-primary/5 backdrop-blur-sm p-8 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">
                  Infant Ear Piercing Aftercare
                </h3>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Infant ears heal rapidly but require clean daily maintenance:
                </p>
                <ul className="mt-6 space-y-3.5 text-xs text-foreground/80 leading-relaxed list-disc list-inside">
                  <li>Leave starter studs inside the ears for at least 6-8 weeks without removal.</li>
                  <li>Clean the area twice daily using a saline solution with clean cotton.</li>
                  <li>Slightly rotate the studs during cleaning to keep the piercing open and flexible.</li>
                  <li>Keep hair, soaps, and perfumes away from the healing ears.</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[32px] bg-white/40 border border-primary/5 backdrop-blur-sm p-8 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">
                  Nose &amp; Cartilage Aftercare
                </h3>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Cartilage and nose regions require extended care due to reduced blood circulation:
                </p>
                <ul className="mt-6 space-y-3.5 text-xs text-foreground/80 leading-relaxed list-disc list-inside">
                  <li>Healing times vary between 3 to 9 months depending on the exact location.</li>
                  <li>Spray saline aftercare spray directly onto the spot twice daily.</li>
                  <li>Avoid sleeping directly on the pierced ear; use travel pillows instead.</li>
                  <li>Do not touch, rotate, or play with the jewelry to prevent scar tissue formation.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
