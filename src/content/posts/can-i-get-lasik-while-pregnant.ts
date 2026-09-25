import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "can-i-get-lasik-while-pregnant",
  title: "Can I Get LASIK While Pregnant or Breastfeeding?",
  description:
    "No. LASIK is postponed during pregnancy and usually until after breastfeeding, because hormones change corneal shape and refraction. Learn when it is safe to book.",
  date: "2026-09-14",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "can-i-get-lasik-while-pregnant",
  sections: [
    {
      body: "No. Elective LASIK is not done during pregnancy, and it is usually delayed until you have finished breastfeeding, periods have returned, and a repeat refraction is stable. Pregnancy hormones can thicken and steepen the cornea and shift your glasses power, so a laser planned on today’s numbers can be the wrong numbers in three months. Numbing drops and post-op medicines also make surgeons unwilling to treat while you are pregnant.",
    },
    {
      heading: "Why Pregnancy and LASIK Do Not Mix",
      list: [
        "Refraction is unstable — a temporary myopic shift is common",
        "The cornea can change hydration and curvature; measurements used to programme the laser are less reliable",
        "Dry eye often worsens in pregnancy, which already raises LASIK discomfort and fluctuation",
        "You cannot take every standard post-LASIK drop without an obstetric opinion",
        "If you became pregnant soon after LASIK, rare reports link hormonal change with regression or ectasia risk in susceptible corneas — another reason not to operate in that window",
      ],
    },
    {
      heading: "When Can You Book After Delivery?",
      table: {
        headers: ["Situation", "Usual advice"],
        rows: [
          [
            "Pregnant now",
            "Do not schedule LASIK. Use updated glasses or contacts. Come for a non-laser eye-health check if something new worries you",
          ],
          [
            "Breastfeeding",
            "Wait until you have stopped, then confirm the prescription has returned toward your pre-pregnancy baseline",
          ],
          [
            "Periods have not returned yet",
            "Hold — hormonal reset is incomplete even if you feel “back to normal”",
          ],
          [
            "Stable refraction after weaning (often 3–6 months, sometimes longer)",
            "Full LASIK work-up: topography, thickness, dry-eye scoring — then decide LASIK vs SMILE vs ICL",
          ],
        ],
      },
    },
    {
      heading: "What You Can Do Now",
      body: "You can still have a dilated exam, treat an infection, or get a safe spectacle update. You should not start a refractive-surgery timeline that assumes today’s power is final. If keratoconus or a very thin cornea is already known, pregnancy is a reason to be extra cautious about rubbing and to keep follow-up — not a reason to laser.",
    },
    {
      heading: "Plan LASIK on Stable Numbers, Not a Due Date",
      body: "iSight Eye Care in Mumbai will put you on a post-partum LASIK pathway: repeat scans when hormones have settled, then a genuine yes/no. Dr. Nikhil Nasta would rather delay six months than programme a cornea that is still changing.\n\nLASIK screening: https://www.eyesurgeonmumbai.com/lasik-surgery-mumbai\n\nBook (including a “not now, but map it” visit): https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Can I get LASIK while pregnant?",
      a: "No. It is an elective procedure on a cornea and prescription that are temporarily unreliable. Wait until after pregnancy and, in most cases, after breastfeeding.",
    },
    {
      q: "Can I get LASIK while breastfeeding?",
      a: "It is generally postponed until lactation has stopped and refraction is stable. Milk supply and corneal physiology both argue for waiting.",
    },
    {
      q: "I had LASIK last year and I am pregnant. Is the baby at risk?",
      a: "LASIK itself is on the cornea, not a systemic drug. Tell your obstetrician and ophthalmologist. Watch for a changing prescription and keep scheduled eye checks if you had a borderline cornea.",
    },
    {
      q: "Are contact lenses safe in pregnancy instead?",
      a: "Many people become intolerant because of dryness. Glasses are the lowest-risk stopgap. Do not sleep in lenses.",
    },
  ],
};

export default post;
