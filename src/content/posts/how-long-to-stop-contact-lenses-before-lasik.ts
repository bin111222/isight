import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "how-long-to-stop-contact-lenses-before-lasik",
  title: "How Long Should I Stop Contact Lenses Before LASIK?",
  description:
    "Soft lenses usually come out 7 days before a LASIK scan. Toric lenses need about 2 weeks, and RGP or ortho-k lenses often 3–4 weeks or more.",
  date: "2026-10-02",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "how-long-to-stop-contact-lenses-before-lasik",
  sections: [
    {
      body: "Stop soft contact lenses at least 7 days before your LASIK measurements. Toric and coloured lenses usually need 14 days out. Rigid gas-permeable lenses often need 3–4 weeks, and overnight ortho-k lenses can need one to three months. Lenses quietly reshape the cornea. A scan done while that shape is still warped can choose the wrong treatment.",
    },
    {
      heading: "How Long Each Lens Type Needs to Stay Out",
      table: {
        headers: ["Lens you wear", "Usual pause before LASIK tests", "Why it takes that long"],
        rows: [
          [
            "Daily disposable soft lenses",
            "7 days",
            "The cornea needs time to return to its natural curve",
          ],
          [
            "Monthly soft or cosmetic colour lenses",
            "7–14 days",
            "Colour lenses often sit tighter and warp the surface more",
          ],
          [
            "Toric soft lenses (for cylinder)",
            "14 days",
            "They rest in one orientation and can leave a temporary imprint",
          ],
          [
            "RGP or semi-soft lenses",
            "3–4 weeks, then a repeat map if it is still shifting",
            "Hard lenses mould the cornea for weeks",
          ],
          [
            "Ortho-k (night lenses that you remove in the morning)",
            "Often 1–3 months",
            "They are designed to flatten the cornea on purpose",
          ],
        ],
      },
    },
    {
      heading: "Why the Clinic Will Not Scan You in Lenses",
      body: "Walking in with lenses feels easier, especially if your glasses are old and the Bandra or Andheri board is a blur. Bring the glasses anyway. Topography and pachymetry read the cornea you actually have, not the cornea your lenses have been holding in shape. A warped map can overstate your number, hide a thin spot, or make a suitable eye look unsafe. The reverse happens too: an eye that should wait gets cleared.",
    },
    {
      heading: "What to Do During the Lens Holiday",
      list: [
        "Wear your current spectacles, even if the power feels slightly off",
        "Ask for a temporary pair if you cannot function at work without lenses",
        "Use plain lubricating drops if the eyes feel dry in office AC",
        "Do not start a new lens brand in the fortnight before the test",
        "Tell the team if you have had a red eye, a lens ulcer, or pain in the last month",
      ],
    },
    {
      heading: "If You Wore Lenses Yesterday",
      body: "Say so at the desk. The measurements get moved. Same-day laser on a cornea that still carries a lens imprint is how people end up needing an enhancement. A delayed scan is a smaller inconvenience than a retreat months later. If surgery itself is postponed after a valid scan, ask before you put the lenses back. A fresh holiday is required before the next map.",
    },
    {
      heading: "Book the Workup Once the Holiday Is Planned",
      body: "At iSight Eye Care, Dr. Nikhil Nasta locks a LASIK plan only after the contact-lens pause is finished and two maps agree. Bring the lens boxes or a photo of the packaging so the team can see whether they are soft, toric, or RGP.\n\nLASIK in Mumbai: https://www.eyesurgeonmumbai.com/lasik-surgery-mumbai\n\nBook a screening: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Can I wear a lens in one eye and keep the other free?",
      a: "Stop both eyes if both are being measured. One lens changes the comparison between the two corneas.",
    },
    {
      q: "I only wear glasses. Do I still need a waiting period?",
      a: "No. Spectacles do not change corneal shape. You can be scanned on the day you come in, if the surface is healthy.",
    },
    {
      q: "Are one-day lenses safe until the night before?",
      a: "They still need the full pause. Daily lenses warp the cornea less than monthly lenses, and they still warp it.",
    },
    {
      q: "What if my glasses power and lens power do not match?",
      a: "That is common. The LASIK plan uses cycloplegic refraction and corneal maps after the lens holiday, not the number printed on an old spectacle card.",
    },
  ],
};

export default post;
