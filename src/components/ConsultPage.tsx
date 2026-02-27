"use client";

import Image from "next/image";
import { Phone, MessageCircle, ArrowRight, MapPin, Award, Clock, Building2 } from "lucide-react";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";
import { getImageUrl } from "@/lib/imageUrl";

const PHONE = "918692986033";
const PHONE_DISPLAY = "8692986033";
const WHATSAPP_URL = `https://wa.me/${PHONE}`;

const KHAR_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9116652176426!2d72.83492177524249!3d19.0676210522354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c90fb90c9e83%3A0x9d87245c4c8a7a1e!2sI%20Sight%20Eye%20Care%20%26%20Surgery!5e0!3m2!1sen!2sin!4v1771482941250!5m2!1sen!2sin";
const DADAR_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.956287724611!2d72.84756527524148!3d19.02164775367659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ced8f4b0394d%3A0x55407c9cfbaf8807!2sI%20Sight%20Eyecare%20%26%20Surgery%20%7C%20Dr%20Nikhil%20Nasta!5e0!3m2!1sen!2sin!4v1771482995880!5m2!1sen!2sin";

const LOCATIONS = [
  {
    name: "Khar",
    address: "Sapphire, 4th, 402, Swami Vivekanand Rd, above IDFC FIRST Bank, Khar West, Mumbai, Maharashtra 400052",
    hours: "Mon–Sat: 9:00 AM – 7:00 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sapphire+402+Swami+Vivekanand+Rd+Khar+West+Mumbai+400052",
    embedUrl: KHAR_EMBED,
  },
  {
    name: "Dadar",
    address: "Earth Galaxy, 102, Dr Babasaheb Ambedkar Rd, Dadar East, Dadar, Mumbai, Maharashtra 400014",
    hours: "Mon–Sat: 9:00 AM – 7:00 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Earth+Galaxy+102+Dr+Babasaheb+Ambedkar+Rd+Dadar+East+Mumbai+400014",
    embedUrl: DADAR_EMBED,
  },
];

const WHY_BOOK = [
  { text: "NABH accredited centres", Icon: Award },
  { text: "Dr. Nikhil Nasta – over 15 years of experience", Icon: Building2 },
  { text: "Two convenient locations in Mumbai", Icon: MapPin },
  { text: "Same-day and advance appointments", Icon: Clock },
  { text: "WhatsApp support for quick queries", Icon: MessageCircle },
];

