import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "can-i-fly-after-eye-surgery",
  title: "Can I Fly After Eye Surgery? LASIK, Cataract and Retina Travel Guide",
  description:
    "Most LASIK and cataract patients can fly within days if the eye is quiet. Retinal gas is the exception — flying can be dangerous. Get surgeon clearance before you book.",
  date: "2026-09-25",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "can-i-fly-after-eye-surgery",
  sections: [
    {
      body: "Yes for routine LASIK and uncomplicated cataract: many people fly 24–72 hours later if the first-day review is clean, drops are packed, and you are not in severe pain. No for eyes that still contain retinal gas or oil after detachment surgery — cabin pressure can expand a gas bubble and destroy vision. Always get written clearance from the operating surgeon; airline staff cannot judge this at the gate.",
    },
    {
      heading: "Typical Flying Windows (Individual Clearance Still Wins)",
      table: {
        headers: ["Procedure", "Often cleared to fly", "Why you might wait longer"],
        rows: [
          [
            "LASIK / SMILE",
            "Next day to 3 days after a normal review",
            "Unstable dry eye, enhancement planned, or you cannot do drops on a long-haul",
          ],
          [
            "Uncomplicated cataract / ICL",
            "Often 1–7 days after the first post-op check",
            "Raised pressure, wound leak, or you need daily reviews the first week",
          ],
          [
            "Retinal laser (barrage) without gas",
            "Usually soon, if the retina is attached and symptoms are settling",
            "New flashes, a field defect, or a planned theatre date",
          ],
          [
            "Vitrectomy with gas bubble",
            "Not until the surgeon says the gas is gone (often weeks)",
            "Flying too early can expand the bubble and spike eye pressure — this is a true danger",
          ],
          [
            "Corneal transplant",
            "Surgeon-specific, often longer",
            "Sutures, steroid drops, and infection risk on travel",
          ],
        ],
      },
    },
    {
      heading: "Cabin Tips Once You Are Cleared",
      list: [
        "Take a full set of drops in original packaging plus a copy of the prescription; keep them in the cabin, not the hold",
        "Use lubricating drops on the flight — cabin air is dry and LASIK/cataract surfaces hate that",
        "Do not rub the eye if you fall asleep against the window",
        "Avoid swimming pools at the destination until you are cleared, even if flying was allowed",
        "Plan the first follow-up before you leave Mumbai if you will be away more than a few days",
      ],
    },
    {
      heading: "International Patients",
      body: "If you flew in for surgery, do not book the return the same afternoon as a “package.” Build in the day-1 review and a reachable number for pain or vision drop. iSight Eye Care treats international pathways as a medical timeline, not a tourist slot.",
    },
    {
      heading: "Get a Yes in Writing Before You Buy the Ticket",
      body: "Dr. Nikhil Nasta will tell you whether this is a LASIK weekend, a cataract week, or a retina-gas no-fly. Guessing from a forum is how people take off with a bubble in the eye.\n\nLASIK: https://www.eyesurgeonmumbai.com/lasik-surgery-mumbai\n\nCataract: https://www.eyesurgeonmumbai.com/cataract-surgery-mumbai\n\nInternational patients: https://www.eyesurgeonmumbai.com/international-patients\n\nBook: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Can I fly after cataract surgery?",
      a: "Usually within a few days after a normal first review. Cabin pressure is not the same risk as retinal gas. Confirm with your surgeon and carry your drops.",
    },
    {
      q: "Can I fly after LASIK?",
      a: "Many patients fly 24–72 hours later if the eye is quiet. Dryness on the plane is the main nuisance — lubricate, do not rub.",
    },
    {
      q: "Why is flying banned after some retina operations?",
      a: "A gas bubble used to support the retina expands at altitude. That can skyrocket eye pressure and cause permanent damage. Oil fills have different rules — still surgeon-only clearance.",
    },
    {
      q: "Do I need a fitness-to-fly letter?",
      a: "For recent retina surgery, yes. For straightforward LASIK or cataract, a discharge summary and drop list are often enough, but ask the airline if you are travelling very soon after theatre.",
    },
  ],
};

export default post;
