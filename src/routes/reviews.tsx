import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Star, Sparkles, Instagram } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Parent Reviews & Testimonials — Piercing by Tattoo Kid" },
      { name: "description", content: "Read reviews from families who trusted us with their children's piercings. Clean, sterile, and pain-free experience." },
    ],
  }),
  component: ReviewsPage,
});

interface Review {
  name: string;
  locationEn: string;
  locationMl: string;
  textEn: string;
  textMl: string;
  stars: number;
}

const defaultReviews: Review[] = [
  {
    name: "Anjali Menon",
    locationEn: "Thrissur",
    locationMl: "തൃശ്ശൂർ",
    textEn: "So gentle with my daughter. The studio is spotless and the staff knew exactly how to keep her calm.",
    textMl: "എന്റെ മകളോട് വളരെ മൃദുവായി പെരുമാറി. സ്റ്റുഡിയോ വളരെ വൃത്തിയുള്ളതാണ്, കൂടാതെ അവളെ എങ്ങനെ ശാന്തയാക്കണമെന്ന് ജീവനക്കാർക്ക് കൃത്യമായി അറിയാമായിരുന്നു.",
    stars: 5,
  },
  {
    name: "Rahul Pillai",
    locationEn: "Ernakulam",
    locationMl: "എറണാകുളം",
    textEn: "Booked online in 2 minutes. Got my son's ears pierced — quick, painless, and beautifully done.",
    textMl: "2 മിനിറ്റിനുള്ളിൽ ഓൺലൈനായി ബുക്ക് ചെയ്തു. എന്റെ മകന്റെ കാത് കുത്തിച്ചു — വേഗത്തിലും, വേദനയില്ലാതെയും, മനോഹരമായും ചെയ്തു.",
    stars: 5,
  },
  {
    name: "Lakshmi Nair",
    locationEn: "Kozhikode",
    locationMl: "കോഴിക്കോട്",
    textEn: "Trusted by our whole family. Hygiene and care here are unmatched in Kerala.",
    textMl: "ഞങ്ങളുടെ കുടുംബം മുഴുവൻ വിശ്വസിക്കുന്നു. ശുചിത്വവും പരിചരണവും കേരളത്തിൽ മറ്റെവിടെയും ലഭിക്കാത്തതാണ്.",
    stars: 5,
  },
  {
    name: "Divya Krishnan",
    locationEn: "Palakkad",
    locationMl: "പാലക്കാട്",
    textEn: "My baby didn't even cry! The artist was so experienced and caring. Highly recommended.",
    textMl: "എന്റെ കുഞ്ഞ് കരഞ്ഞതേയില്ല! ആർട്ടിസ്റ്റ് വളരെ പരിചയസമ്പന്നനും കരുതലുള്ളവനുമായിരുന്നു. ശക്തമായി ശുപാർശ ചെയ്യുന്നു.",
    stars: 5,
  },
  {
    name: "Sreeja Thomas",
    locationEn: "Kottayam",
    locationMl: "കോട്ടയം",
    textEn: "Online booking was super easy. Clean studio, friendly staff, and my baby's ears look adorable!",
    textMl: "ഓൺലൈൻ ബുക്കിംഗ് വളരെ എളുപ്പമായിരുന്നു. വൃത്തിയുള്ള സ്റ്റുഡിയോ, സൗഹൃദപരമായ ജീവനക്കാർ, എന്റെ കുഞ്ഞിന്റെ കാതുകൾ കാണാൻ നല്ല ഭംഗിയുണ്ട്!",
    stars: 5,
  },
  {
    name: "Priya Suresh",
    locationEn: "Kannur",
    locationMl: "കണ്ണൂർ",
    textEn: "We came from 3 hours away and it was absolutely worth it. Professional, hygienic, and loving.",
    textMl: "ഞങ്ങൾ 3 മണിക്കൂർ ദൂരെ നിന്നാണ് വന്നത്, അത് തികച്ചും സഫലമായി. പ്രൊഫഷണൽ, ശുചിത്വമുള്ള, സ്നേഹനിർഭരമായ സേവനം.",
    stars: 5,
  },
  {
    name: "Meera Gopinath",
    locationEn: "Alappuzha",
    locationMl: "ആലപ്പുഴ",
    textEn: "The gold studs they use are of amazing quality. My baby's ears healed perfectly with zero issues.",
    textMl: "അവർ ഉപയോഗിക്കുന്ന കാതുകുത്ത് സ്റ്റഡുകൾ മികച്ച ഗുണനിലവാരമുള്ളതാണ്. എന്റെ കുഞ്ഞിന്റെ കാതുകൾ യാതൊരു പ്രശ്നവുമില്ലാതെ തികച്ചും സുഖപ്പെട്ടു.",
    stars: 5,
  },
  {
    name: "Rini Varghese",
    locationEn: "Thrissur",
    locationMl: "തൃശ്ശൂർ",
    textEn: "WhatsApp confirmation was instant. The whole process from booking to piercing was seamless.",
    textMl: "വാട്ട്‌സ്ആപ്പ് സ്ഥിരീകരണം ഉടനടി ലഭിച്ചു. ബുക്കിംഗ് മുതൽ പിയേഴ്സിംഗ് വരെയുള്ള മുഴുവൻ പ്രക്രിയയും വളരെ എളുപ്പമായിരുന്നു.",
    stars: 5,
  },
];

