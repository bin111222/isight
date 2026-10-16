import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "can-both-eyes-be-operated-same-day",
  title: "Can Both Eyes Be Operated on the Same Day?",
  description:
    "LASIK is usually done on both eyes in one visit. Cataract surgery in Mumbai is often one eye first, with the second eye scheduled once the first is stable.",
  date: "2026-10-14",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "can-both-eyes-be-operated-same-day",
  sections: [
    {
      body: "LASIK and SMILE are usually performed on both eyes in the same visit. Cataract surgery is usually one eye first. The second eye is planned days or a few weeks later, after the first eye’s review is reassuring. Same-day cataract in both eyes is reserved for selected people, with a separate sterile set for each eye, and only after a proper discussion of the trade-off.",
    },
    {
      heading: "What Mumbai Patients Can Expect",
      table: {
        headers: ["Procedure", "Both eyes same day?", "Why the plan looks like this"],
        rows: [
          [
            "LASIK, SMILE, SILK, Contoura",
            "Yes, in suitable patients",
            "The procedure is brief, recovery overlaps, and you avoid two lens holidays",
          ],
          [
            "ICL (implantable lens)",
            "Often yes, sometimes staged",
            "Depends on the calculation, the chamber depth, and how you handle the first eye",
          ],
          [
            "Cataract, standard phaco",
            "Usually one eye, then the other",
            "You keep one stable eye while the operated eye settles",
          ],
          [
            "Cataract in both eyes the same morning",
            "Selected cases only",
            "Useful for some people who cannot return twice. It needs strict infection precautions",
          ],
          [
            "Retina surgery or a glaucoma operation",
            "The affected eye only",
            "These are disease treatments, not a paired cosmetic choice",
          ],
        ],
      },
    },
    {
      heading: "Why Cataract Is Often Staged",
      body: "After cataract surgery the vision is usually good quickly, and the first day still matters. Pressure, inflammation, and the drop schedule are easier to judge one eye at a time. Families also find it simpler: one eye sees well enough to walk to the bathroom while the operated eye is shielded. If the first eye declares a strong preference for a different lens — more reading range, or fewer halos at night — the second eye can be chosen with that experience in hand.",
    },
    {
      heading: "Why LASIK Is Paired",
      list: [
        "You would otherwise be sharp in one eye and blurred in the other for a week",
        "The contact-lens holiday and work leave happen once",
        "The laser sitting is minutes per eye",
        "Drops and shields are the same routine for both",
        "A rare reason to stage LASIK is when one eye needs a different procedure, or the first eye’s response must be watched",
      ],
    },
    {
      heading: "How to Decide at the Consult",
      body: "Tell Dr. Nikhil Nasta if you live alone, if you have a long commute, if the second eye is much weaker, or if you are travelling out of Mumbai after surgery. Those facts change the calendar more than a general rule does. The aim is one safe plan, not two operations squeezed into a morning because the leave letter says so.\n\nLASIK: https://www.eyesurgeonmumbai.com/lasik-surgery-mumbai\n\nCataract: https://www.eyesurgeonmumbai.com/cataract-surgery-mumbai\n\nBook: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Will I be blind in both eyes on LASIK day?",
      a: "Vision is misty for a few hours, not black. Most people see well enough to walk with an escort. You still should not drive yourself home.",
    },
    {
      q: "How soon is the second cataract eye done?",
      a: "Often within one to four weeks, once the first eye is comfortable and the glasses plan for the second eye is clear. Sooner or later is a clinical decision.",
    },
    {
      q: "Can I choose a multifocal lens in only one eye?",
      a: "Sometimes. Mixing lens types is a deliberate choice for specific visual needs. It should be tried in conversation with your daily tasks, not picked from a package list.",
    },
    {
      q: "Is same-day cataract in both eyes unsafe?",
      a: "In carefully selected patients, with separate instruments for each eye, it is an accepted approach. It is not the default, because a rare infection would involve both eyes at once.",
    },
  ],
};

export default post;
