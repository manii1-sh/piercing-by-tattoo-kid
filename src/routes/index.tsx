import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { IntroVideoPopup } from "@/components/site/IntroVideoPopup";
import { BookingSection } from "@/components/site/BookingSection";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Footer } from "@/components/site/Footer";
import earImg from "@/assets/ear_piercing_category.png";
import noseImg from "@/assets/nose_piercing_category.png";
import facialImg from "@/assets/facial_oral_category.png";
import bodyImg from "@/assets/body_piercing_category.png";
import {
  Calendar,
  Heart,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Sparkles,
  Smile,
  User,
  ScissorsSquare,
  BookOpen,
  Facebook,
  Instagram,
  MessageCircle,
  Star,
  ChevronRight,
} from "lucide-react";
import amala from "@/assets/AMALA-removebg-preview.webp";
import baby1 from "@/assets/ChatGPT Image Jun 16, 2026, 12_53_53 PM.webp";
import baby2 from "@/assets/ChatGPT Image Jun 16, 2026, 12_55_41 PM.webp";
import baby3 from "@/assets/ChatGPT Image Jun 16, 2026, 12_57_27 PM.webp";
import baby4 from "@/assets/ChatGPT Image Jun 16, 2026, 12_58_19 PM.webp";
import baby5 from "@/assets/ChatGPT Image Jun 16, 2026, 01_01_02 PM.webp";
import baby6 from "@/assets/baby2.webp";
import baby7 from "@/assets/baby 3.webp";
import baby8 from "@/assets/baby 6.webp";
import baby9  from "@/assets/ChatGPT Image Jun 16, 2026, 01_50_44 PM.webp";
import baby10 from "@/assets/ChatGPT Image Jun 16, 2026, 01_51_55 PM.webp";
import baby11 from "@/assets/ChatGPT Image Jun 16, 2026, 01_52_56 PM.webp";

