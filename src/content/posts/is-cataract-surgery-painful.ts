import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "is-cataract-surgery-painful",
  title: "Is Cataract Surgery Painful? What You Actually Feel",
  description:
    "Is cataract surgery painful? Most patients feel pressure, not pain. Numbing drops replace injections in modern phaco. Learn what surgery and recovery really feel like.",
  date: "2026-09-09",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "is-cataract-surgery-painful",
  sections: [
    {
      body: "No. Modern cataract surgery is not painful for most people. Numbing eye drops anaesthetise the surface, so you feel touch or mild pressure, not a sharp sting. At iSight Eye Care the technique is no patch, no stitch, no injection: topical anaesthesia, a self-sealing micro-incision, and phacoemulsification that usually takes 10–20 minutes per eye. Mild grittiness afterwards is common and settles with prescribed drops.",
    },
    {
      heading: "What You Feel, Step by Step",
      table: {
        headers: ["Stage", "What you typically feel", "What we do about it"],
        rows: [
          [
            "Drops before surgery",
            "A brief sting for a few seconds, then numbness",
            "Topical anaesthetic; no periocular injection in standard cases",
          ],
          [
            "During phaco",
            "Bright light, a sense of pressure or water, no cutting pain",
            "You stay awake; the surgeon talks you through each step",
          ],
          [
            "First evening",
            "Sandy, scratchy, watery eye; light sensitivity",
            "Antibiotic and anti-inflammatory drops; rest, no rubbing",
          ],
          [
            "Day 1–3",
            "Improving comfort; vision clearing as the swelling settles",
            "Follow-up visit; most people resume light activity",
          ],
        ],
      },
    },
    {
      heading: "Why Older Stories Still Scare People",
      body: "Parents and grandparents remember large-incision surgery, injections around the eye, a patch for days, and stitches. That is not how routine phaco is done in Mumbai now. Anxiety is often worse than the procedure. Tell the team if you are very nervous — extra time, a hand to hold, and a clear explanation of the lights and sounds reduce panic more than extra medicine.",
    },
    {
      heading: "When Discomfort Is Not Normal",
      list: [
        "Severe pain that is not easing with the prescribed drops",
        "A sudden drop in vision, increasing redness, or pus-like discharge",
        "Nausea with a very hard, aching eye (pressure problem — call the same day)",
        "You cannot keep the eye open even in a dim room after the first night",
      ],
    },
    {
      heading: "A Calm Cataract Experience in Mumbai",
      body: "Dr. Nikhil Nasta performs cataract surgery at iSight Eye Care using the Alcon Laureate phaco platform and topical anaesthesia for suitable patients. If fear of pain is the only thing delaying a cloudy lens, the next step is a lens-counselling visit, not a leap into theatre.\n\nCataract surgery: https://www.eyesurgeonmumbai.com/cataract-surgery-mumbai\n\nBook: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Is cataract surgery done with an injection?",
      a: "Often no. Many modern cases use only numbing drops. An injection around the eye is reserved for selected patients who cannot keep still or need a deeper block.",
    },
    {
      q: "Will I be awake during cataract surgery?",
      a: "Yes, in almost all routine cases. You do not see the instruments clearly. You see a bright light. Being awake lets the surgeon check comfort and avoids the risks of general anaesthesia in older patients.",
    },
    {
      q: "How long does the numbness last?",
      a: "The surface stays comfortable during the case. Afterwards the eye can feel scratchy as the drops wear off. That is irritation, not a return of surgical pain.",
    },
    {
      q: "Is recovery painful?",
      a: "Most people describe a foreign-body sensation for a day, not throbbing pain. If pain is severe, it is a reason to call, not to wait it out.",
    },
  ],
};

export default post;
