/** Single source for homepage FAQ UI + FAQPage JSON-LD (must stay in sync). */
export const HOMEPAGE_FAQS = [
  {
    q: "What eye surgeries does Dr. Nikhil Nasta perform?",
    a: "Dr. Nikhil Nasta performs a wide range of eye surgeries including cataract surgery with premium intraocular lenses, Contoura LASIK and refractive surgery, ICL (implantable collamer lens) surgery, retinal surgery and intravitreal injections, glaucoma surgery, squint correction, corneal transplants (DMEK/DSAEK), and oculoplastic procedures at iSight Eye Care & Surgery in Mumbai.",
  },
  {
    q: "Where is iSight Eye Care located?",
    a: "iSight Eye Care & Surgery has two NABH-accredited centres in Mumbai: one in Khar West (400052) and one in Dadar West (400028). Both centres offer comprehensive ophthalmology services including LASIK, cataract, retina, glaucoma, and dry eye treatment.",
  },
  {
    q: "Does iSight Eye Care offer LASIK in Mumbai?",
    a: "Yes. iSight Eye Care & Surgery offers advanced LASIK including Contoura Vision (topography-guided LASIK), standard bladeless LASIK, and SMILE. Dr. Nikhil Nasta performs a thorough suitability assessment before recommending any refractive procedure to ensure safe and lasting outcomes.",
  },
] as const;

export function getHomepageFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOMEPAGE_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
