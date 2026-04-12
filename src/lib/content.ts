import type { ContentSection, FAQ, PageContent } from "@/types/content";
import { TREATMENT_PAGES } from "@/content/treatments";

export type { ContentSection, FAQ, PageContent };

export function getPageContent(slug: string): PageContent | null {
  if (TREATMENT_PAGES[slug]) return TREATMENT_PAGES[slug];

  const pages: Record<string, PageContent> = {
    treatments: {
      title: "All Treatments | iSight Eye Care Mumbai",
      description: "Comprehensive eye care treatments: LASIK, cataract, retina, glaucoma, dry eye, pediatric, oculoplastic and more.",
      sections: [
        {
          heading: "Our Comprehensive Eye Services",
          body: "At iSight Eye Care, we offer a full range of eye care treatments under one roof. From refractive surgery and cataract to retinal care, glaucoma, dry eye, pediatric ophthalmology, and oculoplastic surgery, our team led by Dr. Nikhil Nasta provides expert care using the latest technology.",
        },
        {
          heading: "Key Treatment Areas",
          list: [
            "LASIK Surgery Mumbai – Contoura Vision, freedom from glasses",
            "Cataract Surgery Mumbai – No patch, no stitch, no injection",
            "ICL Surgery Mumbai – Phakic IOL for high myopia",
            "Retinal Surgery Mumbai – Turbovit system, ARMD injections",
            "Glaucoma Treatment Mumbai – Medical, laser & surgical options",
            "Dry Eye Treatment Mumbai – Advanced diagnostics and IPL/Forma",
            "Pediatric Eye Care Mumbai – Squint, myopia, routine checks",
            "Oculoplastic Surgery & Botox Mumbai – Eyelid and aesthetic care",
            "Corneal Transplant Surgery Mumbai – DMEK, DSAEK, PK",
            "Trifocal, Multifocal & EDOF IOL Surgery – Premium lens options",
          ],
        },
      ],
    },
    consult: {
      title: "Book a Consultation | iSight Eye Care Mumbai",
      description: "Book an appointment with Dr. Nikhil Nasta. Call 8692986033 or visit our Khar and Dadar clinics.",
      sections: [
        {
          body: "Schedule your eye check-up or consultation with Dr. Nikhil Nasta and the iSight Eye Care team. We have convenient locations in Khar and Dadar. Call 8692986033 or WhatsApp to book. Maintaining good vision is important for life – contact us today to schedule your next eye check up.",
        },
      ],
    },
    blog: {
      title: "Blog | Eye Care Articles & Updates | iSight Mumbai",
      description: "Expert articles on cataract, LASIK, dry eye, glaucoma, retina and more from Dr. Nikhil Nasta.",
      sections: [
        {
          body: "Read the latest from iSight Eye Care: expert articles on cataract surgery, LASIK, dry eye treatment, glaucoma, retinal care, pediatric eye care, and ocular aesthetics. All posts are for educational purposes; consult a specialist for personalized advice.",
        },
      ],
    },
    "isight-eye-care-doctors": {
      title: "Dr. Nikhil Nasta | Eye Surgeon Mumbai | iSight Eye Care & Surgery",
      description:
        "Dr. Nikhil Nasta—MBBS, MS (Ophthalmology), DNB—is an award-winning eye surgeon and founder of iSight Eye Care & Surgery, Mumbai (Khar & Dadar). LASIK, cataract, retina, glaucoma, dry eye, pediatric eye care.",
      sections: [
        {
          heading: "About Dr. Nikhil Nasta",
          body: "Dr. Nikhil Nasta, MBBS, MS (Ophthalmology), and DNB, is a consultant eye surgeon in Mumbai and the founder of iSight Eye Care & Surgery. He leads NABH-accredited centres in Khar West and Dadar West, offering cataract surgery with premium intraocular lenses, Contoura LASIK and refractive vision correction, retinal surgery and injections, medical and surgical glaucoma care, advanced dry eye treatment, pediatric ophthalmology, squint surgery, and oculoplastic procedures. With over 15 years of experience and recognition including the Ophthall Hall of Vision award, Dr. Nasta focuses on evidence-based, patient-first ophthalmology using modern phacoemulsification, laser, and diagnostic platforms.",
        },
      ],
    },
    "awards-eye-surgeon-mumbai": {
      title: "Awards & Recognition | Eye Surgeon Mumbai | iSight",
      description: "iSight Eye Care and Dr. Nikhil Nasta honoured with Ophthall Hall of Vision Recognition Award. NABH accredited.",
      sections: [
        {
          body: "iSight Eye Care and Dr. Nikhil Nasta have been honoured with the Ophthall Hall of Vision Recognition Award. It is a recognition of the hospital's growth and the success of the brand we've created. NABH accredited hospitals and multiple centres in Mumbai.",
        },
      ],
    },
  };

  return pages[slug] ?? null;
}
