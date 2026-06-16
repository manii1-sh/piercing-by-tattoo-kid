import { useT } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle, Calendar } from "lucide-react";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <Link to="/" hash="home" className="hover:text-primary">
                {t("home")}
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary">
                {t("services")}
              </Link>
            </li>
            <li>
              <Link to="/piercing-guide" className="hover:text-primary">
                {t("piercingGuide")}
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-primary">
                {t("gallery")}
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-primary">
                {t("reviews")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                {t("contact")}
              </Link>
            </li>
            <li>
              <Link to="/" hash="book" className="hover:text-primary">
                {t("bookNow")}
              </Link>
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
