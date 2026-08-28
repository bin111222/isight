import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "function-of-an-eye",
  title: "Function of an Eye: How Vision Works, Part by Part",
  description:
    "The function of an eye is to capture light and turn it into a signal the brain can read. Learn eyes function from cornea to optic nerve, and what fails in common diseases.",
  date: "2026-09-06",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "function-of-an-eye",
  sections: [
    {
      body: "The function of an eye is to gather light, focus it into a sharp image, convert that image into electrical signals, and send those signals to the brain. When people search “eyes function,” they want the school-biology version — and the clinical version: which part, when it fails, explains their blur, glare or missing vision.\n\nThink of the eye as a camera. The cornea and lens are the lenses. The iris is the aperture. The retina is the sensor. The optic nerve is the cable. The brain is the software. All of them have to work.",
    },
    {
      heading: "The Journey of Light Through the Eye",
      table: {
        headers: ["Structure", "Function of this part", "What you notice if it fails"],
        rows: [
          [
            "Cornea",
            "Does most of the focusing; a clear, curved window",
            "Blur, astigmatism, halos; scarring or keratoconus distort vision",
          ],
          [
            "Tear film",
            "Keeps the cornea optically smooth and nourished",
            "Fluctuating blur that clears after a blink; burning",
          ],
          [
            "Iris and pupil",
            "Control how much light enters",
            "Glare, difficulty in dim light, or a pupil that does not react",
          ],
          [
            "Crystalline lens",
            "Fine-focuses (especially for near) and stays clear",
            "Cataract haze and glare; presbyopia after 40",
          ],
          [
            "Retina (including macula)",
            "Turns light into nerve signals; macula gives sharp central vision",
            "Distortion, dark patches, sudden floaters or a curtain",
          ],
          [
            "Optic nerve",
            "Carries the signal to the brain",
            "Glaucoma field loss, colour desaturation, or sudden nerve-related vision drop",
          ],
        ],
      },
    },
    {
      heading: "Supporting Functions People Forget",
      list: [
        "Six extraocular muscles align both eyes so the brain can fuse two images into one 3D picture — squint disrupts this",
        "Eyelids blink to renew tears and protect the cornea",
        "The ciliary muscle changes lens shape for near work until presbyopia sets in",
        "Aqueous humour nourishes the front of the eye and maintains pressure — too high, and the optic nerve is at risk",
      ],
    },
    {
      heading: "When Eyes Function Drops: Match the Symptom to the System",
      body: "Blur that glasses fix is usually a focusing (refractive) problem in the cornea or lens length of the eye. Blur that glasses do not fix needs a medical look at the retina, optic nerve or ocular surface. Sudden symptoms — flashes, a curtain, severe pain — are not “function of an eye” trivia. They are emergencies.",
    },
    {
      heading: "How We Test Eye Function in Clinic",
      body: "A comprehensive exam is more than reading a chart. It includes refraction, slit-lamp exam of the front of the eye, eye-pressure check, and a dilated view of the retina. OCT, topography and visual fields are added when the history or findings demand them. That is how we separate a simple glasses update from glaucoma, macular disease or a retinal tear.\n\nIf you want your eyes function checked properly — not just a new frame — book with Dr. Nikhil Nasta at iSight Eye Care, Mumbai.\n\nhttps://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "What is the main function of an eye?",
      a: "To focus light onto the retina and send a neural image to the brain so you can see. Comfortable, binocular, colourful, night and peripheral vision are all part of that function — not just the letter chart.",
    },
    {
      q: "Which part of the eye is most important?",
      a: "They are a chain. A perfect retina cannot help if the cornea is scarred; a perfect cornea cannot help if the optic nerve is damaged by glaucoma. That is why exams look at the whole pathway.",
    },
    {
      q: "How does the eye focus on near and far?",
      a: "The cornea provides a fixed focus. The lens changes shape (accommodation) for near. Age stiffens the lens (presbyopia). Glasses, contact lenses, LASIK or lens surgery compensate when the optics no longer match the eye’s length.",
    },
    {
      q: "Can damaged eye function be restored?",
      a: "Sometimes yes — cataract surgery, LASIK, a repaired retinal detachment, or an injection for macular swelling. Sometimes the goal is to stop further loss, as in glaucoma. Early diagnosis is what keeps options open.",
    },
  ],
};

export default post;
