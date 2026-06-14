import { useT } from "@/lib/i18n";
import { Heart } from "lucide-react";

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">{children}</h2>
      <div className="mt-3 flex items-center justify-center gap-2 text-primary">
        <span className="h-px w-10 bg-primary/40" />
        <Heart className="h-3.5 w-3.5 fill-primary" />
        <span className="h-px w-10 bg-primary/40" />
      </div>
    </div>
  );
}

export function MalayalamHelper({ k }: { k: Parameters<ReturnType<typeof useT>["t"]>[0] }) {
  const { t, lang } = useT();
  return <span className={lang === "ml" ? "font-ml" : ""}>{t(k)}</span>;
}
