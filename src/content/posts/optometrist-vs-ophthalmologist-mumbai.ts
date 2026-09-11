import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "optometrist-vs-ophthalmologist-mumbai",
  title: "Optometrist vs. Ophthalmologist: Who Should You See in Mumbai?",
  description:
    "Confused about the difference between an optometrist and an ophthalmologist? Learn who to see for your specific eye care needs in Mumbai.",
  date: "2026-08-20",
  dateModified: "2026-09-11",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "optometrist-vs-ophthalmologist-mumbai",
  sections: [
    {
      body: "When it is time to get your eyes checked in Mumbai, the first confusion is often the title on the door. Optometrist, ophthalmologist and optician are not interchangeable, even though all three may sit in the same building. Choosing the wrong professional delays surgery, misses glaucoma, or — the other mistake — books a surgeon for a problem that only needed a refraction and a well-fitted pair of glasses.\n\nHere is a clear split of training, what each person can legally and practically do, and who you should book for common situations.",
    },
    {
      heading: "What is an Optometrist?",
      body: "An optometrist is a primary eye-care professional with a degree in optometry. They are not medical doctors (MBBS). Their core work is:",
      list: [
        "Comprehensive refraction and binocular-vision testing",
        "Prescribing and fitting glasses and contact lenses",
        "Screening for problems such as dry eye, early glaucoma suspects, and diabetic changes — then referring when medical or surgical care is needed",
        "In some settings, managing selected anterior-segment conditions and co-managing post-operative LASIK or cataract patients with the surgeon",
      ],
    },
    {
      heading: "What is an Ophthalmologist?",
      body: "An ophthalmologist is a medical doctor (MBBS) who has completed postgraduate training in ophthalmology (MS or DNB) and, often, a further fellowship. They practise medicine and surgery of the eye. Their scope includes:",
      list: [
        "Diagnosing and treating all eye diseases, including glaucoma, retina, cornea and paediatric problems",
        "Performing surgery: LASIK and other lasers, cataract and lens implants, retinal procedures, squint, oculoplasty",
        "Prescribing medicines, glasses and contact lenses",
        "Managing eye complications of diabetes, thyroid disease, autoimmune disease and trauma",
      ],
    },
    {
      heading: "What is an Optician?",
      body: "An optician is a technician who makes and fits spectacles from a prescription written by an optometrist or ophthalmologist. They do not diagnose disease or perform surgery. A skilled optician matters enormously for comfort — progressive lenses, prism, and children's frames fail when the fitting is sloppy — but they are not a substitute for a medical eye exam.",
    },
    {
      heading: "Optometrist vs Ophthalmologist at a Glance",
      table: {
        headers: ["", "Optometrist", "Ophthalmologist"],
        rows: [
          ["Training", "Optometry degree", "MBBS + MS/DNB ophthalmology (± fellowship)"],
          ["Performs eye surgery", "No", "Yes"],
          ["Best first visit for", "Routine glasses, contact lenses, screening", "Disease, surgery, sudden vision change, second opinions"],
          ["Can dilate and examine the retina", "Often yes, depending on clinic protocols", "Yes — and can treat what they find"],
          ["LASIK / cataract", "Pre- and post-op co-management", "The person who operates"],
        ],
      },
    },
    {
      heading: "Who Should You See?",
      body: "Book an optometrist for a stable adult who needs an updated prescription, a contact-lens fit, or a routine screen with no red-flag symptoms.\n\nBook an ophthalmologist if you have cataracts, glaucoma, macular or diabetic retina disease, a child's squint or lazy eye, eye pain, sudden floaters or flashes, trauma, or you are considering LASIK, ICL or any other operation. Also book the ophthalmologist if glasses keep changing and vision still feels wrong — that is how corneal and retinal disease presents.\n\nIn many specialist centres, you will see both: the optometrist gathers measurements; the ophthalmologist makes the medical decision. That is a feature, not a confusion of roles.",
    },
    {
      heading: "A Note on Titles You Will See in Mumbai",
      body: "'Eye specialist,' 'eye surgeon' and 'netra visheshagya' usually mean ophthalmologist. 'Vision expert' on an optical chain board often means optometrist. If surgery is even a possibility, confirm that an ophthalmologist will examine you before you pay for a laser package.",
    },
    {
      heading: "Comprehensive Care Under One Roof",
      body: "At iSight Eye Care in Mumbai, optometrists handle precise refraction and work-ups; ophthalmologists led by Dr. Nikhil Nasta handle disease and surgery. You should leave knowing which professional you saw, and why.\n\nBook a consultation: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Can an optometrist perform LASIK surgery?",
      a: "No. An optometrist may do pre-operative measurements and post-operative checks. The surgery itself must be performed by a licensed ophthalmologist.",
    },
    {
      q: "What is an optician?",
      a: "A technician who designs, verifies and fits glasses from a doctor's or optometrist's prescription. They do not test eyes independently or write medical prescriptions.",
    },
    {
      q: "I have diabetes. Who should I see?",
      a: "An ophthalmologist, with a dilated retina exam. An optical shop refraction is not a diabetic eye check. Once the retina is stable, an optometrist may help with glasses in between specialist visits.",
    },
    {
      q: "My child failed a school vision test. Optometrist or ophthalmologist?",
      a: "Either can start the refraction, but hidden plus power, squint and lazy eye are easy to miss without a pediatric-aware, often cycloplegic, exam. If there is an eye turn, a white reflex, or poor vision in one eye, go to an ophthalmologist.",
    },
    {
      q: "Can I see an ophthalmologist for a simple glasses check?",
      a: "Yes. Many patients prefer one clinic for both refraction and medical screening, especially after 40, when glaucoma and cataract start to appear.",
    },
  ],
};

export default post;
