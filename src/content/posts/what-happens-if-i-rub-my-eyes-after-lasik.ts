import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "what-happens-if-i-rub-my-eyes-after-lasik",
  title: "What Happens If I Rub My Eyes After LASIK?",
  description:
    "A hard rub in the first days after LASIK can shift the corneal flap. A light accidental touch usually does not. Sudden blur or pain after a rub needs a same-day check.",
  date: "2026-10-16",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "what-happens-if-i-rub-my-eyes-after-lasik",
  sections: [
    {
      body: "A firm rub in the first days after LASIK can shift the corneal flap. That is uncommon, and it is the reason for night shields and the “hands off” rule. A light brush while putting in drops, or a tear you blot with a clean tissue, is a different thing and usually leaves the flap in place. If vision suddenly blurs or the eye hurts after a rub, the clinic needs to see you the same day.",
    },
    {
      heading: "Touch Versus a Real Rub",
      table: {
        headers: ["What happened", "How worried to be", "What to do"],
        rows: [
          [
            "You tapped the lid while instilling drops",
            "Low",
            "Finish the drops, do not rub, mention it if vision changes",
          ],
          [
            "You blotted a tear with a tissue, no pressure",
            "Low",
            "Use a clean tissue at the corner of the eye next time",
          ],
          [
            "You rubbed hard because of itch, especially on day 1 or 2",
            "Higher",
            "Stop. Come in the same day if vision drops, pain starts, or the eye waters suddenly",
          ],
          [
            "A child, pillow, or pet caught the eye in your sleep",
            "Depends on the force",
            "This is why the shield stays on at night for the first week",
          ],
          [
            "You rubbed weeks later out of habit",
            "Much lower flap risk, still a bad habit",
            "Chronic rubbing can worsen dryness and, in some corneas, shape problems",
          ],
        ],
      },
    },
    {
      heading: "Why the Flap Is Fragile Early and Stable Later",
      body: "LASIK creates a thin hinged layer of cornea, the laser reshapes the bed underneath, and the flap is laid back. It sticks down quickly. It is most vulnerable in the first 24 to 48 hours, then steadily safer over the following weeks. By the time you are back to ordinary life, ordinary eye contact is not a crisis. A knuckle ground into the eye never becomes a good idea, early or late. People who rub for years because of allergy are the ones we screen carefully before LASIK in the first place.",
    },
    {
      heading: "How to Get Through the Itch Without Rubbing",
      list: [
        "Use the lubricating drops the moment the eye feels scratchy",
        "Wear the shield for every nap and overnight, taped as you were shown",
        "Sleep slightly propped if you always roll onto your face",
        "Ask someone else to watch toddlers who like to poke",
        "If allergy is the driver, get treatment for the itch. Willpower loses to a swollen lid at 2 a.m.",
      ],
    },
    {
      heading: "Do Not Try to Fix a Flap Yourself",
      body: "There is nothing useful to press back into place at home. A displaced flap is repositioned in the clinic, under the microscope, the same day it is found. Waiting overnight because the blur “might settle” is the delay that costs clarity. Dr. Nikhil Nasta’s LASIK patients at iSight Eye Care leave with a number to call for exactly this.\n\nLASIK experience and aftercare: https://www.eyesurgeonmumbai.com/lasik-surgery-mumbai\n\nBook or report a sudden change: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "I rubbed my eye and vision is the same. Do I still come in?",
      a: "If vision, comfort, and redness are unchanged, tell the team at the next planned visit. Come sooner if anything feels different from the other eye.",
    },
    {
      q: "How many nights do I wear the shield?",
      a: "Typically the first week, including naps. Your discharge card is the instruction that counts if it says longer.",
    },
    {
      q: "Can I use an anti-itch drop from the chemist?",
      a: "Only drops your surgeon has approved. Some redness relievers sting a fresh surface and some steroids are the wrong choice this week.",
    },
    {
      q: "Does SMILE have the same rubbing rule?",
      a: "SMILE has no flap, so the specific flap-shift risk is a LASIK issue. You still avoid rubbing. The surface incision needs to heal quietly.",
    },
  ],
};

export default post;
