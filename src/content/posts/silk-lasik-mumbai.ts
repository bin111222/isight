import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "silk-lasik-mumbai",
  title: "SILK LASIK in Mumbai: The Newest Bladeless Procedure Explained",
  description:
    "SILK LASIK Mumbai guide covering flapless workflow, SMILE comparison, candidacy, early evidence, and cost expectations.",
  date: "2026-05-24",
  image: "silk-lasik-mumbai",
  sections: [
    {
      body: "SILK is a newer flapless lenticule-based vision correction approach available at select Mumbai centres. It is often compared with SMILE because both avoid corneal flap creation and aim for lower post-op dryness risk than flap-based LASIK.",
    },
    {
      heading: "SILK vs SMILE vs Femto LASIK",
      table: {
        headers: ["Feature", "Femto LASIK", "SMILE", "SILK"],
        rows: [
          ["Flapless", "No", "Yes", "Yes"],
          ["Hyperopia treatment", "Yes", "No", "No"],
          ["Evidence maturity", "High", "High", "Early to moderate"],
          ["Dry-eye profile", "Moderate", "Lower", "Lower"],
          ["Mumbai per-eye cost (₹)", "55,000-85,000", "80,000-1,05,000", "90,000-1,10,000"],
        ],
      },
    },
    {
      heading: "Who Is a Suitable Candidate",
      list: [
        "Myopia and myopic astigmatism profiles within safe treatment limits",
        "Patients seeking flapless architecture",
        "Dry-eye-prone or contact-sport lifestyle candidates",
        "Patients evaluated at centres with platform-specific surgeon expertise",
      ],
    },
    {
      heading: "Important Caveat",
      body: "SILK has encouraging short-term outcomes, but long-term evidence is still smaller compared with SMILE and Femto LASIK. Procedure choice should be based on your corneal profile and surgeon experience with that exact platform, not novelty alone.",
    },
    {
      heading: "Cost in Mumbai",
      body: "SILK is generally the highest-priced laser vision option in Mumbai in 2026, often around ₹90,000 to ₹1,10,000 per eye and roughly ₹1,80,000 to ₹2,20,000 for both eyes depending on package inclusions.",
    },
  ],
  faqs: [
    {
      q: "Is SILK better than SMILE?",
      a: "Not universally. SILK is newer and promising, while SMILE has a much deeper long-term evidence base.",
    },
    {
      q: "Can SILK treat hyperopia?",
      a: "No, it is primarily used for myopia and myopic astigmatism.",
    },
    {
      q: "How much does SILK cost in Mumbai?",
      a: "Commonly around ₹90,000 to ₹1,10,000 per eye in 2026.",
    },
    {
      q: "Who should avoid SILK?",
      a: "Patients with unsuitable corneal profiles, hyperopic requirements, or cases where another modality provides stronger evidence-backed fit.",
    },
  ],
};

export default post;