const homeSearchSchema = z.object({
  book: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: homeSearchSchema,
  head: () => ({
    meta: [
      { title: "Piercing by Tattoo Kid — Safe Baby Piercing in Kerala" },
      {
        name: "description",
        content:
          "Safe, hygienic baby ear & nose piercing in Kerala. Book online in 3 simple steps. Trusted by 1000+ happy families.",
      },
      { property: "og:title", content: "Piercing by Tattoo Kid — Kerala" },
      {
        property: "og:description",
        content: "Book a safe, gentle baby piercing appointment online.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { book } = Route.useSearch();
  const [selectedService, setSelectedService] = useState<string>("Baby Ear Piercing");

  useEffect(() => {
    if (book) {
      setSelectedService(book);
      const timer = setTimeout(() => {
        const element = document.getElementById("book");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [book]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <IntroVideoPopup />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <BookingSection selectedService={selectedService} setSelectedService={setSelectedService} />
        <Services />
        <WhyUs />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  const { t } = useT();
  const trust = [
    { icon: ShieldCheck, label: t("safeHygienic") },
    { icon: Sparkles, label: t("sterilizedEquipment") },
    { icon: User, label: t("expertSpecialists") },
    { icon: Heart, label: t("lovedByParents") },
  ];
  return (
    <section id="home" className="relative overflow-hidden bg-[#fdf0f3]">
      {/* Decorative floating hearts */}
      <Heart className="absolute right-[42%] top-10 h-5 w-5 fill-primary/25 text-primary/25 lg:right-[38%]" />
      <Heart className="absolute right-12 top-8 hidden h-4 w-4 fill-primary/20 text-primary/20 lg:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-10 pb-0 sm:pt-12 sm:pb-0 lg:grid-cols-2 lg:pt-14 lg:pb-0">
        {/* ── Left column ── */}
        <div className="flex flex-col">
          {/* Badge */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary shadow-sm">
            <Heart className="h-3 w-3 fill-primary" /> {t("safeForLittleOnes")}
          </span>

          {/* Headline */}
          <h1 className="mt-5 font-display text-5xl leading-[1.08] tracking-tight sm:text-6xl md:text-[4.5rem]">
            {t("heroTitle1")}
            <br />
            <span className="italic text-primary">{t("heroTitle2")}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-foreground/60">
            {t("heroSubtitle")}
          </p>

          {/* Policy Banner */}
          <div className="mt-5 flex flex-col gap-1.5 text-[11px] font-semibold text-rose-700 bg-rose-50/50 border border-rose-100 rounded-2xl px-4 py-3 max-w-md shadow-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>TN Needle &amp; Cannula Piercing Only (No Gunshot)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Titanium &amp; Surgical Steel Body-Safe Jewelry Only (No Gold)</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-12 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-md hover:bg-primary/90"
            >
              <a href="#book">
                <Calendar className="mr-2 h-4 w-4" />
                {t("bookAppointment")}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-2 border-border/60 bg-white/80 px-6 text-sm font-semibold hover:bg-white"
            >
              <a href="#services">{t("ourServices")}</a>
            </Button>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-start gap-6">
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-primary/15 bg-white shadow-sm">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="max-w-[80px] text-[11px] font-medium leading-tight text-foreground/60">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column — image ── */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Cutout PNG sits directly on the pink section background */}
            <img
              src={amala}
              alt="Artist Amala doing baby ear piercing"
              width={900}
              height={900}
              className="h-[420px] w-full object-contain object-bottom drop-shadow-xl sm:h-[500px] lg:h-[540px]"
            />

            {/* Artist badge — bottom-right overlay */}
            <div className="absolute bottom-5 right-2 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.10)] backdrop-blur-sm sm:right-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fdf0f3]">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold tracking-wide text-foreground">AMALA</div>
                <div className="text-[11px] text-muted-foreground">
                  Tattoo &amp; Piercing Artist
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t } = useT();
  const steps = [
    { n: "01", icon: Calendar, title: t("step1Title"), desc: t("step1Desc") },
    { n: "02", icon: User, title: t("step2Title"), desc: t("step2Desc") },
    { n: "03", icon: ShieldCheck, title: t("step3Title"), desc: t("step3Desc") },
    { n: "04", icon: Heart, title: t("step4Title"), desc: t("step4Desc") },
  ];
  return (
    <section id="how" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>{t("simpleSteps")}</SectionHeading>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-card shadow-[var(--shadow-card)]">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 font-display text-2xl text-primary">{s.n}</div>
              <div className="mt-1 font-semibold">{s.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useT();

  const categories = [
    {
      id: "ear",
      title: t("categoryEar"),
      desc: "Lobe, Helix, Tragus, Conch, and more.",
      img: earImg,
      count: "13 options",
    },
    {
      id: "nose",
      title: t("categoryNose"),
      desc: "Nostril, Septum, Bridge, Austin Bar, Rhino.",
      img: noseImg,
      count: "5 options",
    },
    {
      id: "facialOral",
      title: t("categoryFacialOral"),
      desc: "Eyebrow, Lip, Smiley, Tongue, Cheek.",
      img: facialImg,
      count: "5 options",
    },
    {
      id: "body",
      title: t("categoryBody"),
      desc: "Navel & Belly piercings.",
      img: bodyImg,
      count: "1 option",
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-card/40 py-16 sm:py-24">
      {/* Background blurs */}
      <div className="absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <SectionHeading>{t("ourServices")}</SectionHeading>
          <p className="mt-3 text-sm text-muted-foreground">
            Explore our expert, sterile piercing procedures. Select a category below to view all styles, descriptions, and pricing options on our dedicated services page.
          </p>
        </div>

        <div className="mt-12 grid gap-6 grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/services"
              search={{ category: cat.id }}
              className="group relative flex h-72 sm:h-96 w-full flex-col justify-end overflow-hidden rounded-3xl border border-primary/5 bg-white shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 cursor-pointer"
            >
              {/* Image Background */}
              <div className="absolute inset-0 bg-black/15 z-10 transition-colors duration-300 group-hover:bg-black/10" />
              <img
                src={cat.img}
                alt={cat.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
              />

              {/* Glassmorphic Overlay Content */}
              <div className="relative z-20 m-3 sm:m-4 rounded-2xl bg-white/80 border border-white/50 backdrop-blur-md p-4 transition-colors duration-300 group-hover:bg-white/95">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg sm:text-2xl font-bold text-ink leading-none">
                    {cat.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                    {cat.count}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground leading-normal line-clamp-1 sm:line-clamp-none">
                  {cat.desc}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-primary">
                  <span className="text-[11px]">View Piercings</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const { t } = useT();
  const items = [
    { icon: Heart, title: t("painlessQuick"), desc: t("painlessDesc") },
    { icon: ShieldCheck, title: t("sterileSafe"), desc: t("sterileDesc") },
    { icon: User, title: t("expertCare"), desc: t("expertDesc") },
    { icon: Smile, title: t("kidFriendly"), desc: t("kidFriendlyDesc") },
    { icon: Star, title: t("trustedLoved"), desc: t("trustedDesc") },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>{t("whyChooseUs")}</SectionHeading>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl bg-card p-5 text-center shadow-[var(--shadow-card)]"
            >
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-rose-soft text-primary">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 font-semibold">{it.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { t } = useT();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const allImgs = [baby1, baby2, baby3, baby4, baby5, baby6, baby7, baby8, baby9, baby10, baby11];

  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i != null ? (i - 1 + allImgs.length) % allImgs.length : null));
  const next = () => setLightbox((i) => (i != null ? (i + 1) % allImgs.length : null));

  // Double the array for seamless loop
  const marqueeImgs = [...allImgs, ...allImgs];

  return (
    <section id="gallery" className="bg-card/40 py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>{t("littleSmiles")}</SectionHeading>
      </div>

      {/* Marquee strip */}
      <div
        className="mt-10 flex gap-4 overflow-hidden"
        style={{ cursor: "default" }}
        onMouseEnter={(e) => {
          const inner = e.currentTarget.querySelector<HTMLElement>(".marquee-inner");
          if (inner) inner.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          const inner = e.currentTarget.querySelector<HTMLElement>(".marquee-inner");
          if (inner) inner.style.animationPlayState = "running";
        }}
      >
        <div className="marquee-inner flex shrink-0 gap-4 animate-marquee">
          {marqueeImgs.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i % allImgs.length)}
              className="relative h-56 w-56 shrink-0 overflow-hidden rounded-2xl bg-rose-soft sm:h-64 sm:w-64"
            >
              <img
                src={src}
                alt={`Gallery ${(i % allImgs.length) + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 hover:bg-black/20">
                <span className="text-2xl text-white opacity-0 transition-opacity hover:opacity-100">🔍</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-xl text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >‹</button>

          <div className="relative max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={allImgs[lightbox]}
              alt={`Gallery ${lightbox + 1}`}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {lightbox + 1} / {allImgs.length}
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-xl text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >›</button>

          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >✕</button>
        </div>
      )}
    </section>
  );
}

function Reviews() {
  const { t } = useT();
  const reviews = [
    {
      name: "Anjali Menon",
      text: "So gentle with my daughter. The studio is spotless and the staff knew exactly how to keep her calm.",
      stars: 5,
    },
    {
      name: "Rahul Pillai",
      text: "Booked online in 2 minutes. Got my son's ears pierced — quick, painless, and beautifully done.",
      stars: 5,
    },
    {
      name: "Lakshmi Nair",
      text: "Trusted by our whole family. Hygiene and care here are unmatched in Kerala.",
      stars: 5,
    },
  ];
  return (
    <section id="reviews" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>{t("parentReviews")}</SectionHeading>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">"{r.text}"</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-rose-soft text-sm font-semibold text-primary">
                  {r.name[0]}
                </div>
                <div className="text-sm font-medium">{r.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useT();
  return (
    <section id="contact" className="bg-card/40 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading>{t("contactUs")}</SectionHeading>
        <p className="mt-3 text-center text-muted-foreground">{t("contactSubtitle")}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: MapPin, label: t("location"), value: "Piercing by Tattoo Kid Studio" },
            {
              icon: Phone,
              label: t("phoneNumber"),
              value: "+91 9322520682",
              href: "tel:+919322520682",
            },
            { icon: Clock, label: t("hours"), value: "10:00 AM – 7:00 PM" },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-2xl bg-card p-5 text-center shadow-[var(--shadow-card)]"
            >
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-rose-soft text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                {c.label}
              </div>
              {c.href ? (
                <a href={c.href} className="mt-1 block font-medium hover:text-primary">
                  {c.value}
                </a>
              ) : (
                <div className="mt-1 font-medium">{c.value}</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            asChild
            className="h-12 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
          >
            <a href="#book">
              <Calendar className="mr-2 h-4 w-4" />
              {t("bookAppointment")}
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}


