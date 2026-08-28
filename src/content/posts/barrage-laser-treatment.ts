import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "barrage-laser-treatment",
  title: "Barrage Laser: What It Is, Why It’s Done, and What to Expect",
  description:
    "Barrage laser is a retinal laser used to seal tears, holes and weak areas so they do not progress to retinal detachment. Learn who needs it, how it feels, and recovery.",
  date: "2026-09-03",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "barrage-laser-treatment",
  sections: [
    {
      body: "Barrage laser is a targeted retinal laser treatment. The surgeon places a ring (a “barrage”) of laser spots around a retinal tear, hole, or area of lattice degeneration. Those spots create a controlled scar that welds the retina to the wall of the eye, lowering the chance that fluid will sneak under the retina and cause a detachment.\n\nIt is not the same as the pan-retinal laser used for advanced diabetic retinopathy, and it is not LASIK. Barrage laser is preventive retina care — often done in the clinic, often in one sitting, and often sight-saving if a tear is caught early.",
    },
    {
      heading: "When Barrage Laser Is Recommended",
      list: [
        "A retinal tear or hole found after flashes, floaters, or a dilated exam",
        "Lattice degeneration with high-risk features (especially in a highly myopic eye)",
        "A horseshoe tear with vitreous traction",
        "Selected fellow-eye weak areas when the other eye has had a detachment",
        "As an adjunct around some retinal problems after or instead of surgery, depending on the case",
      ],
    },
    {
      heading: "Barrage Laser vs Other Eye Lasers",
      table: {
        headers: ["Laser type", "Where it acts", "Typical purpose"],
        rows: [
          [
            "Barrage laser",
            "Around a retinal tear, hole or lattice",
            "Seal a weak spot; prevent retinal detachment",
          ],
          [
            "PRP (pan-retinal photocoagulation)",
            "Wide areas of the peripheral retina",
            "Treat proliferative diabetic retinopathy or severe ischaemia",
          ],
          [
            "YAG laser",
            "Behind an intraocular lens or at the iris",
            "Clear a cloudy capsule after cataract surgery, or treat some glaucoma angles",
          ],
          [
            "LASIK / SMILE excimer or femtosecond",
            "Cornea at the front of the eye",
            "Reduce glasses power — unrelated to retina sealing",
          ],
        ],
      },
    },
    {
      heading: "What Happens During Barrage Laser",
      body: "The pupil is dilated. Anaesthetic drops numb the surface. You sit at a laser-slit-lamp or, in some cases, have treatment with an indirect ophthalmoscope. You will see bright flashes. Most people feel brief pressure or a pin-prick sensation, not severe pain. The session often lasts 10–20 minutes depending on how many spots are needed.\n\nYou cannot drive yourself home the same day because of dilation. Arrange a companion.",
    },
    {
      heading: "Recovery, Restrictions and Warning Signs",
      list: [
        "Expect glare and blurred vision for a few hours until the drops wear off",
        "Mild headache or a bruised feeling can last a day; prescribed anti-inflammatory drops help",
        "Avoid heavy lifting, sudden jarring exercise, and rubbing the eye until your surgeon clears you",
        "The laser seal takes days to weeks to reach full strength — follow-up is not optional",
        "Return immediately for a sudden increase in floaters, flashes, a shadow, or vision drop — that can mean the tear has extended or a detachment has started",
      ],
    },
    {
      heading: "Barrage Laser at iSight Eye Care, Mumbai",
      body: "Retinal tears are time-sensitive. If you have new flashes, floaters, or a known lattice degeneration, a dilated retina exam is the next step — not waiting to see if it “settles.” Dr. Nikhil Nasta and the retina team at iSight Eye Care diagnose weak areas with clinical exam and imaging, then treat with barrage laser when it is the right preventive tool.\n\nLearn about retina services: https://www.eyesurgeonmumbai.com/retinal-surgery-mumbai\n\nBook urgently if symptoms are new: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Is barrage laser painful?",
      a: "Most patients describe bright lights and brief stinging or pressure. Numbing drops are used. Discomfort is usually short-lived. Tell the doctor if you need a pause.",
    },
    {
      q: "Does barrage laser improve vision?",
      a: "Its job is to protect the retina, not to sharpen spectacle power. Vision may be unchanged. The win is lowering the risk of a detachment that could steal vision.",
    },
    {
      q: "How successful is barrage laser for a retinal tear?",
      a: "When a tear is treated promptly and you attend follow-up, laser retinopexy is highly effective at reducing progression to detachment. It is not a 100% guarantee, which is why warning symptoms still matter after treatment.",
    },
    {
      q: "Is barrage laser the same as LASIK?",
      a: "No. LASIK reshapes the cornea to reduce glasses. Barrage laser treats the retina at the back of the eye. They are unrelated procedures.",
    },
  ],
};

export default post;
