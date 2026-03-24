import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "lasik-second-opinion-before-surgery-why-it-matters",
  title: "LASIK Second Opinion Before Surgery: Why It Matters",
  description:
    "A second opinion can prevent avoidable LASIK mistakes in borderline cases. Learn when to seek one and what to compare between clinics.",
  date: "2026-03-24",
  image: "lasik-second-opinion-before-surgery-why-it-matters",
  sections: [
    { heading: "Why Take a Second Opinion?", body: "LASIK decisions are anatomy-specific. A second opinion helps confirm candidacy, treatment type, and safety margins when recommendations differ or feel rushed." },
    { heading: "Cases Where It Is Strongly Recommended", list: ["High eye power", "Thin/borderline cornea", "Dry-eye history", "Different advice from different clinics", "Unclear explanation of risk"] },
    { heading: "What to Compare Between Opinions", list: ["Corneal map interpretation", "Residual bed safety calculation", "Dry-eye management plan", "Procedure alternatives discussed", "Post-op follow-up protocol"] },
    { heading: "Good Surgeon Behavior", body: "A confident surgeon will not discourage second opinions. Ethical refractive practice welcomes informed patient decisions." },
    { heading: "How to Prepare for the Visit", list: ["Carry prior reports", "Carry current and older prescriptions", "Share contact-lens history", "Ask for written recommendations"] },
    { heading: "Conclusion", body: "Second opinion is often the smartest step for long-term confidence. Better to delay surgery by a few days than make a rushed decision you regret." },
  ],
  faqs: [
    { q: "Will second opinion confuse me more?", a: "Usually it clarifies decision points when you compare data, not just marketing." },
    { q: "Is second opinion necessary if first clinic is reputed?", a: "Not always, but very useful in borderline or high-risk profiles." },
    { q: "Can both opinions be correct?", a: "Yes, but one option may be safer for your specific anatomy." },
    { q: "Should I do surgery where I took first opinion?", a: "Choose based on best clinical fit and trust in explanation quality." },
  ],
};

export default post;