function buildWhatsAppMessage(form: HTMLFormElement): string {
  const data = new FormData(form);
  const name = (data.get("name") as string)?.trim() || "";
  const phone = (data.get("phone") as string)?.trim() || "";
  const email = (data.get("email") as string)?.trim() || "";
  const location = (data.get("location") as string)?.trim() || "";
  const preferredDate = (data.get("preferred_date") as string)?.trim() || "";
  const message = (data.get("message") as string)?.trim() || "";

  const lines: string[] = ["*Appointment Request – iSight Eye Care*", ""];
  if (name) lines.push(`Name: ${name}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (email) lines.push(`Email: ${email}`);
  if (location) lines.push(`Preferred location: ${location.charAt(0).toUpperCase() + location.slice(1)}`);
  if (preferredDate) lines.push(`Preferred date/time: ${preferredDate}`);
  if (message) lines.push("", message);

  return lines.join("\n").trim();
}

export default function ConsultPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const text = buildWhatsAppMessage(form);
    const url = `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-silver-100">
      {/* Hero — image-backed, gradient overlay, accent */}
      <section className="relative min-h-[50vh] flex flex-col justify-center py-24 lg:py-32 overflow-hidden">
        <Image
          src={getImageUrl("/hero.webp")}
          alt="Dr. Nikhil Nasta – iSight Eye Care Mumbai consultation"
          fill
          className="object-cover object-[center_28%]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-navy-900/75" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/80 pointer-events-none" aria-hidden />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clinical-400/50 to-transparent" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clinical-400 mb-4">Book a visit</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-sm">
            Book a consultation
          </h1>
          <p className="mt-5 text-silver-200 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Schedule your eye check-up or consultation with Dr. Nikhil Nasta and the iSight Eye Care team. We have
            convenient locations in Khar and Dadar.
          </p>
        </div>
      </section>

      {/* Quick contact — premium card with accent bar */}
      <section className="relative -mt-8 z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-[0_4px_24px_-4px_rgba(10,15,26,0.15)] border border-silver-200/80">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-clinical-500 to-clinical-400 rounded-l-2xl" aria-hidden />
            <div className="pl-6 sm:pl-8 pr-6 sm:pr-8 py-6 sm:py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500 mb-4">Reach us now</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={`tel:+${PHONE}`}
                  className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-clinical-500 hover:bg-clinical-400 text-white font-semibold transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(45,90,158,0.5)] hover:shadow-[0_6px_28px_-4px_rgba(92,139,201,0.45)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Phone className="w-5 h-5" strokeWidth={2.25} />
                  Call {PHONE_DISPLAY}
                  <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={2.25} />
                  WhatsApp to book
                  <ArrowRight className="w-4 h-4 opacity-90 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two locations — map on top, card with accent */}
      <section className="py-16 lg:py-24 bg-silver-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clinical-500">Our locations</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mt-2">
            Visit us in Khar or Dadar
          </h2>
          <p className="mt-3 text-navy-600 text-base max-w-xl">
            Two NABH-accredited centres for your convenience. Get directions or call to confirm timings.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-6 lg:gap-8">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.name}
                className="group overflow-hidden rounded-2xl lg:rounded-3xl bg-white border border-silver-200/80 shadow-[0_4px_24px_-4px_rgba(10,15,26,0.1)] hover:shadow-[0_12px_40px_-12px_rgba(10,15,26,0.18)] hover:border-clinical-500/20 transition-all duration-300"
              >
                <div className="relative w-full aspect-[16/10] min-h-[200px] bg-silver-100 overflow-hidden">
                  <iframe
                    src={loc.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map: I Sight Eye Care ${loc.name}`}
                    className="w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-white/95 shadow-sm text-navy-900 font-semibold text-sm">
                    {loc.name}
                  </span>
                </div>
                <div className="relative p-6 lg:p-8">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-clinical-500/80 to-clinical-400/80 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                  <h3 className="font-display text-xl font-bold text-navy-900">{loc.name}</h3>
                  <p className="mt-3 text-navy-700 text-[15px] leading-relaxed">{loc.address}</p>
                  <p className="mt-2 flex items-center gap-2 text-navy-600 text-sm">
                    <Clock className="w-4 h-4 text-clinical-500 flex-shrink-0" strokeWidth={2} />
                    {loc.hours}
                  </p>
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-clinical-600 font-semibold text-sm hover:text-clinical-500 transition-colors group/link"
                  >
                    Get directions
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request appointment form — card with accent bar */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-silver-100/80 border border-silver-200/80 p-8 sm:p-10 lg:p-12 shadow-[0_4px_24px_-4px_rgba(10,15,26,0.08)]">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-clinical-500 to-clinical-400 rounded-l-3xl" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clinical-500">Request appointment</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
                Send us your details
              </h2>
              <p className="mt-3 text-navy-700 text-base leading-relaxed">
                Fill in the form below and click Send to WhatsApp. The message will open in WhatsApp—you just need to hit send.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="consult-name" className="block text-sm font-medium text-navy-900 mb-1.5">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="consult-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent transition-shadow"
                    />
                  </div>
                  <div>
                    <label htmlFor="consult-phone" className="block text-sm font-medium text-navy-900 mb-1.5">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="consult-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="consult-email" className="block text-sm font-medium text-navy-900 mb-1.5">
                    Email
                  </label>
                  <input
                    id="consult-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="consult-location" className="block text-sm font-medium text-navy-900 mb-1.5">
                    Preferred location
                  </label>
                  <select
                    id="consult-location"
                    name="location"
                    className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent transition-shadow"
                  >
                    <option value="">Select location</option>
                    <option value="khar">Khar</option>
                    <option value="dadar">Dadar</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="consult-date" className="block text-sm font-medium text-navy-900 mb-1.5">
                    Preferred date / time
                  </label>
                  <input
                    id="consult-date"
                    name="preferred_date"
                    type="text"
                    placeholder="e.g. Tomorrow afternoon, or leave blank"
                    className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="consult-message" className="block text-sm font-medium text-navy-900 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="consult-message"
                    name="message"
                    rows={4}
                    placeholder="e.g. Routine eye check-up, cataract consultation, LASIK enquiry…"
                    className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent resize-y transition-shadow"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={2.25} />
                  Send to WhatsApp
                  <ArrowRight className="w-4 h-4 opacity-90 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why book with us — icon cards */}
      <section className="py-16 lg:py-24 bg-silver-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clinical-500">Why iSight</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mt-2">
            Why book with us
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {WHY_BOOK.map(({ text, Icon }, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-silver-200/80 shadow-[0_2px_12px_-4px_rgba(10,15,26,0.08)] hover:shadow-[0_8px_24px_-8px_rgba(10,15,26,0.12)] hover:border-clinical-500/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-clinical-100 text-clinical-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" strokeWidth={2} aria-hidden />
                </div>
                <p className="text-navy-700 text-[15px] leading-relaxed pt-0.5">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <BookAppointmentCTA variant="card" showWhatsApp />
      </section>

      <p className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 text-sm text-navy-500">
        Disclaimer: This information is for educational purposes only. Individual cases vary; consult a specialist
        for personalised advice.
      </p>
    </div>
  );
}
