import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useT } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Sparkles, Calendar } from "lucide-react";

// Assets
import earGuideImg from "@/assets/ear_piercing_guide.jpg";
import earGuide2Img from "@/assets/ear_piercing_guide_2.png";
import noseGuideImg from "@/assets/indian_nose_piercing.png";

const guideSearchSchema = z.object({
  tab: z.enum(["ear", "nose"]).optional(),
});

export const Route = createFileRoute("/piercing-guide")({
  validateSearch: guideSearchSchema,
  head: () => ({
    meta: [
      { title: "Piercing Placement Guide — Piercing by Tattoo Kid" },
      { name: "description", content: "Explore our ear and nose piercing guides. Find healing times, pain scales, and jewelry recommendations for lobe, helix, septum, and more." },
    ],
  }),
  component: PiercingGuidePage,
});

function PiercingGuidePage() {
  const { t } = useT();
  const navigate = useNavigate({ from: Route.fullPath });

  const handleBook = () => {
    navigate({
      to: "/",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 relative overflow-hidden bg-gradient-to-b from-[#fdf0f3] via-[#fff8f9] to-[#fdf0f3] py-16 sm:py-24">
        {/* Decorative background glows */}
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl pointer-events-none animate-pulse duration-[10000ms]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> {t("piercingGuide")}
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl text-ink">
              Piercing <span className="italic text-primary">Placement Guide</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Reference our visual ear and nose diagrams below to understand placement names, angles, and local anatomy before booking your next styling.
            </p>
          </div>

          {/* Static Layout Area */}
          <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto items-stretch">
            
            {/* Ear Piercing Card - Map 1 */}
            <div className="flex flex-col h-full">
              <div className="flex-1 w-full bg-white/50 backdrop-blur-sm border border-primary/10 rounded-[32px] p-6 shadow-xl flex flex-col gap-4">
                <h2 className="text-center font-display text-xl font-bold text-ink">
                  Ear Placement Map 1
                </h2>
                <div className="aspect-[3/4] w-full overflow-hidden rounded-[24px] border border-primary/5 bg-white shadow-inner flex items-center justify-center">
                  <img
                    src={earGuideImg}
                    alt="Ear Piercing Placement Guide Map 1"
                    className="w-full h-full object-contain p-2 select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Ear Piercing Card - Map 2 */}
            <div className="flex flex-col h-full">
              <div className="flex-1 w-full bg-white/50 backdrop-blur-sm border border-primary/10 rounded-[32px] p-6 shadow-xl flex flex-col gap-4">
                <h2 className="text-center font-display text-xl font-bold text-ink">
                  Ear Placement Map 2
                </h2>
                <div className="aspect-[3/4] w-full overflow-hidden rounded-[24px] border border-primary/5 bg-white shadow-inner flex items-center justify-center">
                  <img
                    src={earGuide2Img}
                    alt="Ear Piercing Placement Guide Map 2"
                    className="w-full h-full object-contain p-2 select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Nose Piercing Card */}
            <div className="flex flex-col h-full">
              <div className="flex-1 w-full bg-white/50 backdrop-blur-sm border border-primary/10 rounded-[32px] p-6 shadow-xl flex flex-col gap-4">
                <h2 className="text-center font-display text-xl font-bold text-ink">
                  Nose Placement Map
                </h2>
                <div className="aspect-[3/4] w-full overflow-hidden rounded-[24px] border border-primary/5 bg-white shadow-inner">
                  <img
                    src={noseGuideImg}
                    alt="Nose Piercing Placement Guide"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Book Appointment CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={handleBook}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-sm font-bold text-white px-8 py-4 shadow-[0_6px_20px_rgba(236,106,133,0.25)] transition-all hover:bg-primary/95 hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book an Appointment</span>
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
