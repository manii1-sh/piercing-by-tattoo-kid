import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useT } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ArrowLeft, ChevronRight, Sparkles, Heart, Smile, Star } from "lucide-react";

// Assets
import earImg from "@/assets/ear_piercing_category.png";
import noseImg from "@/assets/nose_piercing_category.png";
import facialImg from "@/assets/facial_oral_category.png";
import bodyImg from "@/assets/body_piercing_category.png";

const servicesSearchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/services")({
  validateSearch: servicesSearchSchema,
  head: () => ({
    meta: [
      { title: "Our Services — Piercing by Tattoo Kid" },
      { name: "description", content: "Explore our safe, sterile, and premium piercing services in Kerala. Choose from Ear, Nose, Facial & Oral, or Body piercings." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useT();
  const navigate = useNavigate({ from: Route.fullPath });
  const { category } = Route.useSearch();

  const categories = [
    {
      id: "ear",
      title: t("categoryEar"),
      desc: "From gentle lobe piercings for infants to advanced cartilage work, all done with precision.",
      img: earImg,
      count: 13,
    },
    {
      id: "nose",
      title: t("categoryNose"),
      desc: "Nostril, septum, bridge, and advanced tip piercings done with high-end, bio-compatible jewelry.",
      img: noseImg,
      count: 5,
    },
    {
      id: "facialOral",
      title: t("categoryFacialOral"),
      desc: "Eyebrow, lip, smiley, tongue, and cheek piercings designed to complement your facial structure.",
      img: facialImg,
      count: 5,
    },
    {
      id: "body",
      title: t("categoryBody"),
      desc: "Navel and belly piercings using curved barbells with premium crystals for a sparkling look.",
      img: bodyImg,
      count: 1,
    },
  ];

  const servicesData: Record<
    string,
    { name: string; desc: string; price: string; abbr: string }[]
  > = {
    ear: [
      { name: "Baby Ear Piercing", desc: "Gentle lobe piercing using sterilized child-safe studs", price: "₹500", abbr: "Be" },
      { name: "Lobe Piercing", desc: "Classic lobe piercing, safe, fast-healing & painless", price: "₹500", abbr: "Lo" },
      { name: "Helix Piercing", desc: "Classic upper ear cartilage rim piercing", price: "₹600", abbr: "Hx" },
      { name: "Forward Helix", desc: "Piercing on the inner forward rim of ear cartilage", price: "₹600", abbr: "Fh" },
      { name: "Mid Helix", desc: "Placed along the middle outer edge of the ear", price: "₹600", abbr: "Mh" },
      { name: "Vertical Helix", desc: "Vertical piercing through the upper cartilage rim", price: "₹600", abbr: "Vh" },
      { name: "Tragus Piercing", desc: "Through the thick cartilage flap over the ear canal", price: "₹600", abbr: "Tg" },
      { name: "Conch Piercing", desc: "In the central cup of the inner ear cartilage", price: "₹600", abbr: "Co" },
      { name: "Daith Piercing", desc: "Through the innermost fold of the ear cartilage", price: "₹600", abbr: "Dt" },
      { name: "Rook Piercing", desc: "On the small ridge above the inner ear canal", price: "₹600", abbr: "Rk" },
      { name: "Snug Piercing", desc: "Vertical piercing on the inner cartilage rim", price: "₹600", abbr: "Sg" },
      { name: "Flat Piercing", desc: "Surface piercing on the flat upper cartilage area", price: "₹600", abbr: "Ft" },
      { name: "Industrial Piercing", desc: "Double cartilage piercing connected by a barbell", price: "₹700", abbr: "Id" },
    ],
    nose: [
      { name: "Nostril Piercing", desc: "Classic piercing on the side of the nostril wing", price: "₹500", abbr: "Ns" },
      { name: "Septum Piercing", desc: "Through the sweet spot beneath the nasal cartilage", price: "₹700", abbr: "Sp" },
      { name: "Bridge Piercing", desc: "Horizontal surface piercing between the eyes", price: "₹700", abbr: "Br" },
      { name: "Austin Bar", desc: "Horizontal piercing through the tip of the nose", price: "₹700", abbr: "Ab" },
      { name: "Rhino Piercing", desc: "Vertical tip piercing exiting above the nostrils", price: "₹700", abbr: "Rh" },
    ],
    facialOral: [
      { name: "Eyebrow Piercing", desc: "Vertical surface piercing on the eyebrow ridge", price: "₹700", abbr: "Eb" },
      { name: "Lip Piercing", desc: "Classic lower or upper lip ring/stud piercing", price: "₹600", abbr: "Lp" },
      { name: "Smiley Piercing", desc: "Through the thin webbing under the upper lip", price: "₹600", abbr: "Sm" },
      { name: "Tongue Piercing", desc: "Traditional central tongue muscle barbell piercing", price: "₹700", abbr: "To" },
      { name: "Cheek Piercing", desc: "Dimple-mimicking cheek piercings, sold in pairs", price: "₹700", abbr: "Ck" },
    ],
    body: [
      { name: "Belly Piercing", desc: "Classic aesthetic navel piercing with curved barbell", price: "₹700", abbr: "By" },
    ],
  };

  const currentCategory = categories.find((cat) => cat.id === category);
  const currentList = category ? servicesData[category] : [];

  const handleBook = (piercingName: string) => {
    navigate({
      to: "/",
      search: { book: piercingName },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 relative overflow-hidden bg-gradient-to-b from-[#fdf0f3] via-[#fff8f9] to-[#fdf0f3] py-16 sm:py-24">
        {/* Background glows */}
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl pointer-events-none animate-pulse duration-[10000ms]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          {!category ? (
            /* ── VIEW 1: Main Category Selection ── */
            <div>
              <div className="text-center max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary shadow-sm">
                  <Heart className="h-3 w-3 fill-primary" /> Premium Offerings
                </span>
                <h1 className="mt-4 font-display text-4xl sm:text-6xl text-ink">
                  Artistic <span className="italic text-primary">Body Piercings</span>
                </h1>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Discover safe, painless, and highly hygienic piercing services. Click on any category below to view the specific procedures and prices we offer.
                </p>
              </div>

              {/* Category Grid */}
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigate({ search: { category: cat.id } })}
                    className="group relative flex h-[400px] w-full flex-col justify-end overflow-hidden rounded-[32px] border border-primary/5 bg-white shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/20 text-left cursor-pointer"
                  >
                    {/* Image Background */}
                    <div className="absolute inset-0 bg-black/10 z-10" />
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
                    />

                    {/* Bottom Card Content overlay */}
                    <div className="relative z-20 m-4 rounded-[24px] bg-white/80 border border-white/50 backdrop-blur-md p-5 transition-colors duration-300 group-hover:bg-white/95">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-2xl font-bold text-ink leading-none">
                          {cat.title}
                        </h3>
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
                          {cat.count} Options
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                        {cat.desc}
                      </p>
                      
                      <div className="mt-4 flex items-center justify-between text-xs font-semibold text-primary">
                        <span>Explore Piercings</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ── VIEW 2: Sub-services Grid ── */
            <div>
              {/* Back Navigation Bar */}
              <div className="flex items-center justify-between border-b border-border/40 pb-6 mb-8">
                <button
                  onClick={() => navigate({ search: { category: undefined } })}
                  className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-rose-soft/20 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Categories</span>
                </button>
                
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider bg-rose-soft/40 px-3.5 py-1.5 rounded-full">
                  Category: {currentCategory?.title}
                </span>
              </div>

              {/* Title & Description of category */}
              <div className="max-w-3xl mb-12">
                <h1 className="font-display text-4xl sm:text-5xl text-ink font-bold">
                  Explore <span className="italic text-primary">{currentCategory?.title}</span>
                </h1>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {currentCategory?.desc} All procedures are executed by trained specialists in a 100% sterile environment using autoclave-sterilized single-use tools.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {currentList?.map((it) => (
                  <div
                    key={it.name}
                    className="group flex flex-col justify-between rounded-3xl bg-white/75 border border-primary/5 backdrop-blur-md p-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(236,106,133,0.07)] hover:border-primary/20"
                  >
                    <div>
                      {/* Badge & Title */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-rose-50/50 text-[13px] font-bold tracking-tight text-primary shadow-inner select-none transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                          {it.abbr}
                        </div>
                        <h4 className="font-display text-xl sm:text-2xl leading-none text-ink font-semibold">
                          {it.name}
                        </h4>
                      </div>
                      
                      <p className="mt-3.5 text-xs leading-relaxed text-foreground/60 line-clamp-3">
                        {it.desc}
                      </p>
                    </div>
                    
                    {/* Price & Book CTA */}
                    <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-3 text-xs">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">Service Price</span>
                        <span className="font-display text-xl font-bold text-primary">{it.price}</span>
                      </div>
                      <button
                        onClick={() => handleBook(it.name)}
                        className="relative overflow-hidden group/btn flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-primary/95 hover:shadow-md hover:shadow-primary/20 active:scale-95 cursor-pointer"
                      >
                        <span>{t("bookNow")}</span>
                        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
