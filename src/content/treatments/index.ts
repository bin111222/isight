import type { PageContent } from "@/types/content";
import { cataractSurgeryMumbai } from "./cataract-surgery-mumbai";
import { cornealTransplantSurgeryMumbai } from "./corneal-transplant-surgery-mumbai";
import { dryEyeTreatmentMumbai } from "./dry-eye-treatment-mumbai";
import { edofIolSurgeryMumbai } from "./edof-iol-surgery-mumbai";
import { glaucomaTreatmentMumbai } from "./glaucoma-treatment-mumbai";
import { iclSurgeryMumbai } from "./icl-surgery-mumbai";
import { lasikSurgeryMumbai } from "./lasik-surgery-mumbai";
import { multifocalIolSurgeryMumbai } from "./multifocal-iol-surgery-mumbai";
import { oculoplasticSurgeryBotoxMumbai } from "./oculoplastic-surgery-botox-mumbai";
import { pediatricEyeCareMumbai } from "./pediatric-eye-care-mumbai";
import { retinalInjectionsMumbai } from "./retinal-injections-mumbai";
import { retinalSurgeryMumbai } from "./retinal-surgery-mumbai";
import { skinTypeOcularAestheticsMumbai } from "./skin-type-ocular-aesthetics-mumbai";
import { squintCorrectionSurgeryMumbai } from "./squint-correction-surgery-mumbai";
import { trifocalIolSurgeryMumbai } from "./trifocal-iol-surgery-mumbai";

/** All treatment page content keyed by slug. One file per treatment. */
const treatments: Record<string, PageContent> = {
  "cataract-surgery-mumbai": cataractSurgeryMumbai,
  "corneal-transplant-surgery-mumbai": cornealTransplantSurgeryMumbai,
  "dry-eye-treatment-mumbai": dryEyeTreatmentMumbai,
  "edof-iol-surgery-mumbai": edofIolSurgeryMumbai,
  "glaucoma-treatment-mumbai": glaucomaTreatmentMumbai,
  "icl-surgery-mumbai": iclSurgeryMumbai,
  "lasik-surgery-mumbai": lasikSurgeryMumbai,
  "multifocal-iol-surgery-mumbai": multifocalIolSurgeryMumbai,
  "oculoplastic-surgery-botox-mumbai": oculoplasticSurgeryBotoxMumbai,
  "pediatric-eye-care-mumbai": pediatricEyeCareMumbai,
  "retinal-injections-mumbai": retinalInjectionsMumbai,
  "retinal-surgery-mumbai": retinalSurgeryMumbai,
  "skin-type-ocular-aesthetics-mumbai": skinTypeOcularAestheticsMumbai,
  "squint-correction-surgery-mumbai": squintCorrectionSurgeryMumbai,
  "trifocal-iol-surgery-mumbai": trifocalIolSurgeryMumbai,
};

export const TREATMENT_PAGES = treatments;
export { WHY_CHOOSE } from "./constants";
