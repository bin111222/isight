import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "what-is-presbyopia-reading-glasses-after-40",
  title: "What Is Presbyopia? Why You Need Reading Glasses After 40",
  description:
    "Presbyopia is age-related loss of near focus, usually noticed after 40. It is not the same as long sightedness. Learn causes, workarounds and lens-surgery options.",
  date: "2026-09-18",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "what-is-presbyopia-reading-glasses-after-40",
  sections: [
    {
      body: "Presbyopia is the gradual stiffening of the eye’s natural lens so it can no longer zoom for near work. Most people notice it in the early to mid-40s: the phone goes to arm’s length, restaurant menus need brighter light, and a myope who always read without glasses suddenly wants them off for the phone and on for the road. It is ageing of the focusing muscle-lens system, not a disease, and LASIK for distance does not prevent it.",
    },
    {
      heading: "Presbyopia vs Long Sightedness vs Myopia",
      table: {
        headers: ["", "Presbyopia", "Long sightedness (hyperopia)", "Short sightedness (myopia)"],
        rows: [
          [
            "When it shows",
            "Typically after ~40 in everyone",
            "Can be present from childhood",
            "Often from school years",
          ],
          [
            "Mechanism",
            "Lens cannot change shape for near",
            "Eye is “too short” or cornea too flat",
            "Eye is “too long” or cornea too steep",
          ],
          [
            "Classic habit",
            "Holding the phone farther away",
            "Strain on near work even when young",
            "Sitting close to the board; phone is easy",
          ],
          [
            "LASIK alone",
            "Does not restore near zoom",
            "May help some hyperopia if cornea allows",
            "Clears distance; reading glasses still arrive later",
          ],
        ],
      },
    },
    {
      heading: "Everyday Fixes That Work",
      list: [
        "Over-the-counter readers if distance vision is still good — as a stopgap, not a skipped eye exam",
        "Progressive or office-lens spectacles prescribed after a proper refraction",
        "Contact-lens monovision or multifocal contacts for selected people",
        "Brighter light and larger fonts, which reduce the demand on a stiff lens",
        "Do not keep stretching your arms and delaying a check — that is how glaucoma and early cataract are missed",
      ],
    },
    {
      heading: "When Surgery Enters the Conversation",
      body: "If cataracts are starting, the same operation can treat clouding and presbyopia with an EDOF or trifocal IOL in suitable eyes. If the lens is still clear, options include refractive lens exchange (same idea, different indication) or, less often, corneal procedures. After 40, “just do LASIK” is often the wrong first sentence — you may trade distance glasses for near glasses and feel disappointed.",
    },
    {
      heading: "A Near-Vision Plan, Not a Guess",
      body: "At iSight Eye Care in Mumbai, Dr. Nikhil Nasta separates presbyopia from uncorrected hyperopia, dry eye and early cataract, then matches glasses, contacts or lens surgery to how you actually work and drive.\n\nVision correction after 40 often starts here: https://www.eyesurgeonmumbai.com/edof-iol-surgery-mumbai\n\nCataract path: https://www.eyesurgeonmumbai.com/cataract-surgery-mumbai\n\nBook: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "What is presbyopia?",
      a: "Age-related loss of the eye’s ability to focus up close, usually noticed after 40. The lens inside the eye becomes less flexible.",
    },
    {
      q: "Can eye exercises reverse presbyopia?",
      a: "No. You cannot exercise a stiffened lens back to a 20-year-old zoom. Exercises may ease fatigue; they do not restore accommodation.",
    },
    {
      q: "I had LASIK at 28. Will I still need reading glasses?",
      a: "Very likely, in your 40s. LASIK reshaped the cornea for distance. It did not stop the natural lens ageing.",
    },
    {
      q: "Is presbyopia the same as cataract?",
      a: "No. Presbyopia is flexibility. Cataract is clouding. They can exist together, which is why a dilated exam matters before you buy another pair of readers.",
    },
  ],
};

export default post;
