import { useT } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Phone, ShieldCheck, Menu, X, QrCode } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function TopBar() {
  const { t } = useT();
  return (
    <div className="bg-rose-soft/60 text-ink/80 text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {t("location")}
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            {t("tagline")}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">{t("haveQuestions")}</span>
          <a href="tel:+919322520682" className="flex items-center gap-1 font-medium text-ink">
            <Phone className="h-3.5 w-3.5" />
            +91 9322520682
          </a>
          <a
            href="#book"
            className="hidden items-center gap-1 rounded-full bg-primary px-3 py-1 text-primary-foreground sm:flex"
          >
            <QrCode className="h-3.5 w-3.5" />
            {t("scanToBook")}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { t, lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const nav = [
    { id: "home", label: t("home"), to: "/", hash: "home" },
    { id: "services", label: t("services"), to: "/services" },
    { id: "guide", label: t("piercingGuide"), to: "/piercing-guide" },
    { id: "gallery", label: t("gallery"), to: "/gallery" },
    { id: "how", label: t("howItWorks"), to: "/how-it-works" },
    { id: "reviews", label: t("reviews"), to: "/reviews" },
    { id: "contact", label: t("contact"), to: "/contact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 ring-1 ring-primary/20">
            <span className="font-display text-2xl text-primary">P</span>
          </div>
          <div className="min-w-0 leading-tight">
            <div className={`font-display ${lang === "ml" ? "text-base" : "text-lg sm:text-xl"}`}>Piercing by Tattoo Kid</div>
            <div className={`text-[10px] uppercase tracking-[0.18em] text-muted-foreground ${lang === "ml" ? "hidden" : ""}`}>
              Piercing &amp; Tattoo Studio
            </div>
          </div>
        </Link>

        <nav className={`hidden items-center justify-center text-sm lg:flex ${lang === "ml" ? "gap-3 text-xs" : "gap-5"}`}>
          {nav.map((n) => (
            <Link
              key={n.id}
              to={n.to}
              hash={n.hash}
              className="text-foreground/80 transition-colors hover:text-primary cursor-pointer font-medium whitespace-nowrap"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-border bg-card p-0.5 text-xs font-medium sm:flex">
            <button
              onClick={() => setLang("en")}
              className={`w-10 rounded-full px-2.5 py-1 text-center cursor-pointer ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ml")}
              className={`w-[4.5rem] rounded-full px-2.5 py-1 text-center font-ml cursor-pointer ${lang === "ml" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              മലയാളം
            </button>
          </div>
          <Button
            asChild
            className="hidden h-11 rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90 sm:inline-flex cursor-pointer font-semibold"
          >
            <Link to="/" hash="book">
              <Calendar className="mr-2 h-4 w-4" />
              {t("bookNow")}
            </Link>
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border lg:hidden cursor-pointer"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/40 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.id}
                to={n.to}
                hash={n.hash}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base hover:bg-rose-soft cursor-pointer"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setLang("en")}
                className={`flex-1 rounded-full px-3 py-2 text-sm cursor-pointer ${lang === "en" ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ml")}
                className={`flex-1 rounded-full px-3 py-2 text-sm font-ml cursor-pointer ${lang === "ml" ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}
              >
                മലയാളം
              </button>
            </div>
            <Link
              to="/"
              hash="book"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-3 text-center font-medium text-primary-foreground cursor-pointer"
            >
              {t("bookNow")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
