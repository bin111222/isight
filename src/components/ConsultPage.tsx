"use client";

import Image from "next/image";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";

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
  "NABH accredited centres",
  "Dr. Nikhil Nasta – over 15 years of experience",
  "Two convenient locations in Mumbai",
  "Same-day and advance appointments",
  "WhatsApp support for quick queries",
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
      {/* Hero */}
      <section className="relative py-20 lg:py-28 mesh-bg overflow-hidden">
        <div className="absolute inset-0 bg-navy-900/50" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-400 mb-3">Book a visit</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-sm">
            Book a consultation
          </h1>
          <p className="mt-4 text-silver-200 text-lg sm:text-xl max-w-2xl mx-auto">
            Schedule your eye check-up or consultation with Dr. Nikhil Nasta and the iSight Eye Care team. We have
            convenient locations in Khar and Dadar.
          </p>
        </div>
      </section>

      {/* Quick contact strip */}
      <section className="py-8 bg-white border-b border-silver-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <a
              href={`tel:+${PHONE}`}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-navy-900 text-white font-semibold hover:bg-navy-800 transition-colors"
            >
              <span className="text-xl" aria-hidden>📞</span>
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a] transition-colors"
            >
              <span className="text-xl" aria-hidden>💬</span>
              WhatsApp to book
            </a>
          </div>
        </div>
      </section>

      {/* Two locations */}
      <section className="py-14 lg:py-18 bg-silver-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500">Our locations</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
            Visit us in Khar or Dadar
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-6 lg:gap-8">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.name}
                className="overflow-hidden rounded-2xl bg-white border border-silver-200 shadow-soft hover:shadow-soft-lg transition-shadow"
              >
                <div className="p-6 lg:p-8">
                  <h3 className="font-display text-xl font-bold text-navy-900">{loc.name}</h3>
                  <p className="mt-3 text-navy-700 text-[15px] leading-relaxed">{loc.address}</p>
                  <p className="mt-2 text-navy-600 text-sm">{loc.hours}</p>
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-clinical-600 font-semibold text-sm hover:text-clinical-500 transition-colors"
                  >
                    Get directions →
                  </a>
                </div>
                <div className="w-full aspect-[4/3] min-h-[280px] bg-silver-100">
                  <iframe
                    src={loc.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map: I Sight Eye Care ${loc.name}`}
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request appointment form */}
      <section className="py-14 lg:py-18 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500">Request appointment</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
              Send us your details
            </h2>
            <p className="mt-3 text-navy-700 text-base">
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
                      className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent"
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
                      className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent"
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
                    className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="consult-location" className="block text-sm font-medium text-navy-900 mb-1.5">
                    Preferred location
                  </label>
                  <select
                    id="consult-location"
                    name="location"
                    className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent"
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
                    className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent"
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
                    className="w-full px-4 py-3 rounded-xl border border-silver-300 bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:border-transparent resize-y"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-full transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span aria-hidden>💬</span>
                  Send to WhatsApp
                </button>
              </form>
          </div>
        </div>
      </section>

      {/* Why book with us */}
      <section className="py-14 lg:py-18 bg-silver-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500">Why iSight</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
            Why book with us
          </h2>
          <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_BOOK.map((item, i) => (
              <li key={i} className="flex gap-3 text-navy-700">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-clinical-400 mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
