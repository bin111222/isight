import type { BlogPost } from "@/types/content";

const post: BlogPost = {
  slug: "eye-power-vs-cylinder-explained",
  title: "What Is Eye Power vs Cylinder? A Mumbai Patient’s Guide",
  description:
    "Eye power (sphere) is your minus or plus number. Cylinder is astigmatism, with an axis. Glasses, contacts, and LASIK can correct both when the eye is suitable.",
  date: "2026-10-19",
  reviewedBy: "Dr. Nikhil Nasta",
  image: "eye-power-vs-cylinder-explained",
  sections: [
    {
      body: "Eye power, the sphere, is how short-sighted or long-sighted you are: a minus number for near sight, a plus number for distance sight. Cylinder is astigmatism, the part of the prescription that corrects an uneven corneal curve, and it always comes with an axis between 1 and 180. A glasses slip that reads −3.00 / −1.25 × 180 has both. LASIK, SMILE, and the right contact lens can treat both in a suitable eye.",
    },
    {
      heading: "How to Read the Slip From the Optical Shop",
      table: {
        headers: ["What it says", "What it means", "A plain example"],
        rows: [
          [
            "SPH, or the first number",
            "Sphere. Minus pulls distance into focus. Plus helps long sight",
            "−2.50 means moderate short sight",
          ],
          [
            "CYL, or the second number",
            "Cylinder. The astigmatism correction",
            "−0.75 or −1.50 is a common cylinder. Zero means no astigmatism",
          ],
          [
            "AXIS",
            "The direction of that cylinder, in degrees",
            "× 90 and × 180 are the axes people see most often",
          ],
          [
            "ADD",
            "The extra plus for reading after about 40",
            "+1.75 or +2.25. This is presbyopia, not cylinder",
          ],
          [
            "6/6 or 6/9",
            "How small a line you read on the chart",
            "You can be 6/6 and still have a cylinder in the glasses",
          ],
        ],
      },
    },
    {
      heading: "Why the Two Eyes Rarely Match",
      body: "Parents worry when the right eye is −1.00 and the left is −3.50, or when only one eye has cylinder. That difference is common. It matters when it is large in a child, because the brain can start ignoring the blurrier eye. In adults it is usually a focusing difference, not a disease, and it still deserves a full exam the first time it is noticed. A sudden new cylinder, or a cylinder that jumps between two visits, is a reason to look at the cornea rather than only change the glasses.",
    },
    {
      heading: "What Can Actually Correct It",
      list: [
        "Spectacles correct sphere and cylinder together and remain the safest default",
        "Toric contact lenses are built for cylinder. A plain spherical lens will not hide a meaningful axis",
        "LASIK and Contoura treat sphere and cylinder in one plan when thickness, shape, and tear film allow it",
        "High cylinder with a suspicious map may be keratoconus. That eye is not a LASIK eye until proven otherwise",
        "After 40, the ADD for reading remains even when distance sphere and cylinder are corrected",
      ],
    },
    {
      heading: "Bring the Old Cards to the Exam",
      body: "A single new number is less useful than the last three years of slips. Dr. Nikhil Nasta uses that trail, plus corneal topography, to separate a stable spectacle number from a cornea that is changing. If you want freedom from both the minus and the cylinder, that is a LASIK conversation. If the map is irregular, the honest answer is glasses, lenses, or a different treatment.\n\nWhat 6/6 means: https://www.eyesurgeonmumbai.com/post/what-does-6-6-vision-mean\n\nLASIK for cylinder: https://www.eyesurgeonmumbai.com/post/lasik-for-astigmatism-can-cylindrical-power-be-corrected\n\nBook an exam: https://www.eyesurgeonmumbai.com/consult",
    },
  ],
  faqs: [
    {
      q: "Is cylinder the same as a high number?",
      a: "No. You can have a small sphere and a large cylinder, or the reverse. They are separate lines on the prescription.",
    },
    {
      q: "Can cylinder increase if I use my phone too much?",
      a: "Screens cause strain and dryness. They do not, by themselves, write a new cylinder. A changing cylinder needs a corneal scan.",
    },
    {
      q: "Why did the axis change from 180 to 170?",
      a: "Small axis shifts are common between opticians and are often the same correction written slightly differently. A large jump should be rechecked.",
    },
    {
      q: "Will LASIK remove the cylinder completely?",
      a: "In a suitable eye the aim is to reduce it to a level that gives you clear unaided vision. A tiny residual cylinder can remain and is often unnoticed.",
    },
  ],
};

export default post;
