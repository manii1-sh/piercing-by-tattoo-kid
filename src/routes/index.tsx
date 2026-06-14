import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { IntroVideoPopup } from "@/components/site/IntroVideoPopup";
import { BookingSection } from "@/components/site/BookingSection";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
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
import amala from "@/assets/AMALA-removebg-preview.png";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

export const Route = createFileRoute("/")({
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <IntroVideoPopup />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <BookingSection />
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

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
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
  const items = [
    { icon: Heart, name: t("babyEarPiercing"), desc: t("babyEarDesc"), price: "₹500" },
    { icon: Sparkles, name: t("nosePiercing"), desc: t("nosePiercingDesc"), price: "₹600" },
    { icon: ScissorsSquare, name: t("tattooAdults"), desc: t("tattooDesc"), price: "from ₹1500" },
    { icon: BookOpen, name: t("aftercareGuide"), desc: t("aftercareDesc"), price: "Free" },
  ];
  return (
    <section id="services" className="bg-card/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>{t("ourServices")}</SectionHeading>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.name}
              className="group rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-soft text-primary">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-display text-xl">{it.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
                <span className="text-muted-foreground">{t("advancePayable")}</span>
                <span className="font-semibold text-primary">{it.price}</span>
              </div>
            </div>
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
  const imgs = [g1, g2, g3, g4, g1];
  return (
    <section id="gallery" className="bg-card/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>{t("littleSmiles")}</SectionHeading>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {imgs.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-rose-soft">
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" className="rounded-full border-border bg-card px-6">
            {t("viewFullGallery")}
          </Button>
        </div>
      </div>
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

function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10">
              <span className="font-display text-xl text-primary">P</span>
            </div>
            <span className="font-display text-lg">Piercing by Tattoo Kid</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{t("footerTagline")}</p>
          <div className="mt-4 flex gap-3 text-primary">
            <a href="#" className="grid h-9 w-9 place-items-center rounded-full bg-rose-soft">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="grid h-9 w-9 place-items-center rounded-full bg-rose-soft">
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/919322520682"
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-rose-soft"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">{t("quickLinks")}</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#home" className="hover:text-primary">
                {t("home")}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary">
                {t("services")}
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-primary">
                {t("gallery")}
              </a>
            </li>
            <li>
              <a href="#book" className="hover:text-primary">
                {t("bookNow")}
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary">
                {t("contact")}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">{t("contactUs")}</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {t("location")}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <a href="tel:+919322520682">+91 9322520682</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-primary" />
              hello@piercingbytattookid.in
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {t("hours")}
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">{t("scanToBook")}</div>
          <div className="rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="grid aspect-square place-items-center rounded-xl bg-rose-soft text-primary">
              <Calendar className="h-10 w-10" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{t("scanToBookFooter")}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-border px-4 pt-5 text-xs text-muted-foreground">
        <div>
          © {new Date().getFullYear()} Piercing by Tattoo Kid. {t("rights")}
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary">
            {t("privacy")}
          </a>
          <a href="#" className="hover:text-primary">
            {t("terms")}
          </a>
        </div>
      </div>
    </footer>
  );
}
