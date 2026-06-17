import { createContext, useContext, useEffect, useState, useMemo, useCallback, type ReactNode } from "react";

export type Lang = "en" | "ml";

type Dict = Record<string, string>;

const en: Dict = {
  // top bar
  location: "Kerala, India",
  tagline: "Safe. Hygienic. Trusted.",
  haveQuestions: "Have questions? Call us",
  scanToBook: "Scan to Book",
  // nav
  home: "Home",
  about: "About",
  services: "Services",
  gallery: "Gallery",
  howItWorks: "How It Works",
  reviews: "Reviews",
  contact: "Contact",
  bookNow: "Book Now",
  // video popup
  playingVideo: "Playing video",
  videoTitle: "Why Baby Piercing Is Safe & Hygienic Here",
  skipContinue: "Skip & Continue",
  mutedLabel: "Muted",
  playingLabel: "Playing",
  watchVideo: "Watch Video",
  watchSafetyVideo: "Watch Safety Video",
  // hero
  safeForLittleOnes: "SAFE FOR YOUR LITTLE ONES",
  heroTitle1: "Tiny Moments,",
  heroTitle2: "Beautiful Forever.",
  heroSubtitle:
    "Professional baby piercing in a safe, hygienic & loving environment. Because their comfort is our priority.",
  safeHygienic: "100% Safe & Hygienic",
  sterilizedEquipment: "Sterilized Equipment",
  expertSpecialists: "Expert Specialists",
  lovedByParents: "Loved by Parents",
  bookAppointment: "Book an Appointment",
  ourServices: "Our Services",
  trustedByFamilies: "Trusted by 1000+ happy families",
  // how it works
  simpleSteps: "Simple Steps, Safe Experience",
  step1Title: "Book Your Slot",
  step1Desc: "Choose date & time that works for you",
  step2Title: "Visit Our Studio",
  step2Desc: "Relax in our kid-friendly environment",
  step3Title: "Safe Piercing",
  step3Desc: "Quick, gentle & hygienic procedure",
  step4Title: "Happy Moments",
  step4Desc: "Cherish the moment, forever",
  // booking
  bookYourAppointment: "Book Your Appointment",
  selectDateTime: "Select Date & Time",
  yourDetails: "Your Details",
  confirmPay: "Confirm & Pay",
  availableSlots: "Available Time Slots",
  available: "Available",
  selected: "Selected",
  booked: "Booked",
  yourBooking: "Your Booking",
  date: "Date",
  time: "Time",
  service: "Service",
  advancePayable: "Advance Payable",
  nextDetails: "Next: Your Details",
  secureBooking: "Secure Booking (Demo Mode)",
  fullName: "Full Name",
  phoneNumber: "Phone Number",
  back: "Back",
  payAdvance: "Pay ₹200 Advance",
  processing: "Processing...",
  pickDateFirst: "Please pick a date and time first",
  pickSlotFirst: "Please pick a time slot",
  fillDetails: "Please enter your name and a valid 10-digit phone",
  childAge: "Age of Child",
  childAgePlaceholder: "e.g. 6 months, 2 years",
  childAgeHint: "Enter your child's age (e.g. 3 months, 1 year)",
  fillChildAge: "Please enter your child's age",
  reviewBooking: "Review Booking",
  selectService: "Select Service",
  categoryEar: "Ear Piercing",
  categoryNose: "Nose Piercing",
  categoryFacialOral: "Facial & Oral",
  categoryBody: "Body Piercing",
  piercingGuide: "Piercing Guide",
  exploreGuide: "Interactive Placement Guide",
  painScale: "Pain Level",
  healingTime: "Healing Time",
  jewelryType: "Recommended Jewelry",
  // services
  babyEarPiercing: "Baby Ear Piercing",
  babyEarDesc: "Safe TN needle & Cannula piercing using body-safe Titanium & Surgical Steel (strictly no gun/gold)",
  nosePiercing: "Nose Piercing",
  nosePiercingDesc: "Quick, hygienic nose piercing for all ages",
  tattooAdults: "Tattoo (Adults)",
  tattooDesc: "Custom designs by experienced artists",
  aftercareGuide: "Aftercare Guide",
  aftercareDesc: "Step-by-step healing & care instructions",
  // why us
  whyChooseUs: "Why Parents Choose Us",
  painlessQuick: "Painless & Quick",
  painlessDesc: "Gentle techniques for little ones",
  sterileSafe: "Sterile & Safe",
  sterileDesc: "100% sterilized tools & environment",
  expertCare: "Expert Care",
  expertDesc: "Trained specialists with experience",
  kidFriendly: "Kid-Friendly Studio",
  kidFriendlyDesc: "Comfortable & friendly atmosphere",
  trustedLoved: "Trusted & Loved",
  trustedDesc: "1000+ happy families trust us",
  // gallery
  littleSmiles: "Little Smiles, Beautiful Memories",
  viewFullGallery: "View Full Gallery",
  // reviews
  parentReviews: "What Parents Say",
  reviewsTitle: "What Parents Are Saying",
  reviewsSubtitle: "We prioritize safety, comfort, and memories. Read genuine reviews from parents and clients who visited our studio in Kerala.",
  verifiedClient: "Verified Client",
  shareYourStory: "Share Your Story",
  shareYourStoryDesc: "Your feedback helps other parents make safe choices. Share details about the pain level, cleanliness, and overall experience!",
  thankYouReview: "Thank you!",
  reviewAddedSuccess: "Your review has been added to the list successfully.",
  ratingLabel: "Rating",
  yourReview: "Your Review",
  reviewPlaceholder: "How did the appointment go? Was it gentle and quick?",
  submitReviewButton: "Submit Review",
  followInstagram: "Follow us on Instagram",
  // contact
  contactUs: "Contact Us",
  contactSubtitle: "We're here to help. Reach out anytime.",
  hours: "Mon – Sat : 11:00 AM – 4:00 PM",
  // footer
  footerTagline: "We create safe, beautiful & memorable experiences for your little ones.",
  quickLinks: "Quick Links",
  rights: "All rights reserved.",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  scanToBookFooter: "Book your slot easily by scanning the QR code.",
  // confirmation
  bookingConfirmed: "Booking Confirmed!",
  bookingConfirmedSub: "Your appointment has been booked successfully.",
  bookingId: "Booking ID",
  amountPaid: "Advance Paid",
  openWhatsApp: "Open WhatsApp Confirmation",
  notifyOwner: "Notify Shop",
  backToHome: "Back to Home",
  thankYou: "Thank you for choosing Piercing by Tattoo Kid!",
};

