import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "can-i-take-local-train-after-eye-surgery",
  title: "Can I Take the Mumbai Local After LASIK or Cataract Surgery?",
  description:
    "Go home by cab on surgery day. Avoid a packed local for a few days after LASIK. After cataract, travel with someone until the next-day review is clear.",
  date: "2026-10-21",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "can-i-take-local-train-after-eye-surgery",
  sections: [
    {
      body: "Go home by cab or with a family member on the day of LASIK or cataract surgery. A peak-hour Mumbai local, a two-wheeler, and driving yourself are the wrong plan that day. After a normal LASIK review, many people manage an off-peak train a few days later with sunglasses and strict no-rubbing. After cataract, wait until the day-1 check is reassuring, and keep rush-hour crush travel off the schedule for about a week.",
    },
    {
      heading: "Train, Rickshaw, Cab, and Bike",
      table: {
        headers: ["How you travel", "LASIK", "Cataract"],
        rows: [
          [
            "Cab or private car, someone else driving",
            "The right way home on surgery day",
            "The right way home, and to the day-1 visit",
          ],
          [
            "Auto rickshaw",
            "Acceptable after the first night if dust is low and you do not rub",
            "Fine with an escort after the first review. Hold the drop bag, not the grab rail, against your eye",
          ],
          [
            "Local train, off-peak",
            "Often from day 2–4 if the eye is quiet",
            "Better avoided in the first week. A shove at Dadar is enough to worry a fresh wound",
          ],
          [
            "Local train at peak",
            "Delay several days. Elbows, sweat, and dust are the problem",
            "Delay at least a week, longer if the eye is still tender",
          ],
          [
            "Two-wheeler or driving a car",
            "Only after vision is stable and the surgeon clears you",
            "Same rule. Clear vision in one freshly operated eye is not an automatic yes",
          ],
        ],
      },
    },
    {
      heading: "Why the Western and Central Lines Are a Special Case",
      body: "The procedure notes from other cities say “you may resume light activity.” They are not written for a Virar fast at 8:40 a.m. You will be jostled. You will be tempted to rub sweat out of the eye. The air is dusty at the open doors. None of that is compatible with a flap on night one, or with a cataract incision that you are trusting to stay sealed. An off-peak first-class or a cab is a medical decision for a few days, not a luxury.",
    },
    {
      heading: "A Commute Plan You Can Give Your Office",
      list: [
        "Surgery day: leave. Cab home. Phone on silent",
        "LASIK next day: come in for the review before you promise to be at your desk",
        "Ask for work-from-home or a later login for two or three days if your only option is a peak local",
        "Carry drops, sunglasses, and the night shield in your bag",
        "If vision fluctuates on the platform, you are not ready to ride a bike, even if the train felt manageable",
      ],
    },
    {
      heading: "Tell the Surgeon Your Actual Station",
      body: "Churchgate to a nearby cab is a different recovery from Kalyan, Vasai, or Panvel and a two-change journey. Dr. Nikhil Nasta will time LASIK or cataract around that reality. Say it at the booking, and the leave letter can match the eye.\n\nRecovery timelines: https://www.eyesurgeonmumbai.com/post/lasik-recovery-timeline-work-drive-gym-travel\n\nFlying after surgery: https://www.eyesurgeonmumbai.com/post/can-i-fly-after-eye-surgery\n\nBook: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Can I travel by metro?",
      a: "Metro is usually gentler than a packed local: less dust at the door, more predictable crowds. Surgery day is still a cab day. After that, use off-peak coaches until you are steady.",
    },
    {
      q: "What if I feel fine and the train is the only way to the day-1 visit?",
      a: "Come, with someone, outside peak hours, wearing sunglasses, and do not rub. Tell the clinic you had a rough journey if the eye is redder than the night before.",
    },
    {
      q: "Can my driver take the Sea Link the same day?",
      a: "Yes. A smooth car ride with your eyes closed or shielded is what we want. You are the passenger.",
    },
    {
      q: "When can I ride a scooter to work?",
      a: "When the surgeon confirms your vision is stable enough to judge traffic and the eye can tolerate wind and dust. For most LASIK patients that is several days, not the next morning. Use a visor when you restart.",
    },
  ],
};

export default post;
