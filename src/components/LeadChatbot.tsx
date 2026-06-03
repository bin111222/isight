"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { TREATMENT_LINKS } from "@/lib/sitemap";
import { getImageUrl } from "@/lib/imageUrl";

const AUTO_OPEN_KEY = "isight-chat-opened-once";
const BOT_REPLY_DELAY_MS = 750;

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
  if (normalized.includes("lasik") || normalized.includes("power"))
    return "blurred vision and wanting freedom from glasses";
  if (normalized.includes("cataract")) return "cloudy vision, glare, or night driving difficulty";
  if (normalized.includes("retina")) return "floaters, flashes, or sudden vision changes";
  if (normalized.includes("glaucoma")) return "eye pressure concerns or glaucoma follow-up";
  if (normalized.includes("children") || normalized.includes("pediatric")) return "a child eye concern";
  return null;
}

function chatStarter(intent: string | null): string {
  if (intent) {
    return `Hi there! Welcome to iSight Eye Care. Are you here for ${intent}? Pick the symptom that fits best, or type your own.`;
  }
  return "Hi there! Welcome to iSight Eye Care. What eye symptom can we help you with today?";
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

function MessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.role === "bot";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
        isBot
          ? "border border-silver-200 bg-white text-navy-900 shadow-sm"
          : "ml-auto bg-clinical-500 text-white shadow-sm"
      }`}
    >
      {message.text}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="inline-flex items-center gap-1 rounded-2xl border border-silver-200 bg-white px-3.5 py-3 shadow-sm"
      aria-label="Assistant is typing"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-clinical-400"
          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}

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
  const [isTyping, setIsTyping] = useState(false);
  const [sendError, setSendError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasPrompted = useRef(false);

  const pageTitle = useMemo(() => {
    if (typeof document === "undefined") return "";
    return document.title || "";
  }, [pathname]);
  const intentHint = useMemo(() => inferPageIntent(pathname, pageTitle), [pathname, pageTitle]);
  const treatmentOptions = useMemo(
    () => TREATMENT_LINKS.map((link) => readableTreatmentLabel(link.label)),
    []
  );
  const recommendedProcedures = useMemo(() => {
    if (!selectedSymptom || selectedSymptom === "Not sure / something else")
      return treatmentOptions.slice(0, 4);
    const symptomConfig = symptomFlows.find((flow) => flow.label === selectedSymptom);
    if (!symptomConfig || symptomConfig.procedureHints.length === 0)
      return treatmentOptions.slice(0, 4);
    const prioritized = treatmentOptions.filter((treatment) =>
      symptomConfig.procedureHints.some((hint) =>
        treatment.toLowerCase().includes(hint.toLowerCase())
      )
    );
    return prioritized.length > 0 ? prioritized : treatmentOptions.slice(0, 4);
  }, [selectedSymptom, treatmentOptions]);
  const procedureOptions = useMemo(() => {
    if (!showAllProcedures) return recommendedProcedures;
    const deduped = [...recommendedProcedures, ...treatmentOptions];
    return deduped.filter((option, index) => deduped.indexOf(option) === index);
  }, [recommendedProcedures, showAllProcedures, treatmentOptions]);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  }, []);

  const queueBotReply = useCallback(
    async (text: string) => {
      setIsTyping(true);
      scrollToBottom();
      await new Promise((resolve) => setTimeout(resolve, BOT_REPLY_DELAY_MS));
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", text }]);
      setIsTyping(false);
    },
    [scrollToBottom]
  );

  useEffect(() => {
    const hasOpenedBefore = localStorage.getItem(AUTO_OPEN_KEY);
    if (hasOpenedBefore) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem(AUTO_OPEN_KEY, "1");
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen || hasPrompted.current) return;
    hasPrompted.current = true;
    void queueBotReply(chatStarter(intentHint));
  }, [isOpen, intentHint, queueBotReply]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, step, showAllProcedures, scrollToBottom]);

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

      await queueBotReply("Perfect — thank you. Our team will reach out shortly.");
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
    if (!input.trim() || isSending || isTyping) return;

    const value = input.trim();
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text: value };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (step === "symptom") {
      setSelectedSymptom(value);
      setLeadIntent(`Symptom: ${value}`);
      setShowAllProcedures(false);
      setStep("procedure");
      await queueBotReply("Thanks. Which treatment would you like to explore?");
      return;
    }

    if (step === "procedure") {
      setSelectedProcedure(value);
      setLeadIntent(`Symptom: ${selectedSymptom || "Not specified"} | Procedure interest: ${value}`);
      setStep("name");
      await queueBotReply("Great. May I have your name?");
      return;
    }

    if (step === "name") {
      setName(value);
      setStep("phone");
      await queueBotReply("Thanks. Please share your phone number.");
      return;
    }

    if (step === "phone") {
      const finalTranscript = [...messages, userMessage];
      await submitLead(leadIntent, name || "Not provided", value, finalTranscript);
    }
  }

  async function handleSymptomSelect(option: string) {
    if (step !== "symptom" || isSending || isTyping) return;
    setSelectedSymptom(option);
    setLeadIntent(`Symptom: ${option}`);
    setShowAllProcedures(false);
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: option }]);
    setStep("procedure");
    await queueBotReply("Got it. Here are treatments that usually help — pick one to discuss.");
  }

  async function handleProcedureSelect(option: string) {
    if (step !== "procedure" || isSending || isTyping) return;
    setSelectedProcedure(option);
    setLeadIntent(`Symptom: ${selectedSymptom || "Not specified"} | Procedure interest: ${option}`);
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: option }]);
    setStep("name");
    await queueBotReply("Great choice. May I have your name?");
  }

  function resetFlow() {
    setMessages([]);
    setLeadIntent("");
    setSelectedSymptom("");
    setSelectedProcedure("");
    setName("");
    setInput("");
    setShowAllProcedures(false);
    setStep("symptom");
    setSendError("");
    setIsTyping(false);
    void queueBotReply(chatStarter(intentHint));
  }

  function openChat() {
    setIsOpen(true);
    localStorage.setItem(AUTO_OPEN_KEY, "1");
  }

  return (
    <div className="fixed bottom-5 right-5 z-[90]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="launcher"
            type="button"
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.25 }}
            onClick={openChat}
            className="inline-flex items-center gap-2 rounded-full bg-clinical-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-clinical-500/30 transition hover:bg-clinical-400"
            aria-label="Open chat assistant"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with us
          </motion.button>
        ) : (
          <motion.section
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-[360px] overflow-hidden rounded-2xl border border-silver-300 bg-white/95 shadow-2xl backdrop-blur-sm"
          >
            <header className="flex items-center justify-between border-b border-silver-200 bg-gradient-to-r from-silver-100 to-white px-4 py-3">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl("/icon-logo.webp")}
                  alt="iSight Eye Care"
                  className="h-8 w-8 rounded-full border border-clinical-300 bg-white object-cover object-left"
                  loading="eager"
                  decoding="async"
                />
                <div>
                  <p className="text-sm font-semibold text-navy-900">iSight Eye Care</p>
                  <p className="text-xs font-medium text-clinical-600">Vision Concierge</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {step !== "done" && step !== "symptom" && (
                  <button
                    type="button"
                    onClick={resetFlow}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-clinical-300 bg-clinical-50 text-clinical-700 transition hover:bg-clinical-100"
                    aria-label="Start over"
                    title="Start over"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-silver-300 bg-white text-navy-700 transition hover:border-clinical-300 hover:bg-silver-100"
                  aria-label="Close chat assistant"
                  title="Close chat"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="no-scrollbar max-h-[360px] space-y-3 overflow-y-auto bg-gradient-to-b from-silver-100 to-silver-100/70 px-3 py-3"
            >
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

              <AnimatePresence mode="wait">
                {step === "symptom" && !isTyping && (
                  <motion.div
                    key="symptoms"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border border-silver-300 bg-white p-2 shadow-sm"
                  >
                    <div className="no-scrollbar max-h-44 space-y-1 overflow-y-auto pr-1">
                      {symptomFlows.map((option, index) => (
                        <motion.button
                          key={option.id}
                          type="button"
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04, duration: 0.22 }}
                          onClick={() => void handleSymptomSelect(option.label)}
                          className="w-full rounded-lg border border-silver-300 bg-white px-2.5 py-2 text-left text-sm text-navy-900 transition hover:border-clinical-400 hover:bg-clinical-50"
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === "procedure" && !isTyping && (
                  <motion.div
                    key="procedures"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border border-silver-300 bg-white p-2 shadow-sm"
                  >
                    <div className="no-scrollbar max-h-44 space-y-1 overflow-y-auto pr-1">
                      {procedureOptions.map((option, index) => (
                        <motion.button
                          key={option}
                          type="button"
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04, duration: 0.22 }}
                          onClick={() => void handleProcedureSelect(option)}
                          className={`w-full rounded-lg border px-2.5 py-2 text-left text-sm transition ${
                            selectedProcedure === option
                              ? "border-clinical-500 bg-clinical-500 text-white"
                              : "border-silver-300 bg-white text-navy-900 hover:border-clinical-400 hover:bg-clinical-50"
                          }`}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                    {!showAllProcedures && (
                      <button
                        type="button"
                        onClick={() => setShowAllProcedures(true)}
                        className="mt-2 w-full rounded-lg border border-clinical-300 bg-clinical-50 px-2 py-1.5 text-xs font-medium text-clinical-700 transition hover:bg-clinical-100"
                      >
                        Show all treatments
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {sendError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-600"
                >
                  {sendError}
                </motion.p>
              )}
            </div>

            <form onSubmit={handleSend} className="border-t border-silver-200 bg-white p-3">
              <div className="flex items-center gap-2 rounded-xl border border-silver-300 bg-white px-2 py-1 shadow-sm">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    step === "done"
                      ? "Conversation complete"
                      : step === "symptom"
                      ? "Type your symptom..."
                      : step === "procedure"
                      ? "Or type a treatment..."
                      : step === "name"
                      ? "Enter your name"
                      : step === "phone"
                      ? "Enter your phone number"
                      : "Message..."
                  }
                  disabled={step === "done" || isSending || isTyping}
                  className="w-full bg-transparent px-2 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || step === "done" || isSending || isTyping}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-clinical-500 text-white transition hover:bg-clinical-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
