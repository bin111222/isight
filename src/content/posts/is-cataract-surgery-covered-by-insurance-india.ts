import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "is-cataract-surgery-covered-by-insurance-india",
  title: "Is Cataract Surgery Covered by Insurance in India?",
  description:
    "Yes — medically necessary cataract surgery is usually covered by Indian health insurance. Premium lenses and laser upgrades are often extra. Learn what to check.",
  date: "2026-09-12",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "is-cataract-surgery-covered-by-insurance-india",
  sections: [
    {
      body: "Yes. Unlike elective LASIK, cataract surgery is treated as medically necessary in India, so most indemnity health policies, many corporate group plans, and government schemes cover a standard phaco procedure and a basic monofocal lens once waiting periods and sub-limits are met. Premium IOLs (toric, EDOF, trifocal), laser-assisted upgrades, and a private-room difference are frequently billed as you-pay extras. Always pre-authorise; do not assume the package on a website matches your policy.",
    },
    {
      heading: "What Insurance Usually Pays vs What You Pay",
      table: {
        headers: ["Item", "Typically covered?", "Notes"],
        rows: [
          [
            "Medically indicated cataract (phaco) with monofocal IOL",
            "Usually yes",
            "After waiting period; subject to sum insured, sub-limit, and network hospital rules",
          ],
          [
            "Pre-op tests billed as part of the admission",
            "Often partly",
            "OPD diagnostics before admission may fall outside the cashless file",
          ],
          [
            "Toric / EDOF / trifocal (premium) lens upgrade",
            "Often no, or only the monofocal equivalent",
            "You pay the lens difference; get this in writing",
          ],
          [
            "Femtosecond / “robotic” laser add-on",
            "Usually no",
            "An elective technology upgrade, not a medical necessity",
          ],
          [
            "Ayushman Bharat / CGHS / ECHS / state schemes",
            "Package yes, lens choice limited",
            "Scheme rate may not equal a private premium package",
          ],
        ],
      },
    },
    {
      heading: "Waiting Periods and Fine Print That Catch People",
      list: [
        "Many retail policies have a 24-month waiting period for cataract — check your start date",
        "A cataract sub-limit (a cap far below the sum insured) can leave a large gap",
        "Day-care is usually allowed; cataract rarely needs overnight admission",
        "Both eyes are two claims. Same-week second-eye surgery still needs a second pre-auth in most cases",
        "If the policy is new and the cataract was already documented, some insurers call it a pre-existing condition",
      ],
    },
    {
      heading: "How to Avoid a Surprise Bill",
      body: "Ask the clinic for an itemised estimate: surgeon, facility, standard IOL, premium IOL difference, and drops. Send that to the TPA before you pick a date. Cashless is smoother at a network hospital; reimbursement is slower but possible elsewhere. If you want an EDOF or trifocal lens, decide with the surgeon first, then confirm what the insurer will not pay.",
    },
    {
      heading: "Transparent Cataract Planning at iSight",
      body: "iSight Eye Care in Mumbai will tell you which part of the plan is insurance-facing and which part is a lens upgrade. Dr. Nikhil Nasta does not pick a premium IOL because a brochure says so — only if the retina, cornea and your night-driving life support it.\n\nCataract packages: https://www.eyesurgeonmumbai.com/cataract-surgery-mumbai\n\nCost guide: https://www.eyesurgeonmumbai.com/post/cataract-surgery-cost-mumbai\n\nBook: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Is cataract surgery covered by health insurance in India?",
      a: "Usually yes, for a medically necessary procedure and a standard monofocal lens, after waiting periods. Premium lenses and laser add-ons are often self-pay.",
    },
    {
      q: "Does Ayushman Bharat cover cataract surgery?",
      a: "Eligible beneficiaries can get cataract under the scheme at empanelled centres, typically as a defined package with a basic lens. Private premium IOLs are not the scheme default.",
    },
    {
      q: "Why did my friend pay nothing and I got a bill?",
      a: "Different waiting periods, sub-limits, room eligibility, and whether they chose a premium lens. Compare policy wording, not stories.",
    },
    {
      q: "Is LASIK covered if cataract is covered?",
      a: "No. LASIK is usually excluded as elective vision correction. Cataract is a disease of the lens. They are different line items.",
    },
  ],
};

export default post;