function ReviewsPage() {
  const { lang, t } = useT();

  // Row 1 = first 4, Row 2 = last 4 (doubled for seamless loop)
  const row1 = [...defaultReviews.slice(0, 4), ...defaultReviews.slice(0, 4)];
  const row2 = [...defaultReviews.slice(4),    ...defaultReviews.slice(4)];

  const ReviewCard = ({ r }: { r: typeof defaultReviews[0] }) => (
    <div className="w-72 shrink-0 rounded-2xl bg-card p-5 shadow-[var(--shadow-card)] border border-border/40 text-left">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: r.stars }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
        ))}
      </div>
      {/* Text */}
      <p className="mt-3 text-sm leading-relaxed text-foreground/75">
        "{lang === "ml" ? r.textMl : r.textEn}"
      </p>
      {/* Author */}
      <div className="mt-4 flex items-center gap-2.5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-rose-soft text-sm font-bold text-primary">
          {r.name[0]}
        </div>
        <div>
          <div className="text-sm font-semibold">{r.name}</div>
          <div className="text-xs text-muted-foreground">
            {lang === "ml" ? r.locationMl : r.locationEn}, {lang === "ml" ? "കേരളം" : "Kerala"}
          </div>
        </div>
        {/* Instagram badge */}
        <div className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-white shadow-sm text-pink-600"><Instagram className="h-4 w-4" /></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 relative overflow-hidden bg-gradient-to-b from-[#fdf0f3] via-[#fff8f9] to-[#fdf0f3] py-16 sm:py-24">
        {/* Background glows */}
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl pointer-events-none animate-pulse duration-[10000ms]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          
          {/* Header */}
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> {t("parentReviews")}
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl text-ink">
              {lang === "ml" ? (
                t("reviewsTitle")
              ) : (
                <>
                  What Parents <span className="italic text-primary">Are Saying</span>
                </>
              )}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {t("reviewsSubtitle")}
            </p>
          </div>
        </div>

        {/* Marquee list */}
        <div className="mt-12 overflow-hidden">
          {/* Row 1 — scrolls left */}
          <div
            className="flex gap-4"
            onMouseEnter={(e) => {
              const el = e.currentTarget.querySelector<HTMLElement>(".marquee-r1");
              if (el) el.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget.querySelector<HTMLElement>(".marquee-r1");
              if (el) el.style.animationPlayState = "running";
            }}
          >
            <div className="marquee-r1 flex shrink-0 gap-4 animate-marquee">
              {row1.map((r, i) => <ReviewCard key={i} r={r} />)}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div
            className="mt-4 flex gap-4"
            onMouseEnter={(e) => {
              const el = e.currentTarget.querySelector<HTMLElement>(".marquee-r2");
              if (el) el.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget.querySelector<HTMLElement>(".marquee-r2");
              if (el) el.style.animationPlayState = "running";
            }}
          >
            <div className="marquee-r2 flex shrink-0 gap-4 animate-marquee-reverse">
              {row2.map((r, i) => <ReviewCard key={i} r={r} />)}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/piercings_by_tattoo_kid?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium shadow-sm hover:bg-rose-soft transition-colors text-pink-600 hover:text-pink-700"
          >
            <Instagram className="h-4 w-4 shrink-0 text-pink-600" />
            {t("followInstagram")}
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
