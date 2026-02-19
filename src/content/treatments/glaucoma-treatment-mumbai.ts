import type { PageContent } from "@/types/content";
import { WHY_CHOOSE } from "./constants";

export const glaucomaTreatmentMumbai: PageContent = {
  title: "Glaucoma Treatment in Mumbai (Medical, Laser & Surgical)",
  description: "Comprehensive glaucoma management. Early detection, OCT, visual field, laser and surgery. Dr. Nikhil Nasta.",
  subtitle: "Keeping eye pressure in check, like balancing bandwidth so the system doesn't crash.",
  sections: [
    { heading: "Comprehensive Glaucoma Management and Treatment", body: "At I-Sight Eye Care and Surgery, we offer state-of-the-art glaucoma diagnosis, management, and treatment services. Our expert team uses advanced technology to detect glaucoma early and provide personalized treatment plans to preserve your vision." },
    { heading: "Understanding Glaucoma", body: "Glaucoma is a group of eye conditions that damage the optic nerve, often due to high eye pressure. We specialize in managing all types:", list: ["Open-Angle Glaucoma", "Angle-Closure Glaucoma", "Normal-Tension Glaucoma", "Secondary Glaucoma", "Congenital Glaucoma"] },
    { heading: "Advanced Diagnostic Technology", list: ["OCT (Optical Coherence Tomography)", "Visual Field Testing", "Pachymetry - Corneal Thickness Measurement", "Gonioscopy", "IOP Measurement", "Nerve Fiber Analysis", "Tracking Progression by serial RNFL Pictures"] },
    { heading: "Comprehensive Treatment Options", body: "Medical Management: Latest eye drops, oral medications, regular monitoring, pressure control, customized treatment plans.\n\nLaser Procedures: Selective Laser Trabeculoplasty (SLT), Laser Peripheral Iridotomy (LPI), Cyclophotocoagulation.\n\nSurgical Options: Trabeculectomy, Glaucoma Drainage Devices, Minimally Invasive Glaucoma Surgery (MIGS), Combined Cataract-Glaucoma Surgery." },
    { heading: "Benefits of Early Treatment", list: ["Vision preservation", "Pressure control", "Disease stabilization", "Prevention of progression", "Improved quality of life", "Long-term eye health", "Regular monitoring"] },
    { heading: "Why Choose I-Sight Eye Care?", list: WHY_CHOOSE },
  ],
  faqs: [
    { q: "What is glaucoma?", a: "A group of diseases causing optic nerve damage, often due to high eye pressure, leading to gradual irreversible vision loss if untreated." },
    { q: "What are the symptoms?", a: "Most types are silent until advanced. Some acute cases cause sudden pain, halos, redness, or blurred vision." },
    { q: "How is glaucoma diagnosed?", a: "Through eye pressure check, optic nerve imaging, OCT, visual field tests, gonioscopy, and corneal thickness measurements." },
    { q: "Can glaucoma be cured?", a: "No, but it can be controlled to prevent vision loss. Early detection and treatment are key." },
  ],
};