const ml: Dict = {
  location: "കേരളം, ഇന്ത്യ",
  tagline: "സുരക്ഷിതം. ശുചിത്വം. വിശ്വാസ്യം.",
  haveQuestions: "ചോദ്യങ്ങൾ? വിളിക്കൂ",
  scanToBook: "ബുക്ക് ചെയ്യാൻ സ്കാൻ ചെയ്യൂ",
  home: "ഹോം",
  about: "ഞങ്ങളെപ്പറ്റി",
  services: "സേവനങ്ങൾ",
  gallery: "ഗ്യാലറി",
  howItWorks: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
  reviews: "അവലോകനങ്ങൾ",
  contact: "ബന്ധപ്പെടുക",
  bookNow: "ഇപ്പോൾ ബുക്ക് ചെയ്യൂ",
  // video popup
  playingVideo: "വീഡിയോ പ്ലേ ചെയ്യുന്നു",
  videoTitle: "എന്തുകൊണ്ട് ബേബി പിയേഴ്സിംഗ് ഇവിടെ സുരക്ഷിതവും ശുചിത്വവുമുള്ളതാണ്",
  skipContinue: "സ്കിപ്പ് ചെയ്യുക & തുടരുക",
  mutedLabel: "മ്യൂട്ട് ചെയ്തു",
  playingLabel: "പ്ലേ ചെയ്യുന്നു",
  watchVideo: "വീഡിയോ കാണുക",
  watchSafetyVideo: "സുരക്ഷാ വീഡിയോ കാണുക",
  // hero
  safeForLittleOnes: "നിങ്ങളുടെ കുഞ്ഞുങ്ങൾക്ക് സുരക്ഷിതം",
  heroTitle1: "ചെറിയ നിമിഷങ്ങൾ,",
  heroTitle2: "എന്നേക്കും മനോഹരം.",
  heroSubtitle:
    "സുരക്ഷിതവും ശുചിത്വവുമുള്ള സ്നേഹനിർഭര അന്തരീക്ഷത്തിൽ പ്രൊഫഷണൽ ബേബി പിയേഴ്സിംഗ്. കാരണം അവരുടെ സൗകര്യമാണ് ഞങ്ങളുടെ മുൻഗണന.",
  safeHygienic: "100% സുരക്ഷിതം & ശുചിത്വം",
  sterilizedEquipment: "സ്റ്റെറിലൈസ് ചെയ്ത ഉപകരണങ്ങൾ",
  expertSpecialists: "വിദഗ്ധ വിദഗ്ദ്ധർ",
  lovedByParents: "മാതാപിതാക്കൾക്ക് പ്രിയം",
  bookAppointment: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യൂ",
  ourServices: "ഞങ്ങളുടെ സേവനങ്ങൾ",
  trustedByFamilies: "1000+ സന്തുഷ്ട കുടുംബങ്ങൾ വിശ്വസിക്കുന്നു",
  simpleSteps: "ലളിതമായ ഘട്ടങ്ങൾ, സുരക്ഷിത അനുഭവം",
  step1Title: "സ്ലോട്ട് ബുക്ക് ചെയ്യൂ",
  step1Desc: "നിങ്ങൾക്ക് അനുയോജ്യമായ തീയതിയും സമയവും തിരഞ്ഞെടുക്കൂ",
  step2Title: "സ്റ്റുഡിയോ സന്ദർശിക്കൂ",
  step2Desc: "ഞങ്ങളുടെ കുഞ്ഞുങ്ങൾക്ക് സൗഹൃദമായ അന്തരീക്ഷത്തിൽ വിശ്രമിക്കൂ",
  step3Title: "സുരക്ഷിത പിയേഴ്സിംഗ്",
  step3Desc: "വേഗത്തിലുള്ള, മൃദുവായ & ശുചിത്വമുള്ള നടപടി",
  step4Title: "സന്തോഷകരമായ നിമിഷങ്ങൾ",
  step4Desc: "ആ നിമിഷം എന്നേക്കും ഓർമ്മിക്കൂ",
  bookYourAppointment: "നിങ്ങളുടെ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യൂ",
  selectDateTime: "തീയതിയും സമയവും തിരഞ്ഞെടുക്കൂ",
  yourDetails: "നിങ്ങളുടെ വിശദാംശങ്ങൾ",
  confirmPay: "സ്ഥിരീകരിച്ച് പണമടയ്ക്കൂ",
  availableSlots: "ലഭ്യമായ സമയ സ്ലോട്ടുകൾ",
  available: "ലഭ്യം",
  selected: "തിരഞ്ഞെടുത്തു",
  booked: "ബുക്ക് ചെയ്തു",
  yourBooking: "നിങ്ങളുടെ ബുക്കിംഗ്",
  date: "തീയതി",
  time: "സമയം",
  service: "സേവനം",
  advancePayable: "അഡ്വാൻസ് അടയ്ക്കേണ്ടത്",
  nextDetails: "അടുത്തത്: വിശദാംശങ്ങൾ",
  secureBooking: "സുരക്ഷിത ബുക്കിംഗ് (ഡെമോ മോഡ്)",
  fullName: "പൂർണ്ണ നാമം",
  phoneNumber: "ഫോൺ നമ്പർ",
  back: "തിരികെ",
  payAdvance: "₹200 അഡ്വാൻസ് അടയ്ക്കൂ",
  processing: "പ്രോസസ്സിംഗ്...",
  pickDateFirst: "ദയവായി ആദ്യം തീയതിയും സമയവും തിരഞ്ഞെടുക്കൂ",
  pickSlotFirst: "ദയവായി ഒരു സമയ സ്ലോട്ട് തിരഞ്ഞെടുക്കൂ",
  fillDetails: "ദയവായി പേരും 10 അക്ക ഫോൺ നമ്പറും നൽകൂ",
  childAge: "കുട്ടിയുടെ പ്രായം",
  childAgePlaceholder: "ഉദാ: 6 മാസം, 2 വർഷം",
  childAgeHint: "കുട്ടിയുടെ പ്രായം നൽകൂ (ഉദാ: 3 മാസം, 1 വർഷം)",
  fillChildAge: "ദയവായി കുട്ടിയുടെ പ്രായം നൽകൂ",
  reviewBooking: "ബുക്കിംഗ് അവലോകനം",
  selectService: "സേവനം തിരഞ്ഞെടുക്കുക",
  categoryEar: "കാത് പിയേഴ്സിംഗ്",
  categoryNose: "മൂക്ക് പിയേഴ്സിംഗ്",
  categoryFacialOral: "മുഖം & വായ",
  categoryBody: "ശരീര പിയേഴ്സിംഗ്",
  piercingGuide: "പിയേഴ്സിംഗ് ഗൈഡ്",
  exploreGuide: "ഇന്ററാക്ടീവ് പ്ലേസ്മെന്റ് ഗൈഡ്",
  painScale: "വേദനയുടെ തോത്",
  healingTime: "സുഖപ്പെടുന്ന സമയം",
  jewelryType: "ആഭരണങ്ങൾ",
  babyEarPiercing: "ബേബി ഇയർ പിയേഴ്സിംഗ്",
  babyEarDesc: "ശരീരത്തിന് സുരക്ഷിതമായ ടൈറ്റാനിയം അല്ലെങ്കിൽ സർജിക്കൽ സ്റ്റീൽ ആഭരണങ്ങൾ ഉപയോഗിച്ച് സുരക്ഷിതമായ ടിഎൻ നീഡിൽ അല്ലെങ്കിൽ കാനുല പിയേഴ്സിംഗ് മാത്രം (ഗൺ ഷോട്ട് അല്ലെങ്കിൽ സ്വർണ്ണാഭരണങ്ങൾ ഉപയോഗിക്കാറില്ല)",
  nosePiercing: "നോസ് പിയേഴ്സിംഗ്",
  nosePiercingDesc: "എല്ലാ പ്രായക്കാർക്കും വേഗത്തിലുള്ള, ശുചിത്വമുള്ള നോസ് പിയേഴ്സിംഗ്",
  tattooAdults: "ടാറ്റൂ (മുതിർന്നവർ)",
  tattooDesc: "അനുഭവസമ്പന്നരായ കലാകാരന്മാർ ഇഷ്ടാനുസരണം ഡിസൈൻ ചെയ്യുന്നു",
  aftercareGuide: "പരിചരണ ഗൈഡ്",
  aftercareDesc: "ഘട്ടം ഘട്ടമായുള്ള സുഖപ്പെടുത്തൽ & പരിചരണ നിർദ്ദേശങ്ങൾ",
  whyChooseUs: "എന്തുകൊണ്ട് മാതാപിതാക്കൾ ഞങ്ങളെ തിരഞ്ഞെടുക്കുന്നു",
  painlessQuick: "വേദനയില്ലാത്തതും വേഗതയുള്ളതും",
  painlessDesc: "കുഞ്ഞുങ്ങൾക്കായി മൃദുവായ സാങ്കേതികതകൾ",
  sterileSafe: "സ്റ്റെറൈൽ & സുരക്ഷിതം",
  sterileDesc: "100% സ്റ്റെറിലൈസ് ചെയ്ത ഉപകരണങ്ങളും അന്തരീക്ഷവും",
  expertCare: "വിദഗ്ധ പരിചരണം",
  expertDesc: "അനുഭവസമ്പന്നരായ പരിശീലനം നേടിയ വിദഗ്ദ്ധർ",
  kidFriendly: "കുഞ്ഞുങ്ങൾക്ക് സൗഹൃദമായ സ്റ്റുഡിയോ",
  kidFriendlyDesc: "സുഖകരവും സൗഹൃദപരവുമായ അന്തരീക്ഷം",
  trustedLoved: "വിശ്വസിച്ച് സ്നേഹിക്കുന്നു",
  trustedDesc: "1000+ സന്തുഷ്ട കുടുംബങ്ങൾ ഞങ്ങളെ വിശ്വസിക്കുന്നു",
  littleSmiles: "ചെറിയ പുഞ്ചിരികൾ, മനോഹരമായ ഓർമ്മകൾ",
  viewFullGallery: "മുഴുവൻ ഗ്യാലറി കാണൂ",
  parentReviews: "മാതാപിതാക്കൾ പറയുന്നത്",
  reviewsTitle: "മാതാപിതാക്കൾ പറയുന്നത്",
  reviewsSubtitle: "സുരക്ഷിതത്വം, സുഖസൗകര്യങ്ങൾ, മനോഹരമായ ഓർമ്മകൾ എന്നിവയ്ക്കാണ് ഞങ്ങൾ മുൻഗണന നൽകുന്നത്. കേരളത്തിലെ ഞങ്ങളുടെ സ്റ്റുഡിയോ സന്ദർശിച്ച മാതാപിതാക്കളുടെയും ഉപഭോക്താക്കളുടെയും യഥാർത്ഥ അവലോകനങ്ങൾ വായിക്കൂ.",
  verifiedClient: "സ്ഥിരീകരിച്ച ഉപഭോക്താവ്",
  shareYourStory: "നിങ്ങളുടെ അനുഭവം പങ്കുവെക്കൂ",
  shareYourStoryDesc: "നിങ്ങളുടെ ഫീഡ്‌ബാക്ക് മറ്റ് മാതാപിതാക്കൾക്ക് സുരക്ഷിതമായ തിരഞ്ഞെടുപ്പുകൾ നടത്താൻ സഹായിക്കുന്നു. വേദനയുടെ തോത്, വൃത്തി, മൊത്തത്തിലുള്ള അനുഭവം എന്നിവയെക്കുറിച്ചുള്ള വിശദാംശങ്ങൾ പങ്കുവെക്കൂ!",
  thankYouReview: "നന്ദി!",
  reviewAddedSuccess: "നിങ്ങളുടെ അവലോകനം വിജയകരമായി ലിസ്റ്റിലേക്ക് ചേർത്തു.",
  ratingLabel: "റേറ്റിംഗ്",
  yourReview: "നിങ്ങളുടെ അവലോകനം",
  reviewPlaceholder: "അപ്പോയിന്റ്മെന്റ് എങ്ങനെയുണ്ടായിരുന്നു? പിയേഴ്സിംഗ് സുഗമവും വേഗത്തിലുമായിരുന്നോ?",
  submitReviewButton: "അവലോകനം സമർപ്പിക്കുക",
  followInstagram: "ഇൻസ്റ്റാഗ്രാമിൽ ഞങ്ങളെ ഫോളോ ചെയ്യൂ",
  contactUs: "ഞങ്ങളെ ബന്ധപ്പെടുക",
  contactSubtitle: "ഞങ്ങൾ സഹായിക്കാൻ ഇവിടെയുണ്ട്. എപ്പോൾ വേണമെങ്കിലും ബന്ധപ്പെടൂ.",
  hours: "തിങ്കൾ – ഞായർ : രാവിലെ 10:00 – വൈകുന്നേരം 7:00",
  footerTagline:
    "നിങ്ങളുടെ കുഞ്ഞുങ്ങൾക്കായി ഞങ്ങൾ സുരക്ഷിതവും മനോഹരവുമായ അനുഭവങ്ങൾ സൃഷ്ടിക്കുന്നു.",
  quickLinks: "ദ്രുത ലിങ്കുകൾ",
  rights: "എല്ലാ അവകാശങ്ങളും സംരക്ഷിക്കപ്പെട്ടിരിക്കുന്നു.",
  privacy: "സ്വകാര്യതാ നയം",
  terms: "സേവന നിബന്ധനകൾ",
  scanToBookFooter: "QR കോഡ് സ്കാൻ ചെയ്ത് എളുപ്പത്തിൽ ബുക്ക് ചെയ്യൂ.",
  bookingConfirmed: "ബുക്കിംഗ് സ്ഥിരീകരിച്ചു!",
  bookingConfirmedSub: "നിങ്ങളുടെ അപ്പോയിന്റ്മെന്റ് വിജയകരമായി ബുക്ക് ചെയ്തു.",
  bookingId: "ബുക്കിംഗ് ഐഡി",
  amountPaid: "അഡ്വാൻസ് അടച്ചു",
  openWhatsApp: "WhatsApp സ്ഥിരീകരണം തുറക്കൂ",
  notifyOwner: "ഷോപ്പിനെ അറിയിക്കൂ",
  backToHome: "ഹോമിലേക്ക് മടങ്ങൂ",
  thankYou: "Piercing by Tattoo Kid തിരഞ്ഞെടുത്തതിന് നന്ദി!",
};

const dicts: Record<Lang, Dict> = { en, ml };

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof typeof en) => string;
}
const Ctx = createContext<I18nCtx>({ lang: "en", setLang: () => { }, t: (k) => k as string });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    try {
      const saved =
        typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
      console.log("I18nProvider: loaded saved lang =", saved);
      if (saved === "en" || saved === "ml") setLangState(saved);
    } catch (e) {
      console.warn("I18nProvider: localStorage getItem failed", e);
    }
  }, []);
  const setLang = useCallback((l: Lang) => {
    console.log("I18nProvider: setLang called with =", l);
    setLangState(l);
    try {
      if (typeof window !== "undefined") localStorage.setItem("lang", l);
    } catch (e) {
      console.warn("I18nProvider: localStorage setItem failed", e);
    }
  }, []);
  const t = useCallback((k: keyof typeof en) => dicts[lang][k as string] ?? en[k as string] ?? (k as string), [lang]);

  console.log("I18nProvider: rendering with lang =", lang);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useT = () => useContext(Ctx);
