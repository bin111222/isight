import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "refractive-surgery-eligibility-criteria-india",
  title: "Eligibility Criteria for Refractive Surgery in India: Complete Candidacy Guide",
  description:
    "Who qualifies for LASIK, SMILE, PRK, and ICL in India? Age, prescription limits, corneal thickness, dry eye, and health factors explained clearly.",
  date: "2026-06-24",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "refractive-surgery-eligibility-criteria-india",
  sections: [
    {
      heading: "Who Is Eligible for Refractive Surgery in India?",
      body: "Eligibility criteria for refractive surgery depend on your age, prescription stability, corneal anatomy, tear film health, and overall eye health—not just your desire to stop wearing glasses. A thorough pre-operative workup at a reputable centre determines whether LASIK, SMILE, PRK, or ICL is safest for you. No ethical surgeon will confirm candidacy without corneal topography, pachymetry, and a dilated retinal examination.",
    },
    {
      heading: "General Eligibility Criteria",
      list: [
        "Age 18+ with stable prescription for at least 12 months (some surgeons prefer 21+)",
        "Myopia typically up to -12.00 D, hyperopia up to +6.00 D, astigmatism up to 6.00 D—limits vary by procedure",
        "Adequate corneal thickness after accounting for flap depth and tissue removal",
        "Healthy corneas without keratoconus, significant scarring, or active infection",
        "No uncontrolled diabetes, autoimmune conditions affecting healing, or pregnancy/nursing",
        "Realistic expectations about outcomes and awareness of possible side effects",
      ],
    },
    {
      heading: "Procedure-Specific Eligibility",
      table: {
        headers: ["Procedure", "Best Suited For", "Common Exclusions"],
        rows: [
          ["LASIK", "Stable prescription, adequate corneal thickness", "Thin cornea, irregular topography, severe dry eye"],
          ["SMILE", "Myopia and astigmatism, active lifestyles", "Hyperopia, very high astigmatism (platform-dependent)"],
          ["PRK", "Thin corneas, athletes at contact injury risk", "Slow healers, occupations requiring rapid visual recovery"],
          ["ICL", "High myopia, thin corneas, LASIK not suitable", "Shallow anterior chamber, narrow angles, uncontrolled glaucoma"],
          ["Contoura Vision", "Irregular corneas, quality-of-vision priority", "Same corneal thickness requirements as LASIK"],
        ],
      },
    },
    {
      heading: "Tests Required Before Refractive Surgery",
      list: [
        "Corneal topography and tomography—to detect keratoconus and irregular astigmatism",
        "Pachymetry—central corneal thickness measurement",
        "Wavefront aberrometry—for personalised treatment planning",
        "Dry eye assessment—tear break-up time, Schirmer test, meibomian evaluation",
        "Dilated retinal exam—to rule out retinal holes, tears, or pathology",
        "Pupil size mapping in dim light—for night vision risk assessment",
      ],
    },
    {
      heading: "Book an Eligibility Assessment",
      body: "At iSight Eye Care, Dr. Nikhil Nasta conducts detailed candidacy evaluations and recommends the safest procedure—not the most profitable one. If you have been told you are not a LASIK candidate, a second opinion may reveal PRK, SMILE, or ICL options.\n\nhttps://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Can I get LASIK if I am over 40?",
      a: "Yes, if your corneas are healthy and prescription is stable—but you may need reading glasses afterward. Lens-based options (ICL, RLE) are sometimes better for presbyopia.",
    },
    {
      q: "Is LASIK possible with thin corneas?",
      a: "Often not with standard LASIK. PRK, SMILE, or ICL may be safer alternatives depending on exact thickness and prescription.",
    },
    {
      q: "Can dry eye patients have refractive surgery?",
      a: "Mild dry eye can often be optimised before surgery. Moderate to severe dry eye may disqualify you from LASIK or require treatment first.",
    },
    {
      q: "How long must my prescription be stable?",
      a: "Most surgeons require 12 months of stability. A change greater than 0.50 D in that period usually means waiting longer.",
    },
  ],
};

export default post;
