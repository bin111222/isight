import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "can-i-use-my-phone-after-lasik",
  title: "Can I Use My Phone and Laptop After LASIK?",
  description:
    "Rest the first evening after LASIK. Most patients use a phone and laptop in short bursts from the next day, with lubricating drops and regular breaks.",
  date: "2026-10-05",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "can-i-use-my-phone-after-lasik",
  sections: [
    {
      body: "Leave the phone alone on the evening of LASIK. From the next day, short bursts are usually fine if the eye feels comfortable and you are using the prescribed drops. A full laptop day, back-to-back reels, and a freezing AC cabin dry the surface and make vision fluctuate. Build back to a normal screen day over the first week.",
    },
    {
      heading: "A Practical Screen Timeline",
      table: {
        headers: ["When", "Phone and laptop", "What helps"],
        rows: [
          [
            "Surgery day, after you reach home",
            "Best avoided. Rest with eyes closed",
            "Drops on time, shields on, someone else handles messages",
          ],
          [
            "Next morning, after the review",
            "Short checks: a few minutes at a time",
            "Lubricating drops before you unlock the screen",
          ],
          [
            "Day 2 to day 7",
            "Desk work is realistic for most people, with breaks",
            "20 minutes on, 20 seconds looking far, blink on purpose",
          ],
          [
            "Week 2 onwards",
            "Ordinary office and phone use if the eye is quiet",
            "Keep a drop bottle at the desk. Mumbai AC is relentless",
          ],
        ],
      },
    },
    {
      heading: "Why Screens Feel Worse Than the Clinic Promised",
      body: "The laser day itself is short. The complaint that fills the WhatsApp the next afternoon is different: the laptop looks fine for twenty minutes, then the letters swim. That is usually a drying tear film, not a failed surgery. You blink less when you read. Office towers in BKC, Lower Parel, and Andheri run cold and dry. Add a bright phone in a dark bedroom and the eyes fatigue faster than they would outdoors.",
    },
    {
      heading: "How to Work Without Undoing the Result",
      list: [
        "Increase text size for the first few days so you stop leaning in",
        "Keep the screen below eye level so the lids cover more of the eye",
        "Use the lubricating drops before meetings, not only when the eye already burns",
        "Skip the ceiling fan aimed straight at your face",
        "Wear the shields at night so a pillow or a sleepy rub does not catch the flap",
      ],
    },
    {
      heading: "When Screen Blur Is a Reason to Call",
      body: "Fluctuating clarity that improves after a drop is expected. A sudden drop in vision, sharp pain, increasing redness, or one eye that feels completely different from the other is a same-day call. Do not wait for the Monday review because a deadline is close.\n\nDay-by-day recovery: https://www.eyesurgeonmumbai.com/post/lasik-recovery-timeline-work-drive-gym-travel\n\nLASIK at iSight: https://www.eyesurgeonmumbai.com/lasik-surgery-mumbai\n\nBook: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Can I attend office Zoom calls the next day?",
      a: "Many people can, after the morning review, if they keep the call short and use drops. A full day of back-to-back video calls is better left to day two or three.",
    },
    {
      q: "Is dark mode easier?",
      a: "Use whichever brightness lets you stop squinting. Very dim screens in a dark room can feel harsher in the first week because halos show up more.",
    },
    {
      q: "Do blue-light glasses help after LASIK?",
      a: "They are optional. Lubrication and breaks change comfort more than a filter. You do not need a new spectacle number for the healing weeks.",
    },
    {
      q: "Can children or students return to online classes?",
      a: "LASIK is planned for stable adult prescriptions. If a student has had laser vision correction, the same screen rules apply: rest the first evening, then short sessions with drops.",
    },
  ],
};

export default post;
