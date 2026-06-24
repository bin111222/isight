"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { getImageUrl } from "@/lib/imageUrl";

const AUTO_OPEN_KEY = "isight-chat-opened-once";
const AUTO_OPEN_DELAY_MS = 4_000;
const BOT_REPLY_DELAY_MS = 750;

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

type FollowUpOption = {
  label: string;
  note: string;
};

type SymptomFlow = {
  id: string;
  label: string;
  keywords: string[];
  careArea: string;
  followUp?: {
    question: string;
    options: FollowUpOption[];
  };
  reassurance: string;
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
    return `Hi! I'm the iSight Vision Concierge. It sounds like you may be dealing with ${intent}. Does that sound right? Tap what fits best, or describe it in your own words.`;
  }
  return "Hi! I'm the iSight Vision Concierge. Tell me what's been bothering your eyes. Pick an option below or type it in your own words.";
}

function findSymptomFlow(input: string): SymptomFlow | undefined {
  const normalized = input.trim().toLowerCase();
  const exact = symptomFlows.find(
    (flow) => flow.label.toLowerCase() === normalized || flow.id === normalized
  );
  if (exact) return exact;

  return symptomFlows.find((flow) =>
    flow.keywords.some((keyword) => normalized.includes(keyword))
  );
}

function buildLeadIntent(symptom: string, flow: SymptomFlow | undefined, followUpNote?: string): string {
  const parts = [`Concern: ${symptom}`];
  if (flow?.careArea) parts.push(`Likely care area: ${flow.careArea}`);
  if (followUpNote) parts.push(`Detail: ${followUpNote}`);
  return parts.join(" | ");
}

function appendToIntent(current: string, note: string): string {
  return `${current} | User added: ${note}`;
}

function parseIndianPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10 && /^[6-9]/.test(digits)) return digits;
  if (digits.length === 12 && digits.startsWith("91") && /^91[6-9]/.test(digits)) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0") && /^0[6-9]/.test(digits)) return digits.slice(1);
  return null;
}

// True when the text reads like a sentence, question, or concern rather than a name.
function isLikelyRequestText(input: string): boolean {
  const trimmed = input.trim();
  if (/\?/.test(trimmed)) return true;
  if (trimmed.split(/\s+/).length > 5) return true;
  return /\b(please|recommend|suggest|give|help|want|need|concern|drops?|screen|hours?|protect|advice|tell|which|what|how|why|when|pain|hurt|problem|issue|use|using|frequently|symptom)\b/i.test(
    trimmed
  );
}

