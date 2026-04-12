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
  {
    q: "How do I book an appointment at iSight Eye Care?",
    a: "You can book by calling 8692986033, submitting a request through the Consult page on this website, or messaging us on WhatsApp with your preferred centre (Khar or Dadar) and reason for visit. Same-day and advance slots are available where possible.",
  },
  {
    q: "What are your clinic timings?",
    a: "Both iSight Eye Care centres in Mumbai are open Monday through Saturday, 9:00 AM to 7:00 PM. We are closed on Sundays. If you need an urgent eye problem assessed, call us and our team will advise the next available option.",
  },
  {
    q: "Do I need a referral to see Dr. Nikhil Nasta?",
    a: "No. You can book directly for a consultation or eye check-up without a referral. If you already have reports from another eye doctor or hospital, bring them along so we can review your history in context.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Bring a valid photo ID, your current or old spectacles if you use them, a list of medications and allergies, and any prior eye prescriptions, OCT scans, or investigation reports. For contact lens wearers coming for LASIK assessment, you may be asked to stay out of lenses for a defined period beforehand—our team will confirm when you book.",
  },
  {
    q: "Do you accept health insurance or cashless treatment?",
    a: "Many medically indicated procedures may be eligible under health insurance or Mediclaim depending on your policy and network. Our team can guide you on documentation and pre-authorisation during consultation. Elective vision correction such as LASIK is usually not covered by standard policies in India; we can discuss payment options including EMI where applicable.",
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
