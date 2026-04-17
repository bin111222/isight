import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "lasik-operation-mumbai",
  title: "LASIK Operation in Mumbai: What to Expect on Surgery Day",
  description:
    "Step-by-step LASIK surgery day guide for Mumbai patients: night-before prep, clinic timeline, laser room process, early recovery, and warning signs.",
  date: "2026-07-27",
  image: "lasik-operation-mumbai",
  sections: [
    {
      body: "A LASIK operation in Mumbai is usually a same-day procedure with 10 to 15 minutes of treatment time in the laser room and roughly 2 to 3 hours of total clinic time including preparation and discharge. Most patients are surprised by how fast and comfortable the process feels.",
    },
    {
      heading: "Surgery Day Timeline",
      table: {
        headers: ["Stage", "Approximate time", "What happens"],
        rows: [
          ["Night before", "Evening", "Stop contacts, avoid alcohol, set up escort"],
          ["Morning prep", "1-2 hours before", "Light meal, no eye makeup or perfumes"],
          ["Clinic check-in", "30-45 minutes", "Consent, drops, final checks"],
          ["Laser room", "10-15 minutes", "Procedure for both eyes"],
          ["Recovery rest", "30-60 minutes", "Eyes closed in dim room"],
          ["Discharge", "15-20 minutes", "Post-op instructions and medication kit"],
        ],
      },
    },
    {
      heading: "Night-Before Checklist",
      list: [
        "Remove contact lenses as advised by your surgeon",
        "Avoid alcohol and stay well hydrated",
        "Wash hair and prepare comfortable front-opening clothes",
        "Arrange someone to accompany you home after surgery",
        "Keep sunglasses and prescribed documents ready",
      ],
    },
    {
      heading: "Inside the Laser Room: Step-by-Step",
      list: [
        "Positioning under the laser system",
        "Eyelid holder placement to prevent blinking",
        "Flap creation (or flapless lenticule step in SMILE)",
        "Laser correction while focusing on fixation light",
        "Flap repositioning and immediate safety checks",
      ],
    },
    {
      heading: "First Hour After Surgery",
      body: "Expect foggy vision, watering, mild burning, and light sensitivity for a short period. These symptoms are usually temporary. Keeping your eyes closed and avoiding rubbing are the most important immediate protective steps.",
    },
    {
      heading: "First Night Care",
      list: [
        "Sleep as soon as possible after reaching home",
        "Use eye shields while sleeping",
        "Avoid rubbing and avoid direct water exposure to eyes",
        "Keep screen use minimal for the first few hours",
        "Follow your drop schedule exactly",
      ],
    },
    {
      heading: "When to Call the Clinic Urgently",
      list: [
        "Sudden severe pain",
        "Sharp drop in vision after initial improvement",
        "Persistent intense burning or redness",
        "Any concern about accidental eye rubbing or flap movement",
      ],
    },
  ],
  faqs: [
    {
      q: "How long does LASIK surgery day take in Mumbai?",
      a: "Most patients spend around 2 to 3 hours at the clinic, while the actual procedure time for both eyes is usually 10 to 15 minutes.",
    },
    {
      q: "Is LASIK operation painful?",
      a: "The procedure is usually not painful because numbing eye drops are used. You may feel pressure and short-term post-op discomfort.",
    },
    {
      q: "Can I eat before LASIK?",
      a: "A light meal is typically allowed before surgery unless your clinic gives different instructions.",
    },
    {
      q: "Can I drive home after LASIK surgery?",
      a: "No. You should arrange an escort because immediate post-op vision is not reliable for driving.",
    },
  ],
};

export default post;
