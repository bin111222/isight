import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "what-does-6-6-vision-mean",
  title: "What Does 6/6 Vision Mean? (And Is It the Same as 20/20?)",
  description:
    "6/6 vision means you see at 6 metres what a typical person sees at 6 metres — the Indian equivalent of 20/20. Learn what the chart measures and what it misses.",
  date: "2026-09-21",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "what-does-6-6-vision-mean",
  sections: [
    {
      body: "6/6 vision means that at 6 metres you can read the line a person with standard acuity should read at 6 metres. It is the metric twin of 20/20 (20 feet). It is a sharpness score for one testing distance, not a certificate of perfect eye health. You can have 6/6 and still have glaucoma, a retinal tear, or a cataract starting. You can also have better than 6/6 (6/5 or 6/4) after good optics.",
    },
    {
      heading: "How to Read the Fraction",
      table: {
        headers: ["Notation", "What it means in practice"],
        rows: [
          ["6/6 (20/20)", "Standard reference acuity — “normal” on the chart, not the best possible"],
          ["6/9 or 6/12", "You need to be closer, or letters need to be larger, to match that standard"],
          ["6/18, 6/24, 6/60", "Increasingly limited distance vision; driving and board work suffer"],
          ["6/5 or 6/4", "Better than the reference line — common in some young, well-corrected eyes"],
          ["With pinhole", "If the chart improves through a pinhole, glasses or refractive surgery may help; if it does not, the limit is often the cornea, lens, retina or nerve"],
        ],
      },
    },
    {
      heading: "What 6/6 Does Not Measure",
      list: [
        "Side (peripheral) vision — the first thing glaucoma can steal",
        "Colour, contrast and night vision",
        "How the two eyes work together (squint, lazy eye)",
        "The health of the retina and optic nerve",
        "Near vision after 40 (presbyopia) — you can be 6/6 in the distance and unable to read a phone",
      ],
    },
    {
      heading: "Can LASIK Give You 6/6?",
      body: "Many screened candidates reach 6/6 or better for distance after LASIK, SMILE or ICL. That is a probable outcome, not a contract. Dry eye, residual astigmatism, and a cornea that was never a candidate can stop the chart at 6/9. After 40, 6/6 distance still leaves presbyopia. A topography-based work-up is how you get a realistic number, not a marketing slogan.",
    },
    {
      heading: "Get More Than a Chart in Mumbai",
      body: "A school or licence screening that stamps 6/6 is not a comprehensive exam. Dr. Nikhil Nasta at iSight Eye Care measures acuity, then looks at the reason: refraction, ocular surface, pressure, and a dilated retina when indicated.\n\nLASIK if the limit is glasses: https://www.eyesurgeonmumbai.com/lasik-surgery-mumbai\n\nBook a full exam: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Is 6/6 vision the same as 20/20?",
      a: "Yes in meaning. 6/6 uses metres; 20/20 uses feet. Both describe standard distance acuity, not perfect eye health.",
    },
    {
      q: "Is 6/6 perfect vision?",
      a: "It is normal chart vision. Some people see 6/5. Perfect also includes comfort, fields, night vision and a healthy retina.",
    },
    {
      q: "What is legally required for driving in India?",
      a: "Licensing standards use acuity (often with or without glasses) and fields. Do not assume 6/6 without glasses is required — many people drive legally with correction. Confirm current RTO rules for your licence class.",
    },
    {
      q: "My child is 6/6. Can I skip the next eye exam?",
      a: "No. Children can have 6/6 and still hide hyperopia, a small squint, or allergy-related rubbing that needs treatment.",
    },
  ],
};

export default post;