// Names are intentionally permissive: a single initial like "V" is valid.
// We only reject phone numbers and obvious sentences/concerns.
function looksLikeName(input: string): boolean {
  const trimmed = input.trim();
  if (trimmed.length < 1 || trimmed.length > 60) return false;
  if (parseIndianPhone(trimmed)) return false;
  if (isLikelyRequestText(trimmed)) return false;
  return /^[a-zA-Z][a-zA-Z\s'.-]*$/.test(trimmed);
}

function formatPhoneForDisplay(digits: string): string {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

const symptomFlows: SymptomFlow[] = [
  {
    id: "dry-eye",
    label: "Dryness, burning, irritation or watering",
    keywords: ["dry", "burning", "irritat", "watering", "gritty", "itch"],
    careArea: "Dry eye & surface care",
    followUp: {
      question: "How often does this bother you?",
      options: [
        { label: "Once in a while", note: "Occasional symptoms" },
        { label: "Most days", note: "Frequent daily symptoms" },
        { label: "Almost constantly", note: "Persistent daily symptoms" },
      ],
    },
    reassurance:
      "Dry, irritated eyes are very common and very treatable. Our team will look at what's driving it and suggest a plan that actually fits your day-to-day life.",
  },
  {
    id: "vision-correction",
    label: "Blurred vision / wanting less dependence on glasses",
    keywords: ["blur", "glasses", "contact", "lasik", "power", "spectacle"],
    careArea: "Vision correction (LASIK / ICL evaluation)",
    followUp: {
      question: "What best describes your situation?",
      options: [
        { label: "I've worn glasses or contacts for years", note: "Long-term refractive correction" },
        { label: "My prescription changed recently", note: "Recent prescription change" },
        { label: "I'm exploring this for a family member", note: "Inquiry for family member" },
      ],
    },
    reassurance:
      "Many people come to us hoping for clearer vision with less reliance on glasses. We'll examine your eyes and explain whether LASIK, ICL, or another option makes sense. No pressure to decide today.",
  },
  {
    id: "cataract",
    label: "Cloudy vision, glare, halos or night driving trouble",
    keywords: ["cloudy", "cataract", "glare", "halo", "night", "driving", "dim"],
    careArea: "Cataract evaluation & lens options",
    followUp: {
      question: "What bothers you most day to day?",
      options: [
        { label: "Things look blurry or cloudy", note: "Primary blur/cloudiness" },
        { label: "Glare or halos, especially at night", note: "Glare/halos, night driving" },
        { label: "Both: vision feels unreliable", note: "Combined blur and glare" },
        { label: "I'm not sure yet", note: "Unsure which symptom dominates" },
      ],
    },
    reassurance:
      "Cloudy vision and glare are common and often very treatable. Our cataract specialists will examine your eyes and walk you through options that match your lifestyle. You don't need to know which lens or surgery is right; that's what we're here for.",
  },
  {
    id: "retina",
    label: "Floaters, flashes or sudden vision changes",
    keywords: ["floater", "flash", "curtain", "sudden", "diabetes", "retina"],
    careArea: "Retina & vitreous evaluation",
    followUp: {
      question: "When did you first notice this?",
      options: [
        { label: "Today or very recently", note: "Acute onset, recent" },
        { label: "Over the past few weeks", note: "Subacute, weeks" },
        { label: "It's been going on for a while", note: "Chronic, ongoing" },
      ],
    },
    reassurance:
      "Floaters and flashes can be harmless, but new or sudden changes should be checked promptly. Our retina team will advise whether you need an urgent visit or routine follow-up.",
  },
  {
    id: "glaucoma",
    label: "Eye pressure or glaucoma follow-up",
    keywords: ["glaucoma", "pressure", "iop"],
    careArea: "Glaucoma care",
    followUp: {
      question: "What brings you in today?",
      options: [
        { label: "Newly diagnosed or suspected glaucoma", note: "New diagnosis concern" },
        { label: "Already on drops, need follow-up", note: "Existing treatment follow-up" },
        { label: "Family history, want screening", note: "Family history screening" },
      ],
    },
    reassurance:
      "Glaucoma is manageable when caught early and monitored well. We'll review your history, check your eye pressure, and outline a clear follow-up plan.",
  },
  {
    id: "cornea",
    label: "Cornea pain, redness or vision that won't clear up",
    keywords: ["cornea", "painful", "redness", "ulcer", "kerat"],
    careArea: "Cornea & anterior segment",
    reassurance:
      "Persistent cornea symptoms deserve a careful look. Our specialists will examine the surface of your eye and recommend the right next step.",
  },
  {
    id: "children",
    label: "A child's eye concern (squint, lazy eye, myopia)",
    keywords: ["child", "kid", "squint", "lazy", "myopia", "pediatric"],
    careArea: "Pediatric eye care",
    followUp: {
      question: "How old is the patient?",
      options: [
        { label: "Under 5 years", note: "Pediatric, under 5" },
        { label: "5 to 12 years", note: "Pediatric, 5 to 12" },
        { label: "Teenager (13+)", note: "Pediatric, teen" },
      ],
    },
    reassurance:
      "Children's eye issues are best addressed early. Our pediatric team will make your child comfortable and explain the options clearly to you as a parent.",
  },
  {
    id: "aesthetics",
    label: "Eyelid, under-eye or cosmetic eye concerns",
    keywords: ["eyelid", "under-eye", "aesthetic", "cosmetic", "droopy", "bag"],
    careArea: "Oculoplastics & ocular aesthetics",
    reassurance:
      "We can discuss eyelid and periocular concerns in a consultation and outline realistic options, medical or aesthetic, based on your goals.",
  },
  {
    id: "other",
    label: "Not sure / something else",
    keywords: [],
    careArea: "General ophthalmology consultation",
    reassurance:
      "That's completely okay. You don't need the right label to reach out. Share what you're experiencing and our team will guide you to the right specialist.",
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
  const [activeFlow, setActiveFlow] = useState<SymptomFlow | null>(null);
  const [name, setName] = useState("");
  const [pendingPhone, setPendingPhone] = useState("");
  const [step, setStep] = useState<"symptom" | "followup" | "name" | "phone" | "done">("symptom");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sendError, setSendError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasPrompted = useRef(false);
  const autoOpenTimerRef = useRef<number | null>(null);

  const markChatSeen = useCallback(() => {
    try {
      localStorage.setItem(AUTO_OPEN_KEY, "1");
    } catch {
      // localStorage may be unavailable in private browsing
    }
  }, []);

  const hasSeenChatBefore = useCallback(() => {
    try {
      return Boolean(localStorage.getItem(AUTO_OPEN_KEY));
    } catch {
      return false;
    }
  }, []);

  const pageTitle = useMemo(() => {
    if (typeof document === "undefined") return "";
    return document.title || "";
  }, [pathname]);
  const intentHint = useMemo(() => inferPageIntent(pathname, pageTitle), [pathname, pageTitle]);

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
    if (hasSeenChatBefore()) return;

    autoOpenTimerRef.current = window.setTimeout(() => {
      setIsOpen(true);
      markChatSeen();
    }, AUTO_OPEN_DELAY_MS);

    return () => {
      if (autoOpenTimerRef.current) {
        window.clearTimeout(autoOpenTimerRef.current);
        autoOpenTimerRef.current = null;
      }
    };
  }, [hasSeenChatBefore, markChatSeen]);

  useEffect(() => {
    if (!isOpen || hasPrompted.current) return;
    hasPrompted.current = true;
    void queueBotReply(chatStarter(intentHint));
  }, [isOpen, intentHint, queueBotReply]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, step, scrollToBottom]);

  const advanceAfterSymptom = useCallback(
    async (symptomLabel: string) => {
      const flow = findSymptomFlow(symptomLabel) ?? symptomFlows.find((f) => f.id === "other")!;
      setActiveFlow(flow);
      setSelectedSymptom(symptomLabel);
      setLeadIntent(buildLeadIntent(symptomLabel, flow));

      await queueBotReply("Thanks, that helps.");

      if (flow.followUp) {
        setStep("followup");
        await queueBotReply(flow.followUp.question);
        return;
      }

      setStep("name");
      await queueBotReply(flow.reassurance);
      await queueBotReply(
        "I'd like to connect you with our team so we can give you personalised advice. May I have your name?"
      );
    },
    [queueBotReply]
  );

  const advanceAfterFollowUp = useCallback(
    async (option: FollowUpOption) => {
      const flow = activeFlow ?? symptomFlows.find((f) => f.id === "other")!;
      const intent = buildLeadIntent(selectedSymptom, flow, option.note);
      setLeadIntent(intent);
      setStep("name");
      await queueBotReply(flow.reassurance);
      await queueBotReply(
        "I'd like to connect you with our team so we can give you personalised advice. May I have your name?"
      );
    },
    [activeFlow, queueBotReply, selectedSymptom]
  );

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

      await queueBotReply(
        "Thank you. We've got your details. Someone from our team will call you shortly to help with next steps."
      );
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
      await advanceAfterSymptom(value);
      return;
    }

    if (step === "followup") {
      const flow = activeFlow;
      const matched = flow?.followUp?.options.find(
        (opt) => opt.label.toLowerCase() === value.toLowerCase()
      );
      await advanceAfterFollowUp(
        matched ?? { label: value, note: `Free text: ${value}` }
      );
      return;
    }

    if (step === "name") {
      const earlyPhone = parseIndianPhone(value);
      if (earlyPhone && !looksLikeName(value)) {
        setPendingPhone(formatPhoneForDisplay(earlyPhone));
        await queueBotReply(
          "Thanks — I've noted your number. What name should our team ask for when they call?"
        );
        return;
      }

      if (!looksLikeName(value)) {
        setLeadIntent((prev) => appendToIntent(prev, value));
        await queueBotReply(
          "That's helpful — I've noted it. May I have your name so our team knows who to ask for?"
        );
        return;
      }

      setName(value);

      if (pendingPhone) {
        const finalTranscript = [...messages, userMessage];
        await submitLead(leadIntent, value, pendingPhone, finalTranscript);
        return;
      }

      setStep("phone");
      await queueBotReply(
        `Thank you, ${value.split(/\s+/)[0]}. What's the best mobile number to reach you on? (10 digits — our team will call with next steps.)`
      );
      return;
    }

    if (step === "phone") {
      const phone = parseIndianPhone(value);

      if (!phone) {
        if (/[a-zA-Z]/.test(value)) {
          setLeadIntent((prev) => appendToIntent(prev, value));
          await queueBotReply(
            "That's really helpful — our team can walk you through options that fit your routine. To have someone call you, please share your 10-digit mobile number."
          );
          return;
        }

        await queueBotReply(
          "That doesn't look like a valid mobile number. Please enter your 10-digit number (e.g. 98765 43210)."
        );
        return;
      }

      const finalTranscript = [...messages, userMessage];
      await submitLead(leadIntent, name || "Not provided", formatPhoneForDisplay(phone), finalTranscript);
    }
  }

  async function handleSymptomSelect(option: string) {
    if (step !== "symptom" || isSending || isTyping) return;
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: option }]);
    await advanceAfterSymptom(option);
  }

  async function handleFollowUpSelect(option: FollowUpOption) {
    if (step !== "followup" || isSending || isTyping) return;
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: option.label }]);
    await advanceAfterFollowUp(option);
  }

  function resetFlow() {
    setMessages([]);
    setLeadIntent("");
    setSelectedSymptom("");
    setActiveFlow(null);
    setName("");
    setPendingPhone("");
    setInput("");
    setStep("symptom");
    setSendError("");
    setIsTyping(false);
    void queueBotReply(chatStarter(intentHint));
  }

  function openChat() {
    if (autoOpenTimerRef.current) {
      window.clearTimeout(autoOpenTimerRef.current);
      autoOpenTimerRef.current = null;
    }
    setIsOpen(true);
    markChatSeen();
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

                {step === "followup" && activeFlow?.followUp && !isTyping && (
                  <motion.div
                    key="followup"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border border-silver-300 bg-white p-2 shadow-sm"
                  >
                    <div className="no-scrollbar max-h-44 space-y-1 overflow-y-auto pr-1">
                      {activeFlow.followUp.options.map((option, index) => (
                        <motion.button
                          key={option.label}
                          type="button"
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04, duration: 0.22 }}
                          onClick={() => void handleFollowUpSelect(option)}
                          className="w-full rounded-lg border border-silver-300 bg-white px-2.5 py-2 text-left text-sm text-navy-900 transition hover:border-clinical-400 hover:bg-clinical-50"
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </div>
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
                  type={step === "phone" ? "tel" : "text"}
                  inputMode={step === "phone" ? "tel" : step === "name" ? "text" : undefined}
                  autoComplete={step === "phone" ? "tel" : step === "name" ? "name" : "off"}
                  placeholder={
                    step === "done"
                      ? "Conversation complete"
                      : step === "symptom"
                      ? "Describe your concern..."
                      : step === "followup"
                      ? "Or type your answer..."
                      : step === "name"
                      ? "Your full name"
                      : step === "phone"
                      ? "10-digit mobile number"
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
