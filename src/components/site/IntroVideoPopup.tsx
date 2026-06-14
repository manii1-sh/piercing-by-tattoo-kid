import { useState, useRef, useEffect } from "react";
import { Play, Pause, Square, Volume2, VolumeX, Check, SkipForward } from "lucide-react";
import { useT } from "@/lib/i18n";
import babyVideo from "@/assets/piercing 3.mp4";

export function IntroVideoPopup() {
  const { t, lang, setLang } = useT();
  // Start closed on SSR (localStorage unavailable in Node), then check on client
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("intro_seen")) {
      setIsOpen(true);
    }
  }, []);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play attempt on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay prevented:", err);
          setIsPlaying(false);
        });
    }
  }, []);

  if (!isOpen) return null;

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleClose = () => {
    localStorage.setItem("intro_seen", "1");
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md transition-all duration-300">
      <div className="relative flex w-full max-w-[420px] transform flex-col items-center rounded-[36px] bg-card p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-border/40 transition-all duration-300">
        {/* Top Header Bar */}
        <div className="flex w-full items-center justify-between">
          {/* Language Switcher Pill */}
          <div className="flex items-center rounded-full border border-border bg-card p-0.5 text-xs font-semibold shadow-sm">
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all ${
                lang === "en"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ml")}
              className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all font-ml ${
                lang === "ml"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ML
            </button>
          </div>

          {/* Playing status badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-bold text-foreground shadow-sm">
            <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3]" />
            <span>{t("playingVideo")}</span>
          </div>
        </div>

        {/* Video Block */}
        <div className="relative mt-5 aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-black shadow-lg">
          <video
            ref={videoRef}
            src={babyVideo}
            className="h-full w-full object-cover"
            autoPlay
            muted={isMuted}
            playsInline
            loop
          />

          {/* Video Overlay Controls (Bottom) */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
            {/* Left side actions: Play, Pause, Stop */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/35 active:scale-90"
                title="Play"
              >
                <Play className="h-4 w-4 fill-white" />
              </button>
              <button
                onClick={handlePause}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/35 active:scale-90"
                title="Pause"
              >
                <Pause className="h-4 w-4 fill-white" />
              </button>
              <button
                onClick={handleStop}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/35 active:scale-90"
                title="Stop"
              >
                <Square className="h-4 w-4 fill-white" />
              </button>
            </div>

            {/* Right side actions: Mute state text, Mute/Unmute button */}
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold tracking-wide text-white backdrop-blur-sm">
                {isMuted ? t("mutedLabel") : t("playingLabel")}
              </span>
              <button
                onClick={toggleMute}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-primary/90 active:scale-90"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Video title text under video */}
        <h3 className="mt-5 text-center font-display text-[22px] font-semibold leading-tight text-ink/90">
          {t("videoTitle")}
        </h3>

        {/* Bottom CTA Action Button */}
        <button
          onClick={handleClose}
          className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-bold text-white shadow-[0_6px_20px_rgba(236,106,133,0.3)] transition-all hover:bg-primary/95 active:scale-[0.98]"
        >
          <span>{t("skipContinue")}</span>
          <SkipForward className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
