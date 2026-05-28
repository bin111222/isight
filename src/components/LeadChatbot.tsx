"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, X } from "lucide-react";
import { TREATMENT_LINKS } from "@/lib/sitemap";
import { getImageUrl } from "@/lib/imageUrl";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

type SymptomFlow = {
  id: string;
  label: string;
  procedureHints: string[];
};

function inferPageIntent(pathname: string, title: string): string | null {
  const normalized = `${pathname} ${title}`.toLowerCase();
  if (normalized.includes("dry eye")) return "dryness, irritation, burning or watering";
  if (normalized.includes("lasik") || normalized.includes("power")) return "blurred vision and wanting freedom from glasses";
  if (normalized.includes("cataract")) return "cloudy vision, glare, or night driving difficulty";
  if (normalized.includes("retina")) return "floaters, flashes, or sudden vision changes";
  if (normalized.includes("glaucoma")) return "eye pressure concerns or glaucoma follow-up";
  if (normalized.includes("children") || normalized.includes("pediatric")) return "a child eye concern";
  return null;
}

function chatStarter(intent: string | null): string {
  if (intent) {
    return `Welcome to iSight Eye Care. Are you here for ${intent}? Choose the symptom that matches best.`;
  }
  return "Welcome to iSight Eye Care. Please choose the eye symptom you want help with.";
}

function readableTreatmentLabel(label: string): string {
  return label.replace(/\s+Mumbai$/i, "").trim();
}

const symptomFlows: SymptomFlow[] = [
  {
    id: "dry-eye",
    label: "Dryness, burning, irritation or watering",
    procedureHints: ["Dry Eye Treatment", "Oculoplastic Surgery & Botox"],
  },
  {
    id: "vision-correction",
    label: "Blurred vision / glasses removal",
    procedureHints: ["LASIK Surgery", "ICL Surgery"],
  },
  {
    id: "cataract",
    label: "Cloudy vision, glare, halos or night vision trouble",
    procedureHints: [
      "Cataract Surgery",
      "Trifocal IOL Surgery",
      "Multifocal IOL Surgery",
      "EDOF IOL Surgery",
    ],
  },
  {
    id: "retina",
    label: "Floaters, flashes, diabetes-related vision changes",
    procedureHints: ["Retinal Surgery", "Retinal Injections"],
  },
  {
    id: "glaucoma",
    label: "High eye pressure / glaucoma concerns",
    procedureHints: ["Glaucoma Treatment"],
  },
  {
    id: "cornea",
    label: "Cornea issues / persistent blurred or painful vision",
    procedureHints: ["Corneal Transplant Surgery"],
  },
  {
    id: "children",
    label: "Child eye issues (squint, lazy eye, myopia)",
    procedureHints: ["Pediatric Eye Care", "Squint Correction Surgery"],
  },
  {
    id: "aesthetics",
    label: "Eyelid, under-eye or ocular aesthetics",
    procedureHints: ["Oculoplastic Surgery & Botox", "Skin Type Ocular Aesthetics"],
  },
  {
    id: "other",
    label: "Not sure / something else",
    procedureHints: [],
  },
];

