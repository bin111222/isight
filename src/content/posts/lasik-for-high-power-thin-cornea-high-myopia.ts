import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "lasik-for-high-power-thin-cornea-high-myopia",
  title: "LASIK for High Power: Thin Cornea and High Myopia Guide",
  description:
    "Can you do LASIK with high number or thin cornea? This guide explains limits, safety thresholds, and when alternatives like ICL are better.",
  date: "2026-03-24",
  image: "lasik-for-high-power-thin-cornea-high-myopia",
  sections: [
    { heading: "Common Concern", body: "Patients with high myopia often ask if LASIK is still possible. The answer depends on two critical variables: total correction needed and corneal thickness/shape reserve after treatment." },
    { heading: "Why High Power Is Challenging", body: "Higher corrections require more tissue ablation. If too much tissue is removed, long-term corneal biomechanical safety can reduce. Modern planning aims to preserve a safe residual stromal bed." },
    { heading: "Role of Corneal Thickness", body: "A thin cornea does not always mean automatic rejection, but it narrows the safety window. Topography and tomography are equally important because shape quality matters as much as thickness." },
    { heading: "When LASIK May Still Work", list: ["Moderate-high power with adequate corneal reserve", "Regular topography", "No ectasia risk markers", "Controlled dry eye and stable refraction"] },
    { heading: "When LASIK Is Usually Avoided", list: ["Very high myopia with high ablation requirement", "Borderline thin cornea", "Irregular/suspicious corneal maps", "Young patient with rapidly changing prescription"] },
    { heading: "Best Alternatives", body: "ICL is often preferred for very high numbers because it does not remove corneal tissue. PRK may be considered in select anatomy, and sometimes staged planning is safer than one aggressive correction." },
    { heading: "Key Clinical Decision", body: "The safest procedure is the one that balances visual outcome with corneal biomechanics. A center that offers LASIK, PRK, and ICL can personalize this decision more ethically." },
    { heading: "Next Step", body: "If you have high power, request a full refractive eligibility workup before committing. Details: https://www.eyesurgeonmumbai.com/lasik-surgery-mumbai and ICL option: https://www.eyesurgeonmumbai.com/icl-surgery-mumbai." },
  ],
  faqs: [
    { q: "Can LASIK treat minus 8 or minus 10?", a: "Sometimes, but candidacy depends on corneal reserve and risk profile." },
    { q: "Is ICL safer for high myopia?", a: "Often yes, especially when corneal preservation is the priority." },
    { q: "Does thin cornea always mean no LASIK?", a: "Not always, but many thin-cornea cases are better managed with alternatives." },
    { q: "Can enhancement be needed later?", a: "Yes, depending on baseline power and healing behavior." },
  ],
};

export default post;
