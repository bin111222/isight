import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "why-do-my-eyes-itch-in-mumbai",
  title: "Why Do My Eyes Itch and Water in Mumbai?",
  description:
    "Itchy, watery eyes in Mumbai are often allergy, office AC, or pollution. Pain, sticky discharge, or blurred vision needs an eye doctor the same day.",
  date: "2026-10-12",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "why-do-my-eyes-itch-in-mumbai",
  sections: [
    {
      body: "Most itchy, watery eyes in Mumbai are allergic conjunctivitis, air-conditioning dryness, or pollution on the tear film. They are uncomfortable and they are rarely a glasses-power emergency. Pain, light sensitivity, thick yellow discharge, or a real drop in vision is different: that needs an eye doctor the same day, not another bottle from the chemist.",
    },
    {
      heading: "What Mumbai Eyes Are Reacting To",
      table: {
        headers: ["Pattern", "Typical cause in the city", "What helps first"],
        rows: [
          [
            "Both eyes itch, water, and you keep rubbing",
            "Allergy: dust, mould after the rains, pollen, pet dander",
            "Cold compress, stop rubbing, get the right drop after an exam",
          ],
          [
            "Burning by evening in a sealed office",
            "Evaporative dry eye from AC and screens",
            "Blinks, lubricating drops, screen breaks",
          ],
          [
            "Gritty eyes on a hazy October morning",
            "Particulate pollution and construction dust",
            "Glasses outdoors, wash the face, lubricate. Do not rinse with tap water as a habit",
          ],
          [
            "One eye sticky shut in the morning",
            "Often infection, not simple allergy",
            "Same-day exam. Do not share a towel or start leftover steroid drops",
          ],
          [
            "Itch plus a fleshy growth toward the cornea",
            "Possible pterygium or chronic surface irritation",
            "Needs a slit-lamp look, not more kajal",
          ],
        ],
      },
    },
    {
      heading: "Why October Feels Worse",
      body: "The rains leave mould in cupboards and AC filters. Schools and offices go back to long indoor days. Construction dust and pre-Diwali smoke sit on the tear film. People restart colour lenses for functions and sleep in them. Each of those can itch. Rubbing feels like the cure and it is the thing that swells the lid further. A cold, clean compress for a few minutes calms the surface. A fingernail does not.",
    },
    {
      heading: "Drops People Buy Before They Are Examined",
      list: [
        "Steroid combination drops from a previous prescription. They quiet itch and can raise eye pressure if used for weeks",
        "Antibiotic drops for a clear, watery eye that has no infection",
        "Whitening drops used daily. The redness rebounds",
        "Rose water, honey, or kajal on an itchy lid. These add irritation and infection risk",
        "Someone else’s lens solution used as an eye wash",
      ],
    },
    {
      heading: "When Itch Is a Visit, Not a Pharmacy Run",
      body: "Book an exam if the itch has lasted more than a few days, if you need drops to get through work, if you wear contact lenses, or if only one eye is involved. Come the same day if vision blurs, the eye hurts, or the discharge is thick. At iSight Eye Care the slit lamp separates allergy, dry eye, and infection, which look similar in the mirror and are treated differently.\n\nDry eye treatment: https://www.eyesurgeonmumbai.com/post/advanced-dry-eye-treatment-mumbai\n\nWhen a red eye is urgent: https://www.eyesurgeonmumbai.com/post/when-is-red-eye-an-emergency\n\nBook: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Can I keep wearing contact lenses if they itch?",
      a: "Take them out until an eye doctor has seen you. An itchy lens eye can be an ulcer starting, especially if you slept in the lenses.",
    },
    {
      q: "Will a new glasses power stop the itch?",
      a: "A wrong number causes strain and headache more than itch. Itch is a surface problem. You may still need a power check while you are there.",
    },
    {
      q: "Are antihistamine tablets enough?",
      a: "They sometimes help a runny nose and a mild eye itch together. They do not replace a look at the eye if vision is involved or the redness is one-sided.",
    },
    {
      q: "Can children get this every festival season?",
      a: "Yes. Seasonal allergy is common. Rubbing is how they develop darker lids and, occasionally, keratoconus risk over years. A paediatric eye exam is the right loop to break.",
    },
  ],
};

export default post;
