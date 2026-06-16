import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Piercing by Tattoo Kid" },
      { name: "description", content: "Get in touch with us for booking slots, custom jewelry queries, or aftercare guidance. Located in Kerala, India." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useT();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactDetails = [
    {
      icon: Phone,
      label: t("phoneNumber"),
      value: "+91 9322520682",
      href: "tel:+919322520682",
    },
    {
      icon: Mail,
      label: "Email Support",
      value: "hello@piercingbytattookid.in",
      href: "mailto:hello@piercingbytattookid.in",
    },
    {
      icon: MapPin,
      label: t("location"),
      value: "Tattoo Kid Studio, Kerala, India",
    },
    {
      icon: Clock,
      label: "Studio Hours",
      value: t("hours"),
    },
  ];

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
              <Sparkles className="h-3.5 w-3.5 text-primary" /> {t("contactUs")}
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl text-ink">
              Get In <span className="italic text-primary">Touch</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Have questions about baby piercing care, healing times, or custom titanium jewelry? Contact our team directly.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.5fr] items-start">
            
            {/* ── LEFT COLUMN: Contact info list ── */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {contactDetails.map((c, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-white/60 border border-primary/5 backdrop-blur-md p-6 shadow-md flex gap-4 items-start"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-soft text-primary shadow-inner shrink-0">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="mt-1 block font-display text-lg font-bold text-ink hover:text-primary transition-colors truncate"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div className="mt-1 font-display text-lg font-bold text-ink leading-tight">
                        {c.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ── RIGHT COLUMN: Send message form ── */}
            <div>
              <div className="rounded-[32px] bg-white border border-primary/10 p-6 sm:p-8 shadow-xl flex flex-col gap-6">
                <h3 className="font-display text-2xl font-bold text-ink">
                  Send Us a Message
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Fill out the form below, and we'll reply to your email address within 24 hours.
                </p>

                {submitted && (
                  <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-xs">
                    <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <span className="font-bold">Message Sent!</span> We have received your query and will contact you shortly.
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name and Email side-by-side */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-xs font-semibold text-muted-foreground">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Anjali M."
                        className="w-full h-11 px-4 text-sm rounded-2xl border border-border bg-background/50 focus:outline-none focus:border-primary focus:bg-background transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@domain.com"
                        className="w-full h-11 px-4 text-sm rounded-2xl border border-border bg-background/50 focus:outline-none focus:border-primary focus:bg-background transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1">
                    <label htmlFor="subject" className="text-xs font-semibold text-muted-foreground">
                      Subject (Optional)
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Baby piercing query"
                      className="w-full h-11 px-4 text-sm rounded-2xl border border-border bg-background/50 focus:outline-none focus:border-primary focus:bg-background transition-all"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-xs font-semibold text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your query or question here..."
                      className="w-full p-4 text-sm rounded-2xl border border-border bg-background/50 focus:outline-none focus:border-primary focus:bg-background transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-white shadow-md transition-all hover:bg-primary/95 active:scale-[0.98] cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
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