export default function LeadChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [leadIntent, setLeadIntent] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [showAllProcedures, setShowAllProcedures] = useState(false);
  const [name, setName] = useState("");
  const [step, setStep] = useState<"symptom" | "procedure" | "name" | "phone" | "done">("symptom");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const autoOpened = useRef(false);
  const hasPrompted = useRef(false);

  const pageTitle = useMemo(() => {
    if (typeof document === "undefined") return "";
    return document.title || "";
  }, [pathname]);
  const intentHint = useMemo(() => inferPageIntent(pathname, pageTitle), [pathname, pageTitle]);
  const treatmentOptions = useMemo(() => TREATMENT_LINKS.map((link) => readableTreatmentLabel(link.label)), []);
  const recommendedProcedures = useMemo(() => {
    if (!selectedSymptom || selectedSymptom === "Not sure / something else") return treatmentOptions.slice(0, 4);
    const symptomConfig = symptomFlows.find((flow) => flow.label === selectedSymptom);
    if (!symptomConfig || symptomConfig.procedureHints.length === 0) return treatmentOptions.slice(0, 4);
    const prioritized = treatmentOptions.filter((treatment) =>
      symptomConfig.procedureHints.some((hint) => treatment.toLowerCase().includes(hint.toLowerCase()))
    );
    return prioritized.length > 0 ? prioritized : treatmentOptions.slice(0, 4);
  }, [selectedSymptom, treatmentOptions]);
  const procedureOptions = useMemo(() => {
    if (!showAllProcedures) return recommendedProcedures;
    const deduped = [...recommendedProcedures, ...treatmentOptions];
    return deduped.filter((option, index) => deduped.indexOf(option) === index);
  }, [recommendedProcedures, showAllProcedures, treatmentOptions]);

  useEffect(() => {
    if (autoOpened.current) return;
    autoOpened.current = true;
    const hasOpenedBefore = localStorage.getItem("isight-chat-opened-once");
    if (hasOpenedBefore) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem("isight-chat-opened-once", "1");
    }, 5000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen || hasPrompted.current) return;
    hasPrompted.current = true;
    setMessages([{ id: crypto.randomUUID(), role: "bot", text: chatStarter(intentHint) }]);
  }, [isOpen, intentHint]);

  async function submitLead(
    intentValue: string,
    nameValue: string,
    phoneValue: string,
    transcript: ChatMessage[]
  ) {
    setIsSending(true);
    setSendError("");

    try {
      const response = await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: intentValue,
          name: nameValue,
          phone: phoneValue,
          pagePath: pathname,
          pageTitle,
          transcript,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: "Perfect, thank you. Our team will reach out shortly.",
        },
      ]);
      setStep("done");
      setInput("");
    } catch {
      setSendError("Could not send details right now. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const value = input.trim();
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text: value };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (step === "symptom") {
      setSelectedSymptom(value);
      setLeadIntent(`Symptom: ${value}`);
      setShowAllProcedures(false);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: "Thanks. Which treatment are you interested in exploring first?",
        },
      ]);
      setStep("procedure");
      return;
    }

    if (step === "procedure") {
      setSelectedProcedure(value);
      setLeadIntent(`Symptom: ${selectedSymptom || "Not specified"} | Procedure interest: ${value}`);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", text: "Great. May I have your name?" }]);
      setStep("name");
      return;
    }

    if (step === "name") {
      setName(value);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "bot", text: "Thanks. Please share your phone number." },
      ]);
      setStep("phone");
      return;
    }

    if (step === "phone") {
      const finalTranscript = [...messages, userMessage];
      await submitLead(leadIntent, name || "Not provided", value, finalTranscript);
    }
  }

  function handleSymptomSelect(option: string) {
    if (step !== "symptom" || isSending) return;
    setSelectedSymptom(option);
    setLeadIntent(`Symptom: ${option}`);
    setShowAllProcedures(false);
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: option },
      {
        id: crypto.randomUUID(),
        role: "bot",
        text: "Based on that, choose a treatment you'd like to discuss.",
      },
    ]);
    setStep("procedure");
  }

  function handleProcedureSelect(option: string) {
    if (step !== "procedure" || isSending) return;
    setSelectedProcedure(option);
    setLeadIntent(`Symptom: ${selectedSymptom || "Not specified"} | Procedure interest: ${option}`);
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: option },
      { id: crypto.randomUUID(), role: "bot", text: "Great choice. May I have your name?" },
    ]);
    setStep("name");
  }

  function resetFlow() {
    setMessages([{ id: crypto.randomUUID(), role: "bot", text: chatStarter(intentHint) }]);
    setLeadIntent("");
    setSelectedSymptom("");
    setSelectedProcedure("");
    setName("");
    setInput("");
    setShowAllProcedures(false);
    setStep("symptom");
    setSendError("");
  }

  const stepLabel =
    step === "symptom"
      ? "Step 1 of 4 - Symptom"
      : step === "procedure"
      ? "Step 2 of 4 - Procedure"
      : step === "name"
      ? "Step 3 of 4 - Name"
      : step === "phone"
      ? "Step 4 of 4 - Phone"
      : "Done";

  return (
    <div className="fixed bottom-5 right-5 z-[90]">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            localStorage.setItem("isight-chat-opened-once", "1");
          }}
          className="inline-flex items-center gap-2 rounded-full bg-clinical-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-clinical-500/30 transition hover:bg-clinical-400"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-4 w-4" />
          Chat with us
        </button>
      ) : (
        <section className="w-[360px] overflow-hidden rounded-2xl border border-clinical-200/40 bg-navy-950/95 shadow-2xl backdrop-blur">
          <header className="flex items-center justify-between border-b border-navy-800 bg-gradient-to-r from-navy-900 to-navy-950 px-4 py-3">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getImageUrl("/icon-logo.webp")}
                alt="iSight Eye Care"
                className="h-8 w-8 rounded-full border border-clinical-400/40 bg-white/95 object-cover object-left"
                loading="eager"
                decoding="async"
              />
              <div>
                <p className="text-sm font-semibold text-white">iSight Eye Care</p>
                <p className="text-xs font-medium text-clinical-200">Vision Concierge</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {step !== "done" && step !== "symptom" && (
                <button
                  type="button"
                  onClick={resetFlow}
                  className="rounded-lg border border-clinical-400/60 bg-clinical-500/15 px-2.5 py-1.5 text-xs font-semibold text-clinical-100 transition hover:bg-clinical-500/25"
                >
                  Start over
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-navy-600 bg-navy-900/70 px-2.5 py-1.5 text-xs font-semibold text-silver-100 transition hover:border-navy-400 hover:bg-navy-800"
                aria-label="Close chat assistant"
              >
                <X className="h-3.5 w-3.5" />
                Close chat
              </button>
            </div>
          </header>

          <div className="max-h-[360px] space-y-3 overflow-y-auto px-3 py-3">
            {step !== "done" && (
              <p className="inline-flex rounded-full border border-clinical-400/40 bg-clinical-500/10 px-2.5 py-1 text-[11px] font-semibold text-clinical-100">
                {stepLabel}
              </p>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  message.role === "bot"
                    ? "bg-navy-900/95 text-silver-100"
                    : "ml-auto bg-clinical-500 text-white"
                }`}
              >
                {message.text}
              </div>
            ))}
            {step === "symptom" && (
              <div className="rounded-xl border border-navy-800 bg-navy-900/70 p-2">
                <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-silver-100">
                  Step 1: What symptom are you facing?
                </p>
                <div className="max-h-44 space-y-1 overflow-y-auto pr-1">
                  {symptomFlows.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSymptomSelect(option.label)}
                      className="w-full rounded-lg border border-navy-700 bg-navy-950 px-2.5 py-2 text-left text-sm text-silver-100 transition hover:border-clinical-400 hover:bg-navy-800"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === "procedure" && (
              <div className="rounded-xl border border-navy-800 bg-navy-900/70 p-2">
                <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-silver-100">
                  Step 2: Which procedure do you want to discuss?
                </p>
                <p className="mb-2 px-1 text-[11px] text-clinical-100/90">
                  Recommended based on your symptom. You can also open the full treatment list.
                </p>
                <div className="max-h-44 space-y-1 overflow-y-auto pr-1">
                  {procedureOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleProcedureSelect(option)}
                      className={`w-full rounded-lg border px-2.5 py-2 text-left text-sm transition ${
                        selectedProcedure === option
                          ? "border-clinical-400 bg-navy-800 text-white"
                          : "border-navy-700 bg-navy-950 text-silver-100 hover:border-clinical-400 hover:bg-navy-800"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {!showAllProcedures && (
                  <button
                    type="button"
                    onClick={() => setShowAllProcedures(true)}
                    className="mt-2 w-full rounded-lg border border-clinical-400/50 bg-clinical-500/15 px-2 py-1.5 text-xs font-medium text-clinical-100 transition hover:bg-clinical-500/25"
                  >
                    Show all treatments
                  </button>
                )}
              </div>
            )}
            {sendError && <p className="text-xs text-red-300">{sendError}</p>}
          </div>

          <form onSubmit={handleSend} className="border-t border-navy-800 p-3">
            <div className="flex items-center gap-2 rounded-xl border border-navy-700 bg-navy-900/95 px-2 py-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  step === "done"
                    ? "Conversation complete"
                    : step === "symptom"
                    ? "Choose a symptom above or type here"
                    : step === "procedure"
                    ? "Choose a treatment above or type here"
                    : step === "name"
                    ? "Enter your name"
                    : step === "phone"
                    ? "Enter your phone number"
                    : "Tell us what you need help with"
                }
                disabled={step === "done" || isSending}
                className="w-full bg-transparent px-2 py-2 text-sm text-silver-100 placeholder:text-silver-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || step === "done" || isSending}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-clinical-500 text-white transition hover:bg-clinical-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
