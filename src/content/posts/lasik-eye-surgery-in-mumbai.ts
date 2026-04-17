import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "lasik-eye-surgery-in-mumbai",
  title: "LASIK Eye Surgery in Mumbai: Procedure, Recovery and Results",
  description:
    "Complete Mumbai guide to LASIK eye surgery covering procedure steps, available types, candidacy, recovery timeline, results, and common risks.",
  date: "2026-04-17",
  image: "lasik-eye-surgery-in-mumbai",
  sections: [
    {
      body: "LASIK eye surgery in Mumbai is a fast day-care procedure designed to reduce dependence on spectacles and contact lenses. In most eligible patients, the surgery for both eyes takes around 10 to 15 minutes in the laser room, with visible improvement in vision within 6 to 24 hours.\n\nModern refractive centres in Mumbai offer multiple options including Standard LASIK, Femto LASIK, Contoura Vision, SMILE, and SILK. The right choice depends on your corneal profile, eye power, dry-eye status, and lifestyle needs.",
    },
    {
      heading: "How LASIK Works: Step-by-Step",
      list: [
        "Numbing drops are applied and you remain awake throughout",
        "An eyelid holder prevents blinking during treatment",
        "A corneal flap is created (or flapless technique is used in SMILE)",
        "The excimer or femtosecond laser reshapes corneal tissue",
        "The flap is repositioned without stitches (for LASIK variants)",
        "You rest briefly and go home the same day with post-op drops",
      ],
    },
    {
      heading: "Types of LASIK Offered in Mumbai",
      table: {
        headers: ["Procedure", "Typical use case", "Recovery profile", "Cost per eye (₹)"],
        rows: [
          ["Standard LASIK", "Routine powers with healthy cornea", "Fast", "20,000-40,000"],
          ["Femto / Bladeless LASIK", "Precision-focused candidates", "Fast", "55,000-85,000"],
          ["Contoura Vision", "Irregular corneal map / night driving needs", "Fast", "75,000-1,00,000"],
          ["SMILE", "High myopia, active lifestyle, dry-eye-prone eyes", "Moderate-fast", "80,000-1,05,000"],
          ["SILK", "Latest flapless solid-state platform seekers", "Fast", "90,000-1,10,000"],
          ["Trans-PRK", "Thin or borderline corneas", "Slower", "40,000-70,000"],
        ],
      },
    },
    {
      heading: "Who Is a Good Candidate?",
      list: [
        "Age 18+ with stable spectacle power for at least one year",
        "Suitable corneal thickness and regular topography",
        "No active corneal disease, infection, or uncontrolled dry eye",
        "No uncontrolled diabetes or high-risk autoimmune conditions",
        "Not pregnant or breastfeeding during evaluation and surgery window",
      ],
    },
    {
      heading: "Pre-LASIK Tests in a Proper Mumbai Workup",
      body: "A proper LASIK workup usually takes 90 to 120 minutes and includes cycloplegic refraction, corneal topography, pachymetry, tear film analysis, pupillometry, intraocular pressure checks, and a dilated retina exam. This screening stage is essential for safety and long-term stability.",
    },
    {
      heading: "Recovery Timeline (Realistic)",
      table: {
        headers: ["Phase", "What most patients feel", "Typical guidance"],
        rows: [
          ["First 6 hours", "Watering, light sensitivity, blurry vision", "Rest with eyes closed and use drops as advised"],
          ["Day 1", "Clearer vision but mild grittiness", "Mandatory follow-up check"],
          ["Days 2-3", "Vision fluctuations can occur", "Many desk workers return to work"],
          ["Week 1", "Improving comfort and clarity", "Avoid rubbing, swimming, and dusty environments"],
          ["Weeks 2-4", "Stable daytime vision for most patients", "Gradual return to exercise per surgeon advice"],
          ["Month 1-3", "Near-final stability", "Lubricating drops may continue"],
        ],
      },
    },
    {
      heading: "Expected Results and Risks",
      body: "In properly screened candidates, LASIK outcomes are consistently strong: most patients reach driving-standard unaided vision and a high percentage achieve 20/20 or better. Temporary dry eye, glare, and mild vision fluctuation are common early effects that typically improve with healing.\n\nSerious complications are uncommon when surgeon-led screening and post-op protocol are followed. The most important predictor of safety is good candidacy selection, not price alone.",
    },
  ],
  faqs: [
    {
      q: "Is LASIK painful?",
      a: "LASIK is usually painless during surgery because topical anesthetic drops numb the eye. Mild discomfort or grittiness may occur for a few hours after the procedure.",
    },
    {
      q: "How long does LASIK surgery take in Mumbai?",
      a: "Laser room time is usually 10 to 15 minutes for both eyes, while total clinic time on surgery day is generally 1.5 to 3 hours including prep and post-op checks.",
    },
    {
      q: "When can I return to work?",
      a: "Many patients return to desk work in 2 to 3 days, depending on comfort, screen use demands, and surgeon clearance.",
    },
    {
      q: "Can LASIK be done for both eyes on the same day?",
      a: "Yes. Same-day bilateral LASIK is standard practice in modern refractive centres.",
    },
    {
      q: "Is LASIK permanent?",
      a: "The corneal reshaping is permanent, but natural age-related vision changes can still occur later, especially near-vision changes after 40.",
    },
  ],
};

export default post;
