import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "can-lasik-treat-myopia-and-hyperopia",
  title: "Can LASIK Treat Myopia and Hyperopia?",
  description:
    "Understand how LASIK treats nearsightedness and farsightedness, who benefits most, and which factors decide final visual quality.",
  date: "2026-03-24",
  image: "can-lasik-treat-myopia-and-hyperopia",
  sections: [
    { heading: "How LASIK Corrects Different Powers", body: "For myopia, LASIK flattens the central cornea. For hyperopia, it steepens central curvature by reshaping peripheral tissue patterns. Both strategies improve retinal focus and reduce spectacle dependence." },
    { heading: "Myopia Outcomes", body: "Myopic corrections are highly common in LASIK practice and generally predictable when corneal health and tear film are good." },
    { heading: "Hyperopia Outcomes", body: "Hyperopic corrections are also possible but require careful candidacy and expectation setting. Stability and quality can vary more than low-to-moderate myopia in some eyes." },
    { heading: "Eligibility Factors", list: ["Stable number", "Healthy cornea and topography", "Adequate tissue reserve", "No uncontrolled dry eye", "Realistic expectations with age-related near vision changes"] },
    { heading: "What About Very High Power?", body: "Very high myopia/hyperopia may reduce the safety margin for LASIK. In such cases, ICL or lens-based correction can be safer and more stable." },
    { heading: "Quality of Vision Matters", body: "Success is not only about reducing number. Contrast sensitivity, night comfort, and tear film stability shape day-to-day quality." },
    { heading: "Counseling Before Decision", body: "Ask your surgeon whether your correction target is complete spectacle freedom or significant dependence reduction. The answer influences treatment design." },
  ],
  faqs: [
    { q: "Can LASIK cure minus power permanently?", a: "It permanently reshapes treated corneal power, but natural age-related changes can still occur later." },
    { q: "Is LASIK for plus power safe?", a: "Yes in selected candidates with proper planning and stable measurements." },
    { q: "Can both eyes with different numbers be treated together?", a: "Yes, treatment is customized per eye." },
    { q: "Is ICL better for very high myopia?", a: "Often yes when corneal preservation is required." },
  ],
};

export default post;
