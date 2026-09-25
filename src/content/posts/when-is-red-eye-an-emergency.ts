import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "when-is-red-eye-an-emergency",
  title: "When Is Red Eye an Emergency? Symptoms That Need Same-Day Care",
  description:
    "Most red eyes are irritation or conjunctivitis. Same-day emergency signs include pain, light sensitivity, vision loss, trauma, or a contact-lens red eye. Know when to go.",
  date: "2026-09-19",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "when-is-red-eye-an-emergency",
  sections: [
    {
      body: "Red eye is an emergency when it comes with significant pain, light sensitivity, reduced vision, a trauma or chemical splash, a contact lens you cannot remove comfortably, or a cloudy cornea. Itchy, watery, mildly pink eyes with a cold and no vision drop are usually not an emergency, but they still deserve a check if they last more than a few days or you cannot stop spreading them at home. Do not put steroid drops from an old bottle on a red eye.",
    },
    {
      heading: "Go the Same Day If You Have Any of These",
      list: [
        "Pain, not just an itch — especially with nausea or a very hard-feeling eye",
        "Vision that is blurred, halved, or has a shadow / curtain",
        "Marked light sensitivity (photophobia) so you cannot open the eye",
        "A white or grey spot on the cornea, or pus-like discharge with swelling",
        "Injury, a high-speed particle, or any chemical (alkali is worse than acid — irrigate immediately, then travel)",
        "You sleep in contact lenses or used tap water on lenses, and the eye is now red",
        "Recent eye surgery and new redness with pain or vision drop",
        "A newborn with a red, discharging eye",
      ],
    },
    {
      heading: "Usually Not an Emergency (Still Get Examined If It Persists)",
      table: {
        headers: ["Pattern", "Likely cause", "First move"],
        rows: [
          [
            "Both eyes itchy, extra blink, seasonal",
            "Allergy",
            "Avoid rubbing; see an ophthalmologist if it is frequent — rubbing feeds keratoconus",
          ],
          [
            "Watery pink eye after a family cold, vision okay",
            "Viral conjunctivitis",
            "Hygiene, no school/office sharing of towels; exam if painful or vision drops",
          ],
          [
            "Gritty, worse with AC and screens",
            "Dry eye",
            "Full blinks, environment; not a reason to self-start antibiotics",
          ],
          [
            "A tender lid lump",
            "Stye / chalazion",
            "Warm compresses; see a doctor if it is huge, affecting vision, or not settling",
          ],
        ],
      },
    },
    {
      heading: "What Not to Do",
      list: [
        "Do not buy steroid or antibiotic-steroid drops over the counter for a red eye",
        "Do not wear a contact lens in a red eye",
        "Do not patch a discharging or injured eye shut for the journey unless instructed",
        "Do not assume “conjunctivitis” after looking at a photo on your phone",
      ],
    },
    {
      heading: "Same-Day Red Eye Review in Mumbai",
      body: "iSight Eye Care will slit-lamp the eye, stain the cornea, and check pressure when pain is part of the story. Dr. Nikhil Nasta treats the dangerous causes — ulcer, uveitis, acute glaucoma, post-op infection — differently from a simple viral pink eye. If you are unsure, it is safer to be seen than to wait for Monday.\n\nBook: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "When is a red eye an emergency?",
      a: "When there is pain, light sensitivity, vision loss, trauma, chemicals, contact-lens wear, or recent surgery. Itch alone with a cold is usually less urgent.",
    },
    {
      q: "Is pink eye contagious?",
      a: "Viral and some bacterial conjunctivitis spread easily by hands and towels. Allergic red eye does not. An exam tells you which you have.",
    },
    {
      q: "Can dry eye look like an emergency?",
      a: "It can look dramatically red. True emergencies still have pain, photophobia or vision change. When in doubt, get the cornea stained.",
    },
    {
      q: "Should I go to a general hospital or an eye clinic?",
      a: "An ophthalmologist with a slit lamp is the right door. For chemical burns, irrigate first, then go immediately — minutes matter more than the building type.",
    },
  ],
};

export default post;
