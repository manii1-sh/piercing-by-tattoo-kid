import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Calendar } from "lucide-react";

import baby1 from "@/assets/ChatGPT Image Jun 16, 2026, 12_53_53 PM.webp";
import baby2 from "@/assets/ChatGPT Image Jun 16, 2026, 12_55_41 PM.webp";
import baby3 from "@/assets/ChatGPT Image Jun 16, 2026, 12_57_27 PM.webp";
import baby4 from "@/assets/ChatGPT Image Jun 16, 2026, 12_58_19 PM.webp";
import baby5 from "@/assets/ChatGPT Image Jun 16, 2026, 01_01_02 PM.webp";
import baby6 from "@/assets/baby2.webp";
import baby7 from "@/assets/baby 3.webp";
import baby8 from "@/assets/baby 6.webp";
import baby9 from "@/assets/ChatGPT Image Jun 16, 2026, 01_50_44 PM.webp";
import baby10 from "@/assets/ChatGPT Image Jun 16, 2026, 01_51_55 PM.webp";
import baby11 from "@/assets/ChatGPT Image Jun 16, 2026, 01_52_56 PM.webp";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Piercing by Tattoo Kid" },
      {
        name: "description",
        content:
          "Browse our gallery of happy little ones who got their ears and noses pierced at Piercing by Tattoo Kid, Kerala.",
      },
    ],
  }),
  component: GalleryPage,
});

const allImgs = [
  baby1, baby2, baby3, baby4, baby5, baby6,
  baby7, baby8, baby9, baby10, baby11,
];

function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const closeLightbox = () => setLightbox(null);
  const prev = () =>
    setLightbox((i) =>
      i != null ? (i - 1 + allImgs.length) % allImgs.length : null
    );
  const next = () =>
    setLightbox((i) => (i != null ? (i + 1) % allImgs.length : null));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          {/* Back to Home */}
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground hover:bg-rose-soft/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <SectionHeading>Our Gallery</SectionHeading>
          <p className="mt-4 text-center text-sm text-muted-foreground max-w-lg mx-auto">
            Every smile tells a story. Browse precious moments from our studio — safe, gentle, and full of joy.
          </p>

          {/* Uniform grid */}
          <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-4">
            {allImgs.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Open gallery image ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`Baby piercing gallery photo ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/25">
                  <span className="translate-y-2 text-2xl opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    🔍
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 flex justify-center">
            <Button
              asChild
              className="h-12 rounded-full bg-primary px-8 text-sm font-semibold text-white shadow-md hover:bg-primary/90"
            >
              <a href="/#book">
                <Calendar className="mr-2 h-4 w-4" />
                Book Your Appointment
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImgs[lightbox]}
              alt={`Gallery photo ${lightbox + 1}`}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {lightbox + 1} / {allImgs.length}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close lightbox"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
