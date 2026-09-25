import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "what-is-keratoconus-symptoms-treatment",
  title: "What Is Keratoconus? Symptoms, Causes and Treatment",
  description:
    "Keratoconus is a thinning of the cornea into a cone, causing blur that glasses cannot fully fix. Learn symptoms, why LASIK is unsafe, and treatment options.",
  date: "2026-09-16",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "what-is-keratoconus-symptoms-treatment",
  sections: [
    {
      body: "Keratoconus is a condition in which the cornea — the clear front window of the eye — thins and bulges into a cone. Light no longer focuses cleanly, so vision is distorted even in a new pair of glasses. It usually starts in the teens or twenties, is linked with eye rubbing and allergy, and is a hard stop for LASIK. Treatment aims to freeze progression (collagen crosslinking), then improve vision with specialised contacts, rings, or, in advanced cases, a corneal transplant.",
    },
    {
      heading: "Symptoms That Should Trigger a Corneal Scan",
      list: [
        "Blur or ghosting that a recent glasses change did not fix",
        "Frequent prescription changes, especially rising cylinder (astigmatism)",
        "Halos, glare and poor night driving in a young adult",
        "Itchy, allergic eyes and a habit of rubbing",
        "One eye clearly worse than the other",
        "Family history of keratoconus",
      ],
    },
    {
      heading: "How Keratoconus Is Diagnosed",
      body: "A routine spectacle test can miss early disease. The test that matters is corneal tomography (Pentacam or similar): it maps front and back corneal shape and thickness. A scissors reflex on retinoscopy is a clinical clue. If you were told “your glasses power keeps changing” in Mumbai, ask whether a topography was ever done — not only a new minus number.",
    },
    {
      heading: "Treatment Ladder (What Each Step Is For)",
      table: {
        headers: ["Treatment", "Goal", "Typical patient"],
        rows: [
          [
            "Stop eye rubbing + treat allergy",
            "Remove a driver of progression",
            "Almost everyone with KC and itch",
          ],
          [
            "Glasses or soft lenses",
            "Help mild, regular astigmatism",
            "Very early disease only",
          ],
          [
            "Rigid / scleral contact lenses",
            "Mask irregular cornea for clearer vision",
            "Most moderate cases",
          ],
          [
            "Corneal collagen crosslinking (CXL)",
            "Stiffen the cornea to halt worsening",
            "Documented progression, especially under 30",
          ],
          [
            "Intracorneal rings / other procedures",
            "Flatten the cone in selected eyes",
            "Surgeon-selected anatomy",
          ],
          [
            "Corneal transplant",
            "Replace scarred or extremely steep cornea",
            "Advanced disease that lenses cannot help",
          ],
        ],
      },
    },
    {
      heading: "Why LASIK Is Dangerous Here",
      body: "LASIK removes tissue from a cornea that is already thin and biomechanically weak. That can accelerate ectasia. If a clinic offers laser vision correction without a tomography map, walk away. ICL is sometimes discussed in stable, treated keratoconus — that is a specialist decision, not a shortcut around CXL.",
    },
    {
      heading: "Get Mapped Before the Cone Progresses",
      body: "iSight Eye Care in Mumbai assesses suspicious corneas with proper imaging before any refractive plan. Dr. Nikhil Nasta will tell you if this is keratoconus, forme fruste disease, or a regular astigmatism — and whether crosslinking, contacts, or transplant counselling is the next honest step.\n\nCorneal transplant information: https://www.eyesurgeonmumbai.com/corneal-transplant-surgery-mumbai\n\nBook a topography-based exam: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "What is keratoconus in simple words?",
      a: "The cornea becomes thinner and cone-shaped instead of a smooth dome, so images look smeared. Glasses often cannot fully correct it.",
    },
    {
      q: "Can keratoconus be cured?",
      a: "You cannot put the original shape back with drops. Crosslinking can stop it getting worse. Vision is then improved with lenses or surgery.",
    },
    {
      q: "Is keratoconus common in India?",
      a: "It is not rare, especially in young people with allergy and eye rubbing. Many are diagnosed late, in their twenties, after years of “changing power.”",
    },
    {
      q: "Can I do LASIK if I have keratoconus?",
      a: "No. LASIK is contraindicated. Anyone offering it without corneal maps is not practising safe refractive surgery.",
    },
  ],
};

export default post;
