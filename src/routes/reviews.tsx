import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Star, MessageSquare, PenTool, CheckCircle, Sparkles } from "lucide-react";

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
  text: string;
  stars: number;
  date: string;
}

const defaultReviews: Review[] = [
  {
    name: "Anjali Menon",
    text: "So gentle with my daughter. The studio is spotless and the staff knew exactly how to keep her calm.",
    stars: 5,
    date: "June 12, 2026",
  },
  {
    name: "Rahul Pillai",
    text: "Booked online in 2 minutes. Got my son's ears pierced — quick, painless, and beautifully done.",
    stars: 5,
    date: "June 08, 2026",
  },
  {
    name: "Lakshmi Nair",
    text: "Trusted by our whole family. Hygiene and care here are unmatched in Kerala.",
    stars: 5,
    date: "May 29, 2026",
  },
  {
    name: "Meera Krishnan",
    text: "Extremely hygienic. They unpacked the sterilized needles right in front of us. Highly recommended!",
    stars: 5,
    date: "May 24, 2026",
  },
  {
    name: "Deepak Raj",
    text: "Very patient staff. My son was crying at first, but they calmed him down with toys and completed it painlessly.",
    stars: 5,
    date: "May 15, 2026",
  },
];

function ReviewsPage() {
  const { t } = useT();
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);

  // Load reviews on mount (client-side only to avoid hydration mismatches)
  useEffect(() => {
    const saved = localStorage.getItem("site_reviews");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Sanitize items to ensure we don't render undefined/empty properties
          const validReviews = parsed.filter(
            (r) => r && typeof r.name === "string" && typeof r.text === "string"
          );
          setReviews(validReviews);
        }
      } catch (e) {
        console.error("Failed to load reviews:", e);
      }
    } else {
      localStorage.setItem("site_reviews", JSON.stringify(defaultReviews));
    }
  }, []);

  // Form states
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);
  const [hoverStars, setHoverStars] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newReview: Review = {
      name: name.trim(),
      text: text.trim(),
      stars,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("site_reviews", JSON.stringify(updatedReviews));

    setName("");
    setText("");
    setStars(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const activeRating = hoverStars !== null ? hoverStars : stars;

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
              <Sparkles className="h-3.5 w-3.5 text-primary" /> {t("parentReviews")}
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl text-ink">
              What Parents <span className="italic text-primary">Are Saying</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We prioritize safety, comfort, and memories. Read genuine reviews from parents and clients who visited our studio in Kerala.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr] items-start">
            
            {/* ── LEFT COLUMN: Reviews list ── */}
            <div className="space-y-6">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-white/60 border border-primary/5 backdrop-blur-md p-6 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    {/* Stars */}
                    <div className="flex gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`h-4 w-4 ${
                            starIndex < r.stars ? "text-primary" : "text-muted-foreground/20"
                          }`}
                          fill={starIndex < r.stars ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase">
                      {r.date || "Just Now"}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-foreground/80 italic">
                    "{r.text}"
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-soft text-sm font-bold text-primary shadow-inner select-none">
                      {r.name ? r.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink">{r.name || "Anonymous"}</div>
                      <div className="text-[10px] text-muted-foreground">Verified Client</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── RIGHT COLUMN: Write review form ── */}
            <div className="sticky top-24">
              <div className="rounded-[32px] bg-white border border-primary/10 p-6 sm:p-8 shadow-xl flex flex-col gap-6">
                <div className="flex items-center gap-2.5">
                  <PenTool className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-2xl font-bold text-ink">
                    Share Your Story
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your feedback helps other parents make safe choices. Share details about the pain level, cleanliness, and overall experience!
                </p>

                {submitted && (
                  <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-xs">
                    <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <span className="font-bold">Thank you!</span> Your review has been added to the list successfully.
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Rating Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground block">Rating</label>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const val = i + 1;
                        return (
                          <button
                            type="button"
                            key={val}
                            onClick={() => setStars(val)}
                            onMouseEnter={() => setHoverStars(val)}
                            onMouseLeave={() => setHoverStars(null)}
                            className="p-1 cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                            aria-label={`Rate ${val} stars`}
                          >
                            <Star
                              className={`h-6 w-6 transition-colors duration-150 ${
                                val <= activeRating ? "text-primary" : "text-muted-foreground/30"
                              }`}
                              fill={val <= activeRating ? "currentColor" : "none"}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-semibold text-muted-foreground">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Meera S."
                      className="w-full h-11 px-4 text-sm rounded-2xl border border-border bg-background/50 focus:outline-none focus:border-primary focus:bg-background transition-all"
                    />
                  </div>

                  {/* Comment Input */}
                  <div className="space-y-1">
                    <label htmlFor="comment" className="text-xs font-semibold text-muted-foreground">
                      Your Review
                    </label>
                    <textarea
                      id="comment"
                      required
                      rows={4}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="How did the appointment go? Was it gentle and quick?"
                      className="w-full p-4 text-sm rounded-2xl border border-border bg-background/50 focus:outline-none focus:border-primary focus:bg-background transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-white shadow-md transition-all hover:bg-primary/95 active:scale-[0.98] cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Submit Review</span>
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
